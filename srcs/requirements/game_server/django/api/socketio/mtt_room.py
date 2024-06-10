
from . import sio, manager, room_list, room_table, lock
from .game_statge import GameState

@sio.event
async def enter_mtt_room(sid, message):
	room_name = message['room']
	player = message['player']
	
	if room_name in room_list and len(room_list[room_name]) == 2:
		await sio.emit('message', 'full', room=sid)
		return
	
	await sio.enter_room(sid, room_name)

	if room_name not in room_list:

		room_list[room_name] = {
			"type": "multi",
			"p1": {"name": player, 'is_ready': False},
		}
  
		await sio.emit('message', room_list[room_name], room=room_name)
				   
	elif "p1" not in room_list[room_name]:
		cur_room = room_list[room_name]
		cur_room["p1"] = {"name": player, 'is_ready': False}

		await sio.emit('message', cur_room, room=room_name)
				   
	elif "p2" not in room_list[room_name]:
		cur_room = room_list[room_name]
		cur_room["p2"] = {"name": player, 'is_ready': False}

		await sio.emit('message', cur_room, room=room_name)
	
	room_table[sid] = {'player': player, 'room': room_name}

