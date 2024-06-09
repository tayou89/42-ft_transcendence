import socketio
import asyncio

manager = socketio.AsyncRedisManager('redis://redis:6379')
sio = socketio.AsyncServer(async_mode='asgi',
						   client_manager=manager)
lock = asyncio.Lock()

room_list = {}
sid_table = {}

@sio.event
async def connect(sid, environ, auth):
	pass

@sio.event
async def disconnect(sid):
	if sid in sid_table:
		room_name = sid_table[sid]['room']
		sio.leave_room(sid, room_name)

		async with lock:
			if room_list[room_name]['p1']['name'] == sid_table[sid]['player']:
				room_list[room_name].pop('p1')
			else:
				room_list[room_name].pop('p2')

		sid_table.pop(sid)