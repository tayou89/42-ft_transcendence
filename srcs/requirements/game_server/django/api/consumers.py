from channels.generic.websocket import AsyncWebsocketConsumer

import json
import asyncio

HEIGHT = 300
WIDTH = 400


class GameState:

	def __init__(self):
		self.left_paddle = 0
		self.right_paddle = 0
		self.ball_position = (0, 0)
		self.ball_velocity = (1, 1)
		self.left_score = 0
		self.right_score = 0

	def update_ball(self):
		x, y = self.ball_position
		dx, dy = self.ball_velocity

		if y >= HEIGHT or y <= -HEIGHT:
			dy = -dy
		
		if x >= WIDTH:
			if abs(self.right_paddle - y) < 50:
				dx = -dx
			else:
				x, y = 0, 0
				self.right_score += 1
		
		if x <= -WIDTH:
			if abs(self.left_paddle - y) < 50:
				dx = -dx
			else:
				x, y = 0, 0
				self.left_score += 1

		self.ball_position = (x + dx, y + dy)
		self.ball_velocity = (dx, dy)

	def update_paddle(self, paddle, position):
		if paddle == 'left':
			self.left_paddle = position
		elif paddle == 'right':
			self.right_paddle = position


class ChatConsumer(AsyncWebsocketConsumer):

	async def connect(self):
		

		await self.accept()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		# text_data_json = json.loads(text_data)
		
		if text_data == 'start':
			game = GameState()

			while game.left_score != 7 and game.right_score != 7:
				game.update_ball()
				await self.send(text_data=json.dumps({'message': game.ball_position}))
				await asyncio.sleep(1)
