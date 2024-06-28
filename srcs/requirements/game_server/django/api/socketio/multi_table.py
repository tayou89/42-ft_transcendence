import httpx
import logging

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
     
		info = await self.get_session(sid)
		if not info:
			return

		await super().on_disconnect(sid)
		
		room_name = info.get('room')
		me = info.get('me')
		origin = info.get('origin')
  
		if me == 'p1' or me == 'p2':
			sub_game  = self.sub_games.get(room_name + "_sub1", None)
			if sub_game:
				sub_game.pop(me)
		else:
			sub_game  = self.sub_games.get(room_name + "_sub2", None)
			if sub_game:
				sub_game.pop(me)

		sub_game  = self.sub_games.get(room_name + "_final", None)
		if sub_game and me in sub_game:
			sub_game.pop(me)
   
		self.player_sessions[room_name].pop(origin)


	async def on_join_room(self, sid, message):
		await super().on_join_room(sid, message)
		
		room_name = message['room']
		room_sessions = self.player_sessions.get(room_name, None)
		if room_sessions is None:
			room_sessions = self.player_sessions[room_name] = {}

		session_data = await self.get_session(sid)
		session_data['origin'] = session_data['me']
		await self.save_session(sid, session_data)
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

			await asyncio.gather(
				self.make_room_and_play('p1', 'p2', room_name, '_sub1'),
				self.make_room_and_play('p3', 'p4', room_name, '_sub2')
			)


	async def make_room_and_play(self, p1, p2, room_name, room_num):
		session = self.player_sessions[room_name]
		sub_room = room_name + room_num

		if room_num != '_final':
			await self.enter_room(session[p1], sub_room)
			await self.enter_room(session[p2], sub_room)
	
			await self.save_session(session[p1], {'me': 'p1', 'room': room_name, 'sub_room': sub_room})
			await self.save_session(session[p2], {'me': 'p2', 'room': room_name, 'sub_room': sub_room})

			self.sub_games[sub_room] = {
				'p1': self.rooms[room_name][p1], 
				'p2': self.rooms[room_name][p2],
			}

		winner = await self.play_pong(sub_room, session[p1], session[p2])
  
		await self.leave_room(session[p1], sub_room)
		await self.leave_room(session[p2], sub_room)
		self.sub_games.pop(sub_room)
  
		winner_data = {}
  
		if winner == 'p1':
			winner_data = self.rooms[room_name][p1]
			await self.save_session(session[p2], {})
			await self.save_result(room_name, self.games[sub_room], p1, p2)
			winner = p1
			loser = p2
		else:
			winner_data = self.rooms[room_name][p2]
			await self.save_session(session[p1], {})
			await self.save_result(room_name, self.games[sub_room], p2, p1)
			winner = p2
			loser = p1
   
		if room_num != 'final':
			final_room = self.sub_games.get(room_name + '_final', None)
			if not final_room:
				final_room = self.sub_games[room_name + '_final'] = {} 
	
			for pnum in ['p1', 'p2']:
				if not final_room.get(pnum, None):
					winner_data['before'] = winner
					winner_data['ready'] = False
					final_room[pnum] = winner_data
					await self.save_session(session[winner], {'me': pnum, 'room': room_name, 'sub_room': room_name + '_final'})
					await self.enter_room(session[winner], room_name + '_final')
					break
	
		return (winner, loser)

	async def on_next_game(self, sid):
		info = await self.get_session(sid)
		room_name = info.get('sub_room')
		me = info.get('me')
		final_room = self.sub_games[room_name]
		final_room[info['me']]['ready'] = True
     
		await self.emit(
      		'room',
            final_room,
            room=room_name,
            namespace=self.namespace
        )
  
		if len(final_room) == 2 and final_room['p1']['ready'] and final_room['p2']['ready']:
			return
  
		winner, loser = await self.make_room_and_play(
      		final_room['p1']['before'],
        	final_room['p2']['before'],
         	room_name.removesuffix('_final'), '_final'
        )
  
		await self.save_result(info.get('room'), self.games[room_name], winner, loser)
  
		room = await sync_to_async(Room.objects.get)(name=room_name)
		await sync_to_async(room.delete)()
		self.rooms.pop(info.get('room'))
		self.player_sessions.pop(info.get('room'))


	async def play_pong(self, room_name, p1_pid, p2_pid):
		game = self.games[room_name] = GameState()
		game.p1_pid = p1_pid
		game.p2_pid = p2_pid
  
		await sio.sleep(6)
  
		await self.emit(
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
  
		if game.get_result()['p1'] == "win":
			return "p1"
		else:
			return "p2"


	async def save_result(self, room_name, game: GameState, winner, loser):
		room = await sync_to_async(Room.objects.get)(name=room_name)
  
		body = {
			"p1_score": game.score[0],
			"p2_score": game.score[1],
		}
  
		if game.score[0] > game.score[1]:
			body["p1"] = getattr(room, winner)
			body["p2"] = getattr(room, loser)
		else:
			body["p1"] = getattr(room, loser)
			body["p2"] = getattr(room, winner)

		async with httpx.AsyncClient() as client:
      
			await client.post("http://userserver:8000/api/matches/", json=body)

			json = {
				"winner": getattr(room, winner),
				"loser": getattr(room, loser),
			}

			await client.patch('http://userserver:8000/api/match-result', json=json)


	async def on_key(self, sid, message):
		info = await self.get_session(sid)
		room_name = info.get('sub_room')
  
		game: GameState = self.games[room_name]
		game.set_player_dy(sid, message)

sio.register_namespace(MttPong('/api/mtt'))


