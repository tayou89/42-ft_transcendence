
HEIGHT = 100
WIDTH = 200
END_SCORE = 1
PADDLE = 0
P1 = 0
P2 = 1

class GameState:

	def __init__(self):
		self.p1_paddle = 0
		self.p2_paddle = 0

		self.p1_score = 0
		self.p2_score = 0

		self.ball_position = (0, 0)
		self.ball_velocity = (1, 1)

		self.player_channels = [None, None]

		self.game_end = False
	
	def add_player(self, channel):
		if self.player_channels[P1] is None:
			self.player_channels[P1] = channel
		else:
			self.player_channels[P2] = channel
  
	def check_player_cnt(self):
		return self.player_channels.count(None)

	def delete_player(self, channel):
		if self.player_channels[P1] == channel:
			self.player_channels[P1] = None
		else:
			self.player_channels[P2] = None

	def get_result(self):
		return ({
			'p1_score': self.p1_score,
			'p2_score': self.p2_score
		})
  
	def get_channels(self):
		return self.player_channels

	def get_p1_channel(self):
		return self.player_channels[P1]

	def get_p2_channel(self):
		return self.player_channels[P2]

	def is_ended(self):
		return self.game_end
	
	def get_ball_position(self):
		return self.ball_position

	def update_ball(self):
		x, y = self.ball_position
		dx, dy = self.ball_velocity

		if y >= HEIGHT or y <= -HEIGHT:
			dy = -dy
		
		if x >= WIDTH:
			if abs(self.p2_paddle - y) < PADDLE:
				dx = -dx
			else:
				x, y = 0, 0
				self.p2_score += 1
		
		if x <= -WIDTH:
			if abs(self.p1_paddle - y) < PADDLE:
				dx = -dx
			else:
				x, y = 0, 0
				self.p1_score += 1

		self.ball_position = (x + dx, y + dy)
		self.ball_velocity = (dx, dy)

		if self.p1_score == END_SCORE or self.p2_score == END_SCORE:
			self.game_end = True


	def update_paddle(self, paddle, position):
		if paddle == 'left':
			self.p1_paddle = position
		elif paddle == 'right':
			self.p2_paddle = position
