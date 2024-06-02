
from . import sio

@sio.event
async def chat(sid, data):
    await sio.emit('message', data, room=sid)
