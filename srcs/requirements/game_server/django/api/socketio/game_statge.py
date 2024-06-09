
HEIGHT = 100
WIDTH = 200
END_SCORE = 7
PADDLE_LENGTH = 0
P1 = 0
P2 = 1

class GameState:

	def __init__(self):
		self.p1_paddle = 0
		self.p2_paddle = 0
  
		self.p1_paddle_dir = 0
		self.p2_paddle_dir = 0

		self.p1_score = 0
		self.p2_score = 0

		self.ball_position = (0, 0)
		self.ball_dir = (1, 1)

		self.game_end = False

	def get_score(self):
		return ({
			'p1': self.p1_score,
			'p2': self.p2_score
		})

	def is_ended(self):
		return self.game_end

	def get_result(self):
		if self.p1_score > self.p2_score:
			return {
				'p1': 'win',
				'p2': 'lose'
			}
		else:
			return {
				'p1': 'lose',
				'p2': 'win'
			}
	
	def get_ball_position(self):
		return self.ball_position

	def get_bar_position(self):
		return {
			'p1': self.p1_paddle,
			'p2': self.p2_paddle
		}

	def unearned_win(self, player):
		if player == 'p1':
			self.p1_score = END_SCORE
			self.p2_score = 0
		else:
			self.p1_score = 0
			self.p2_score = END_SCORE

	def update_game(self):
		x, y = self.ball_position
		dx, dy = self.ball_dir

		if y >= HEIGHT or y <= -HEIGHT:
			dy = -dy
		
		if x >= WIDTH:
			if abs(self.p2_paddle - y) < PADDLE_LENGTH:
				dx = -dx
			else:
				x, y = 0, 0
				self.p2_score += 1
		
		if x <= -WIDTH:
			if abs(self.p1_paddle - y) < PADDLE_LENGTH:
				dx = -dx
			else:
				x, y = 0, 0
				self.p1_score += 1

		self.ball_position = (x + dx, y + dy)
		self.ball_dir = (dx, dy)

		if abs(self.p1_paddle + self.p1_paddle_dir) <= HEIGHT - (PADDLE_LENGTH / 2):
			self.p1_paddle += self.p1_paddle_dir
   
		if abs(self.p2_paddle + self.p2_paddle_dir) <= HEIGHT - (PADDLE_LENGTH / 2):
			self.p2_paddle += self.p2_paddle_dir

		if self.p1_score == END_SCORE or self.p2_score == END_SCORE:
			self.game_end = True

	def update_paddle_dir(self, player, dir):
		if player == 'p1':
			self.p1_paddle_dir = dir
		else:
			self.p2_paddle_dir = dir

