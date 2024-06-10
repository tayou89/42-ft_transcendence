
from . import sio, manager, room_list, sid_table, lock
from .game_statge import GameState


@sio.event
async def enter_pong_room(sid, message):
	room_name = message['room']
	player = message['player']
	type = message['type']

	if type == 'create':
		if  room_name in room_list:
			await sio.emit('message', {'err': 'already exist'}, room=sid)
			return
		else:
			room_list[room_name] = {
				"type": "single",
				"p1": {"name": player, 'is_ready': False},
			}
			await sio.enter_room(sid, room_name)
			await sio.emit('message', room_list[room_name], room=room_name)
   
	else:
		if len(room_list[room_name]) == 3:
			await sio.emit('message', {'err': 'room is full'}, room=sid)
			return

		await sio.enter_room(sid, room_name)
						
		cur_room = room_list[room_name]
		cur_room["p2"] = {"name": player, 'is_ready': False}
		sid_table[sid] = {'player': player, 'room': room_name}

		await sio.emit('message', cur_room, room=room_name)



@sio.event
async def leave_pong_room(sid, message):
	room_name = message['room']
	player = message['player']
 
	if room_list[room_name]['p1']['name'] == player:
		room_list[room_name].pop('p1')
	else :
		room_list[room_name].pop('p2')
 
	await sio.leave_room(sid, room_name)
	sid_table.pop(sid)



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
     
		async with lock:
			if len(room_list[room_name]) != 3:
				if 'p1' in room_list[room_name]:
					game.unearned_win('p1')
				else:
					game.unearned_win('p2')
	
			game.update_game()
   
		await sio.emit(
	  		'message',
			{
				"ball_position": game.get_ball_position(),
				'paddle': game.get_bar_position(),
				'score': game.get_score()
			},
		 	room=room_name
		)

		await sio.sleep(1 / 30)
  
	await sio.emit(
		'message',
		game.get_result(),
		room=room_name
	)



@sio.event
async def move_paddle(sid, message):
	player = message['player']
	cur_room = room_list[message['room']]
	paddle_dir = message['paddle_dir']

	game = room_list['cur_room']
	async with lock:
		game.update_paddle_dir(player, paddle_dir)
