import socketio

manager = socketio.AsyncRedisManager('redis://redis:6379')
sio = socketio.AsyncServer(
    async_mode='asgi',
    client_manager=manager,
    cors_allowed_origins=[
		'http://localhost:8080',
		'http://localhost:8001',
	],
	logger=True, engineio_logger=True
)


@sio.event
async def connect(sid, environ, auth):
	pass

@sio.event
async def disconnect(sid):
	pass