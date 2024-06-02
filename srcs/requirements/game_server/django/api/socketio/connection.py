import socketio

manager = socketio.AsyncRedisManager('redis://redis:6379')
sio = socketio.AsyncServer(async_mode='asgi',
                           client_manager=manager)

room_list = {}

@sio.event
async def connect(sid, environ, auth):
	pass

@sio.event
async def disconnect(sid):
    pass