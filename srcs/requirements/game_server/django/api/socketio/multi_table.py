import httpx

import socketio
import asyncio

from . import sio, manager
from .game_state import GameState
from ..models import Room

from asgiref.sync import sync_to_async


class Pong(socketio.AsyncNamespace):
	
	rooms = {}
	locker = {}
	games = {}
	
	def __init__(self, namespace=None):
		super().__init__(namespace)
 
	async def on_connect(self, sid, environ):
		pass
	
	async def on_disconnect(self, sid):
		field_list = ['p1', 'p2']
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
		room_db = await sync_to_async(Room.objects.get)(name=room_name)

		if room_db.in_game:
			return
  
		self.rooms[room_name][me] = None
		await self.save_session(sid, None)
		
		for field in field_list:
			if field == me:
				setattr(room_db, field, None)
				break
		room_db.cur_users -= 1
		if room_db.cur_users == 0:
			await sync_to_async(room_db.delete)()
		else:
			await sync_to_async(room_db.save)()
			await self.emit('message', self.rooms[room_name], room=room_name, namespace=self.namespace)


	
	async def on_join_room(self, sid, message):
		field_list = ['p1', 'p2', 'p3', 'p4']
		pid = message['pid']
		room_name = message['room']
  
		room = await sync_to_async(Room.objects.get)(name=room_name)
		
		for field in field_list:
			if getattr(room, field, None) is None:
				setattr(room, field, pid)
				break
  
		room.cur_users += 1
		await self.enter_room(sid, room_name)
  
		cur_room = self.rooms.get(room_name)
		if cur_room is None:
			self.rooms[room_name] = {
				"p1": {"pid": pid, "ready": False},
				"p2": None,
			}
			await self.save_session(sid, {'me': 'p1', 'room': room_name})
		else:
			for key, value in cur_room.items():
				if value is None:
					self.rooms[room_name][key] = {"pid": pid, "ready": False} 
					break
			await self.save_session(sid, {'me': key, 'room': room_name})
  
		await sync_to_async(room.save)()
   
		await sio.emit(
				'room',
				self.rooms[room_name],
				room=room_name,
				namespace=self.namespace
		)
  
  
	async def on_leave_room(self, sid, message):
		field_list = ['p1', 'p2', 'p3', 'p4']
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		room = await sync_to_async(Room.objects.get)(name=room_name)
		
		for field in field_list:
			if field == me:
				setattr(room, field, None)
				break
  
		room.cur_users -= 1
		await self.leave_room(sid, room_name)
		self.rooms[room_name][me] = None
		await self.save_session(sid, None)
  
		if room.cur_users == 0:
			await sync_to_async(room.delete)()
			self.rooms.pop(room_name)
		else:
			await sync_to_async(room.save)()
			await self.emit(
	   			'room',
				self.rooms[room_name],
				room=room_name,
				namespace=self.namespace
			)
  
	async def on_ready(self, sid, message):
		flag = message
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		self.rooms[room_name][me]['ready'] = flag
		await self.emit('room', self.rooms[room_name], room=room_name, namespace=self.namespace)
  
		cur_room = self.rooms[room_name]
		if cur_room['p2'] is not None and cur_room['p2']['ready'] and cur_room['p1']['ready']:
			await asyncio.create_task(self.play_pong(room_name))


	async def play_pong(self, room_name):
		game = self.games[room_name] = GameState()
  
		room_db = await sync_to_async(Room.objects.get)(name=room_name)
		room_db.in_game = True
		await sync_to_async(room_db.save)()
  
		await sio.sleep(5)
		
		while game.status != 'end':
            
			if len(self.rooms[room_name]) != 2:
				if 'p1' in self.rooms[room_name]:
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
  
		await self.save_result(self.rooms[room_name], game)
   
	async def save_result(self, room, game: GameState):
    
		body = {
        	"p1": room['p1']['pid'],
        	"p2": room['p2']['pid'],
			"p1_score": game.score[0],
        	"p2_score": game.score[1],
		}
  
		async with httpx.AsyncClient() as client:
			await client.post("http://localhost:8000/api/matches", json=body)
		


	async def on_key(self, sid, message):
		info = await self.get_session(sid)
		room_name = info.get('room')
  
		game = self.games[room_name]
		pid = game[info['me']]['pid']
		game.set_player_dy(pid, message)


sio.register_namespace(Pong('/api/pong'))
