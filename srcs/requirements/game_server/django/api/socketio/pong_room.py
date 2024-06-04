
from . import sio, manager, room_list, room_table
from .game_statge import GameState

@sio.event
async def enter_pong_room(sid, message):
	room_name = message['room']
	player = message['player']
	
	if room_name in room_list and len(room_list[room_name]) == 2:
		await sio.emit('message', 'full', room=sid)
		return
	
	await sio.enter_room(sid, room_name)

	if room_name not in room_list:

		room_list[room_name] = {
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

@sio.event
async def leave_pong_room(sid, message):
	room_name = message['room']
	player = message['player']
 
	if room_list[room_name]['p1']['name'] == player:
		room_list[room_name].pop('p1')
	else :
		room_list[room_name].pop('p2')
 
	await sio.leave_room(sid, room_name)
	room_table.pop(sid)

@sio.event
async def make_ready(sid, message):
	player = message['player']
	cur_room = room_list[message['room']]
	flag = True if message['status'] == 'ready' else False
	
	if cur_room['p1']['name'] == player:
		cur_room['p1']['is_ready'] = flag
	else:
		cur_room['p2']['is_ready'] = flag
  
	await sio.emit('message', cur_room, room=message['room'])

	if cur_room['p1']['is_ready'] and cur_room['p2']['is_ready']:
		await sio.start_background_task(play_pong, message['room'])	
		
async def play_pong(room_name):
	game = GameState()
	await sio.sleep(5)
	
	while game.is_ended() == False:
		
		game.update_game()
		game.update_paddle_dir("p1", 1)
		await sio.emit(
      		'message',
        	{
				"ball_position": game.get_ball_position(),
            	'paddle': game.get_bar_position(),
				'score': game.get_score()
			},
         	room=room_name
        )

		await sio.sleep(1/30)
  
	await sio.emit(
		'message',
		{
			"result": game.get_result(),
		},
		room=room_name
	)
