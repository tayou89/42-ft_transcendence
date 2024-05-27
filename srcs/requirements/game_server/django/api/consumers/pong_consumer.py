
from channels.generic.websocket import AsyncWebsocketConsumer
from ..models import Room
from .game_state import GameState

from channels.db import database_sync_to_async
from django.core.cache import cache
from enum import Enum

import json
import asyncio

class Status(Enum):
	NONE = 0
	PAUSED = 1
	STARTED = 2
	END = 3


class PongCunsumer(AsyncWebsocketConsumer):

	game = None

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

		room = cache.get(self.room_name, None)
		if room is None:
			cache.set(self.room_name, {'cur_users': 1, 'status': Status.NONE})
		else:
			room['cur_users'] += 1
			cache.set(self.room_name, room)




	async def disconnect(self, close_code):

		room = await database_sync_to_async(Room.objects.get)(name=self.room_name)
		room.cur_users -= 1

		if room.cur_users == 0:
			await database_sync_to_async(room.delete)()
		else:
			await database_sync_to_async(room.save)()

		room = cache.get(self.room_name)
		if room['cur_users'] == 1:
			room['cur_users'] = 0
			room['status'] = Status.END
			cache.delete(self.room_name)
		else:
			room['cur_users'] = 1
			room['status'] = Status.PAUSED
			cache.set(self.room_name, room)

		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)



	async def receive(self, text_data):

		room = cache.get(self.room_name)

		if room['cur_users'] != 2:
			await self.channel_layer.group_send(
				self.room_group_name,
				{
					'type': 'chat_message',
					'message': 'not enough users',
				}
			)
			return

		if room['status'] == Status.NONE:
			room['status'] = Status.STARTED
			cache.set(self.room_name, room)
			asyncio.create_task(self.game_loop())



	async def game_loop(self):

		self.game = GameState(0, 0)

		while self.game.is_ended() == False:
			
			room = cache.get(self.room_name)

			if room['cur_users'] != 2:
				
				await self.channel_layer.group_send(
					self.room_group_name,
					{
						'type': 'chat_message',
						'message': 'PAUSED'
					}
				)

				while room['cur_users'] != 2:
					room = cache.get(self.room_name)

					if room['status'] == Status.END:
						cache.delete(self.room_name)
						return

					await asyncio.sleep(1)

			self.game.update_ball()
			await self.channel_layer.group_send(
				self.room_group_name,
				{
					'type': 'chat_message',
					'message': self.game.get_ball_position()
				}
			)
			await asyncio.sleep(1/10)

		await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': self.game.get_result()
            }
        )

	async def chat_message(self, event):
		
		await self.send(text_data=json.dumps({
			'message': event['message']
		}))

