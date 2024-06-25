import logging
import httpx
import socketio
import asyncio

from . import sio
from .game_state import GameState
from ..models import Room

from asgiref.sync import sync_to_async


class Pong(socketio.AsyncNamespace):
	
	rooms = {}
	games = {}
	
	def __init__(self, namespace=None):
		super().__init__(namespace)
		self.field_list = ['p1', 'p2']
		self.MAX_USERS = 2
 
	async def on_connect(self, sid, environ):
		pass
	
	async def on_disconnect(self, sid):
		info = await self.get_session(sid)

		if not info:
			return
  
		me = info.get('me')
		room_name = info.get('room')
		room_db = await sync_to_async(Room.objects.get)(name=room_name)
  
		if room_db.in_game:
			self.rooms[room_name].pop(me)
			await self.save_session(sid, {})
			return
  
		self.rooms[room_name][me] = {}
		await self.save_session(sid, {})
		
		for field in self.field_list:
			if field == me:
				setattr(room_db, field, None)
				break
		room_db.cur_users -= 1
		if room_db.cur_users == 0:
			await sync_to_async(room_db.delete)()
			self.rooms.pop(room_name)
		else:
			await sync_to_async(room_db.save)()
			await self.emit(
       			'message',
          		self.rooms[room_name],
            	room=room_name,
             	namespace=self.namespace
            )

	async def check_join(self, room, pid, sid):
		# if room.cur_users == self.MAX_USERS:
		# 	await sio.emit(
		# 		'error',
		# 		"room is full",
		# 		room=sid,
		# 		namespace=self.namespace
		# 	)
		# 	return False

		# for field in self.field_list:
		# 	if getattr(room, field, None) == int(pid):
		# 		await sio.emit(
		# 			'error',
		# 			"already in room",
		# 			room=sid,
		# 			namespace=self.namespace
		# 		)
		# 		return False

		return True

	async def on_join_room(self, sid, message):
		pid = message['pid']
		room_name = message['room']
  
		room = await sync_to_async(Room.objects.get)(name=room_name)

		if not await self.check_join(room, pid, sid):
			return
		
		for field in self.field_list:
			if getattr(room, field, None) is None:
				setattr(room, field, pid)
				break
  
		room.cur_users += 1
		await sync_to_async(room.save)()

		await self.enter_room(sid, room_name)
  
		cur_room = self.rooms.get(room_name, None)
		if cur_room is None:
			self.rooms[room_name] = {}
			for key in self.field_list:
				self.rooms[room_name][key] = {}
			cur_room = self.rooms[room_name]
			
   
		for key, value in cur_room.items():
			if not value:
				self.rooms[room_name][key] = {"pid": pid, "ready": False} 
				await self.save_session(sid, {'me': key, 'room': room_name})
				break
  
		await sio.emit(
				'room',
				self.rooms[room_name],
				room=room_name,
				namespace=self.namespace
		)
      


	async def on_leave_room(self, sid):
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		room = await sync_to_async(Room.objects.get)(name=room_name)
		
		for field in self.field_list:
			if field == me:
				setattr(room, field, None)
				break
  
		room.cur_users -= 1

		await self.leave_room(sid, room_name)
		self.rooms[room_name][me] = {}
		await self.save_session(sid, {})
  
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


		flag = True
		for key, value in cur_room.items():
			if value and not value['ready']:
				flag = False
				break;
  
		if flag:
			await asyncio.create_task(self.play_pong(room_name))



	async def play_pong(self, room_name):
		game = self.games[room_name] = GameState()
		game.p1_pid = self.rooms[room_name]['p1']['pid']
		game.p2_pid = self.rooms[room_name]['p2']['pid']
  
		room_db = await sync_to_async(Room.objects.get)(name=room_name)
		room_db.in_game = True
		await sync_to_async(room_db.save)()
  
		await sio.sleep(6)
		await self.emit('room', self.rooms[room_name], room=room_name, namespace=self.namespace)
		
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

		await self.save_result(room_name, game)
   
	async def save_result(self, room_name, game: GameState):
		room = await sync_to_async(Room.objects.get)(name=room_name)
 
		body = {
			"p1": room.p1,
			"p2": room.p2,
			"p1_score": game.score[0],
			"p2_score": game.score[1],
		}
  
		await sync_to_async(room.delete)()
  
		async with httpx.AsyncClient() as client:
			try:
				response = await client.post("http://localhost:8000/api/matches/", json=body)
				response.raise_for_status()  # 이를 통해 HTTP 에러 발생 시 예외를 발생시킵니다
				logging.debug(f'------------------ {response.status_code} ------------------------')
			except httpx.HTTPStatusError as exc:
				logging.error(f"HTTP error occurred: {exc.response.status_code} - {exc.response.text}")
			except httpx.RequestError as exc:
				logging.error(f"Request failed: {exc}")
			except Exception as exc:
				logging.error(f"An error occurred: {exc}")
		


	async def on_key(self, sid, message):
		info = await self.get_session(sid)
		room_name = info.get('room')
  
		game: GameState = self.games[room_name]
		pid = self.rooms[room_name][info['me']]['pid']
		game.set_player_dy(pid, message)

sio.register_namespace(Pong('/api/pong'))
