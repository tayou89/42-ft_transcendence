import httpx

import socketio
import asyncio

from . import sio
from .game_state import GameState
from ..models import Room

from asgiref.sync import sync_to_async
from .pong import Pong


class MttPong(Pong):
	
	sub_games = {}
	player_sessions = {}
	
	def __init__(self, namespace=None):
		super().__init__(namespace)
		self.field_list = ['p1', 'p2', 'p3', 'p4']
		self.MAX_USER = 4

	async def on_disconnect(self, sid):
		await super().on_disconnect(sid)
		
		info = await self.get_session(sid)
		room_name = info.get('room')
		me = info.get('me')
  
		if me == 'p1' or me == 'p2':
			sub_game  = self.sub_games.get(room_name + "_sub1", None)
			if sub_game:
				sub_game.pop(me)
		else:
			sub_game  = self.sub_games.get(room_name + "_sub2", None)
			if sub_game:
				sub_game.pop(me)

		sub_game  = self.sub_games.get(room_name + "_sub3", None)
		if sub_game:
			sub_game.pop(me)


	async def on_join_room(self, sid, message):
		await super().on_join_room(sid, message)
		
		room_name = message['room']
		room_sessions = self.player_sessions.get(room_name, None)
		if room_sessions is None:
			room_sessions = self.player_sessions[room_name] = {}

		session_data = await self.get_session(sid)
		room_sessions[session_data['me']] = sid


	async def on_ready(self, sid, message):
		flag = message
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		self.rooms[room_name][me]['ready'] = flag
		await self.emit('room', self.rooms[room_name], room=room_name, namespace=self.namespace)
  
		cur_room = self.rooms[room_name]

		flag = True
		for key, value in cur_room.items():
			if value and not value['ready']:
				flag = False
				break;
  
		if flag:
			room = await sync_to_async(Room.objects.get)(name=room_name)
			room.in_game = True
			await sync_to_async(room.save)()

			sub1_winner, sub2_winner = await asyncio.gather(
				self.make_room_and_play('p1', 'p2', room_name, 'sub_1'),
				self.make_room_and_play('p3', 'p4', room_name, 'sub_2')
			)

			await asyncio.create_task(self.make_room_and_play(sub1_winner, sub2_winner, room_name, 'final'))
   
			await sync_to_async(room.delete)()
			self.rooms.pop(room_name)
			self.player_sessions.pop(room_name)



	async def make_room_and_play(self, p1, p2, room_name, room_num):
		session = self.player_sessions[room_name]

		await self.enter_room(session[p1], room_name + room_num)
		await self.save_session(session[p1], {'me': 'p1', 'room': room_name + room_num})

		await self.enter_room(session[p2], room_name + room_num)
		await self.save_session(session[p2], {'me': 'p2', 'room': room_name + room_num})
  
		self.sub_games[room_name + room_num ] = {
	  		'p1': self.rooms[room_name][p1], 
			'p2': self.rooms[room_name][p2],
		}

		winner = await asyncio.create_task(self.play_pong(room_name + room_num, session[p1], session[p2]))
  
		await self.leave_room(session[p1], room_name + room_num)
		await self.leave_room(session[p2], room_name + room_num)
		self.sub_games.pop(room_name + room_num)
  
		winner_data = {}
  
		if winner == 'p1':
			winner_data = self.rooms[room_name][p1]
			await self.save_session(session[p2], {})
			winner = p1
		else:
			winner_data = self.rooms[room_name][p2]
			await self.save_session(session[p1], {})
			winner = p2
   
		if room_num != 'final':
			final_room = self.sub_games.get(room_name + 'final', None)
			if not final_room:
				final_room = self.sub_games[room_name + 'final'] = {} 
	
			for pnum in ['p1', 'p2']:
				if not final_room.get(pnum, None):
					final_room[pnum] = winner_data
					break
		
			await sio.emit(
				'room',
				final_room,
				room=room_name,
				namespace=self.namespace
			)
	
		return winner


	async def play_pong(self, room_name, p1_pid, p2_pid):
		game = self.games[room_name] = GameState()
		game.p1_pid = p1_pid
		game.p2_pid = p2_pid
  
		await sio.sleep(5)
  
		await sio.emit(
			'room',
			self.sub_games[room_name],
			room=room_name,
			namespace=self.namespace
		)
		
		while game.status != 'end':
	  
			if len(self.sub_games[room_name]) != 2:
				if 'p1' in self.sub_games[room_name]:
					game.unearned_win('p1')
				else:
					game.unearned_win('p2')
				break

			await sio.emit(
				'game',
				game.next_frame(),
				room=room_name,
				namespace=self.namespace
			)

			await sio.sleep(1 / 30)
		
		await sio.emit(
			'result',
			game.get_result(),
			room=room_name,
			namespace=self.namespace
		)
  
		# self.save_result(room_name, game)
  
		if game.get_result()['p1'] == "win":
			return "p1"
		else:
			return "p2"


	# async def save_result(self, room_name, game: GameState):
	# 	return await super().save_result(room_name, game)

	async def on_key(self, sid, message):
		info = await self.get_session(sid)
		room_name = info.get('room')
  
		game: GameState = self.games[room_name]
		game.set_player_dy(sid, message)

sio.register_namespace(MttPong('/api/mtt'))
