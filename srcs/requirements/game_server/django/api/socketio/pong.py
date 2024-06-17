

import socketio
import asyncio

from . import sio, manager
from .game_state import GameState
from ..models import Room, RoomSerializer

from asgiref.sync import sync_to_async

async def func():
	for i in range(10):
		await sio.emit(
			'ball',
			(i * 10, i * 10),
			room='hello',
			namespace='/api/pong'
		)
		await asyncio.sleep(1)

class Pong(socketio.AsyncNamespace):
	
	rooms = {}
	locker = {}
	games = {}
	
	def __init__(self, namespace=None):
		super().__init__(namespace)
 
	async def on_connect(self, sid, environ):
		await self.enter_room(sid, "hello")

		asyncio.create_task(self.play_pong("hello"))

		# await self.play_pong("hello")
  
		# field_list = ['p1', 'p2']
		# pid = '1'
		# room_name = 'hello'
  
		# room = await sync_to_async(Room.objects.get)(name=room_name)
  
		# if room.cur_users == 2:
		# 	# await sio.emit(
	   	# 	# 	'message',
		#   	# 	{'err': 'room is full'},
		# 	# 	room=sid,
		# 	#  	namespace=self.namespace
		# 	# )
		# 	return
		
		# for field in field_list:
		# 	if getattr(room, field, None) is None:
		# 		setattr(room, field, pid)
		# 		break
  
		# room.cur_users += 1
		# await self.enter_room(sid, room_name)
  
		# cur_room = self.rooms.get(room_name)
		# if cur_room is None:
		# 	self.rooms[room_name] = {
		# 		"p1": {"pid": pid, "ready": False},
		# 		"p2": None,
		# 	}
		# 	await self.save_session(sid, {'me': 'p1', 'room': room_name})
		# else:
		# 	for key, value in cur_room.items():
		# 		if value is None:
		# 			self.rooms[room_name][key] = {"pid": pid, "ready": False} 
		# 			break
		# 	await self.save_session(sid, {'me': 'p2', 'room': room_name})
  
		# await sync_to_async(room.save)()
   
		# await sio.emit(
		# 		'message',
		# 		self.rooms[room_name],
		# 		room=room_name,
		# 		namespace=self.namespace
		# )
  
		# if room.cur_users == 2:
		# 	await sio.start_background_task(self.play_pong, room_name)
  
	
	async def on_disconnect(self, sid):
		# field_list = ['p1', 'p2']
		# info = await self.get_session(sid)
		# me = info.get('me')
		# room_name = info.get('room')
  
		# self.rooms[room_name][me] = None
		# await self.save_session(sid, None)
		# room_db = await sync_to_async(Room.objects.get)(name=room_name)
		
		# for field in field_list:
		# 	if field == me:
		# 		setattr(room_db, field, None)
		# 		break
		# room_db.cur_users -= 1
		# if room_db.cur_users == 0:
		# 	await sync_to_async(room_db.delete)()
		# else:
		# 	await sync_to_async(room_db.save)()
		# 	await self.emit('message', self.rooms[room_name], room=room_name, namespace=self.namespace)
		pass

	
	async def on_join_room(self, sid, message):
		field_list = ['p1', 'p2']
		pid = message['pid']
		room_name = message['room']
  
		room = await sync_to_async(Room.objects.get)(name=room_name)
  
		if room.cur_users == 2:
			await sio.emit(
	   			'message',
		  		{'err': 'room is full'},
				room=sid,
			 	namespace=self.namespace
			)
			return
		
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
			await self.save_session(sid, {'me': 'p2', 'room': room_name})
  
		await sync_to_async(room.save)()
   
		await sio.emit(
				'message',
				self.rooms[room_name],
				room=room_name,
				namespace=self.namespace
		)
  
  
	async def on_leave_room(self, sid, message):
		field_list = ['p1', 'p2']
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
	   			'message',
				self.rooms[room_name],
				room=room_name,
				namespace=self.namespace
			)
  
	async def on_ready(self, sid, message):
		flag = message['ready']
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		self.rooms[room_name][me]['ready'] = flag
		await self.emit('message', self.rooms[room_name], room=room_name, namespace=self.namespace)
  
		cur_room = self.rooms[room_name]
		if cur_room['p2'] is not None and cur_room['p2']['ready'] and cur_room['p1']['ready']:
			await self.play_pong(room_name)


	async def play_pong(self, room_name):
		game = self.games[room_name] = GameState()
		lock = self.locker[room_name] = asyncio.Lock()
  
		# room_db = await sync_to_async(Room.objects.get)(name=room_name)
		# room_db.in_game = True
		# await sync_to_async(room_db.save)()
  
		# await self.emit('message', {'status': 'game starts soon...'}, room=room_name, namespace=self.namespace)
		# await sio.sleep(5)
		
		while game.status != 'end':
      
			# if len(self.rooms[room_name]) != 2:
			# 	if 'p1' in self.rooms[room_name]:
			# 		game.unearned_win('p1')
			# 	else:
			# 		game.unearned_win('p2')
			# 	break

			game.next_frame()

			await sio.emit(
				'ball',
				game.get_ball_position(),
				room=room_name,
				namespace=self.namespace
			)
   
			# await sio.emit(
			# 	'paddle',
			# 	game.get_bar_position(),
			# 	room=room_name,
			# 	namespace=self.namespace
			# )
   
			# await sio.emit(
			# 	'score',
			# 	game.get_score(),
			# 	room=room_name,
			# 	namespace=self.namespace
			# )

			# await sio.emit(
			# 	'message',
			# 	{
			# 		"ball_position": game.get_ball_position(),
			# 		'paddle': game.get_bar_position(),
			# 		'score': game.get_score()
			# 	},
			# 	room=room_name,
			# 	namespace=self.namespace
			# )

			await sio.sleep(1 / 30)
	
		# await sio.emit(
		# 	'message',
		# 	game.get_result(),
		# 	room=room_name,
		# 	namespace=self.namespace
		# )

	async def move_paddle(self, sid, message):
		paddle_dir = message['dir']
		info = await self.get_session(sid)
		me = info.get('me')
		room_name = info.get('room')
  
		game = self.games[room_name]
		lock = self.locker[room_name]

		async with lock:
			game.update_paddle_dir(me, paddle_dir)

sio.register_namespace(Pong('/api/pong'))
