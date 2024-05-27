
HEIGHT = 100
WIDTH = 200
END_SCORE = 1
PADDLE = 0

class GameState:

	def __init__(self, x, y):
		self.left_paddle = 0
		self.right_paddle = 0
		self.ball_position = (x, y)
		self.ball_velocity = (1, 1)
		self.left_score = 0
		self.right_score = 0
		self.game_end = False

	def get_result(self):
		return ({
			'left_score': self.left_score,
			'right_score': self.right_score
		})

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
			if abs(self.right_paddle - y) < PADDLE:
				dx = -dx
			else:
				x, y = 0, 0
				self.right_score += 1
		
		if x <= -WIDTH:
			if abs(self.left_paddle - y) < PADDLE:
				dx = -dx
			else:
				x, y = 0, 0
				self.left_score += 1

		self.ball_position = (x + dx, y + dy)
		self.ball_velocity = (dx, dy)

		if self.left_score == END_SCORE or self.right_score == END_SCORE:
			self.game_end = True


	def update_paddle(self, paddle, position):
		if paddle == 'left':
			self.left_paddle = position
		elif paddle == 'right':
			self.right_paddle = position
