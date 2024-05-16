from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Room, GameState

from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async

import json
import asyncio

class ChatConsumer(AsyncWebsocketConsumer):


	async def connect(self):
		self.room_name = self.scope['url_route']['kwargs']['room_name']
		self.room_group_name = f'pong_{self.room_name}'

		room, created = await database_sync_to_async(Room.objects.get_or_create)(name=self.room_name)

		if room.cur_users == 2:
			await self.close()
			return
		
		room.cur_users += 1
		await database_sync_to_async(room.save)()

		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		await self.accept()


	async def disconnect(self, close_code):

		room = await database_sync_to_async(Room.objects.get)(name=self.room_name)
		room.cur_users -= 1
		await database_sync_to_async(room.save)()

		if room.cur_users == 0:
			await database_sync_to_async(room.delete)()

		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)




	async def receive(self, text_data):

		room = await database_sync_to_async(Room.objects.get)(name=self.room_name)

		if room.cur_users != 2:
			await self.channel_layer.group_send(
				self.room_group_name,
				{
					'type': 'chat_message',
					'message': "not enough users",
				}
			)
		else:
			game = GameState(0, 0)

			while game.left_score != 7 and game.right_score != 7:
				game.update_ball()
				await self.channel_layer.group_send(
					self.room_group_name,
					{
						'type': 'chat_message',
						'message': game.ball_position
					}
				)
				await asyncio.sleep(1 / 10)



	async def chat_message(self, event):
		message = event['message']
		
		await self.send(text_data=json.dumps({
			'message': message
		}))
