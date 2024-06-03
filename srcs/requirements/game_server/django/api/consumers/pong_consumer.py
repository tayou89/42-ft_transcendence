
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from ..models import Room
from .game_state import GameState

from channels.db import database_sync_to_async
from django.core.cache import cache

from channels.layers import get_channel_layer

import json
import asyncio


async def send_msg_to_channels(channels, message):
	channel_layer = get_channel_layer()

	for chan in channels:
		if chan is not None:
			await channel_layer.send(
				chan,
				{
					"type": "send_message",
					"message": message,
				}
			)

async def send_msg_to_channel(channel, message):
	channel_layer = get_channel_layer()

	await channel_layer.send(
		channel,
		{
			"type": "send_message",
			"message": message,
		}
	)


class PongCunsumer(AsyncJsonWebsocketConsumer):

	game_rooms = {}

	async def connect(self):
		await self.accept()

		self.room_name = self.scope['url_route']['kwargs']['room_name']

		room, created = await database_sync_to_async(Room.objects.get_or_create)(name=self.room_name)

		if room.cur_users == 0:			
			room.cur_users += 1
			await database_sync_to_async(room.save)()
   
			game = self.game_rooms[self.room_name] = GameState()
			game.add_player(self.channel_name)
   

		elif room.cur_users == 1:
			room.cur_users += 1
			await database_sync_to_async(room.save)()
   
			game = self.game_rooms[self.room_name]
			game.add_player(self.channel_name)
   

		elif room.cur_users == 2:

			await self.send(text_data=json.dumps({
				'message': 'room is full'
			}))

			await self.close()
			return


	async def disconnect(self, close_code):

		room = await database_sync_to_async(Room.objects.get)(name=self.room_name)
		room.cur_users -= 1

		if room.cur_users == 0:
			self.game_rooms.pop(self.room_name)
			await database_sync_to_async(room.delete)()
		else:
			game = self.game_rooms[self.room_name]
			game.delete_player(self.channel_name)
			await database_sync_to_async(room.save)()


	async def receive(self, text_data):
		
		channels = self.game_rooms[self.room_name].get_channels()
  
		await send_msg_to_channels(channels, text_data)



	async def game_loop(self):
	
		game = self.game_rooms[self.room_name]
		channels = game.get_channels()
		await send_msg_to_channels(channels, "game start")

		await asyncio.sleep(5)

		while game.is_ended() == False:
				
			while game.check_player_cnt() > 0:
				await send_msg_to_channels(
        			game.get_channels(), 
           			"waiting for another player")
				await asyncio.sleep(1)

			game.update_ball()
			await send_msg_to_channels(game.get_channels(), game.get_ball_position())
			await asyncio.sleep(1 / 30)

		result = game.get_result()
		if result['p1_score'] > result['p2_score']:
			await send_msg_to_channel(game.get_p1_channel(), "win")
			await send_msg_to_channel(game.get_p2_channel(), "lose")
		else:
			await send_msg_to_channel(game.get_p1_channel(), "lose")
			await send_msg_to_channel(game.get_p2_channel(), "win")
			

	async def send_message(self, event):
    	
		await self.send_json({
			'message': event['message']
		})



