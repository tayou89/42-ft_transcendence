
WIDTH = 1300
HEIGHT = 800

PADDLE_HEIGHT = 60
PADDLE_WIDTH = 12
PADDLE_OFFSET = 50

BALL_RADIUS = 15
END_SCORE = 7


class GameState:

	def __init__(self):
		self.p1_paddle = 400
		self.p2_paddle = 400
  
		self.p1_paddle_dir = 0
		self.p2_paddle_dir = 0

		self.p1_score = 0
		self.p2_score = 0

		self.ball_position = (650, 650)
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

		# 공의 위치 업데이트
		if y >= HEIGHT - BALL_RADIUS or y <= BALL_RADIUS:
			dy = -dy

		if x >= WIDTH - BALL_RADIUS - PADDLE_OFFSET - PADDLE_WIDTH:
			if self.p2_paddle - PADDLE_HEIGHT // 2 <= y <= self.p2_paddle + PADDLE_HEIGHT // 2:
				dx = -dx
			else:
				x, y = WIDTH // 2, HEIGHT // 2
				self.p1_score += 1
				dx = -dx

		if x <= BALL_RADIUS + PADDLE_OFFSET + PADDLE_WIDTH:
			if self.p1_paddle - PADDLE_HEIGHT // 2 <= y <= self.p1_paddle + PADDLE_HEIGHT // 2:
				dx = -dx
			else:
				x, y = WIDTH // 2, HEIGHT // 2 
				self.p2_score += 1
				dx = -dx

		self.ball_position = (x + dx, y + dy)
		self.ball_dir = (dx, dy)

		if 0 <= self.p1_paddle + self.p1_paddle_dir <= HEIGHT - PADDLE_HEIGHT:
			self.p1_paddle += self.p1_paddle_dir

		if 0 <= self.p2_paddle + self.p2_paddle_dir <= HEIGHT - PADDLE_HEIGHT:
			self.p2_paddle += self.p2_paddle_dir

		if self.p1_score == END_SCORE or self.p2_score == END_SCORE:
			self.game_end = True

	def update_paddle_dir(self, player, dir):
		if player == 'p1':
			self.p1_paddle_dir = dir
		else:
			self.p2_paddle_dir = dir

