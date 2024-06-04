import socketio

manager = socketio.AsyncRedisManager('redis://redis:6379')
sio = socketio.AsyncServer(async_mode='asgi',
						   client_manager=manager)

room_list = {}
room_table = {}

@sio.event
async def connect(sid, environ, auth):
	pass

@sio.event
async def disconnect(sid):
	if sid in room_table:
		room_name = room_table[sid]['room']
		sio.leave_room(sid, room_name)

		if room_list[room_name]['p1']['name'] == room_table[sid]['player']:
			room_list[room_name].pop('p1')
		else:
			room_list[room_name].pop('p2')

		room_table.pop(sid)