import math

END_SCORE = 7

WIDTH = 1300
HEIGHT = 800

BALL_RADIUS = 15

BAR_SPEED = 5
BAR_OFFSET = 50
BAR_HEIGHT = 60
BAR_WIDTH = 12

X = 0
Y = 1

P1 = 0
P2 = 1


def get_distance(coords1, coords2):
	x1, y1 = coords1
	x2, y2 = coords2
	distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
	return distance

class GameState:
	def __init__(self):
		self.ball_dir = [1, 0]  # x, y
		self.ball_speed = 10

		self.p1_sid = ''
		self.p2_sid = ''

		self.p1_dir = 0
		self.p2_dir = 0

		self.init_position()

		self.score = [-1, -1]  # p1,p2
		self.status = 'play'

		self.bounce_time = 0
		self.pause = 15

	def set_player_dy(self, player_channel_name, direction):
		if player_channel_name == self.p1_sid:
			self.p1_dir = direction
		elif player_channel_name == self.p2_sid:
			self.p2_dir = direction


	def stop_player(self, sid):
		if sid == self.p1_sid:
			self.p1_dir = 0
		elif sid == self.p2_sid:
			self.p2_dir = 0

	def get_ball_position(self):
		return self.ball_coords

	def next_frame(self) -> None:
		if self.pause == 0:
			self.move_ball()
		else:
			self.pause -= 1
		self.move_player()
		if self.ball_speed < 30:
			self.ball_speed += 0.2
		# return {
		#     "ball": self.ball_coords,
		#     "paddle": [self.p1_coords[1], self.p2_coords[1]],
		#     "score": self.score,
		# }
  
	def move_player(self):
		self.p1_coords[Y] += BAR_SPEED * self.p1_dir
		self.p1_coords[Y] = max(BAR_HEIGHT // 2, min(self.p1_coords[Y], HEIGHT - BAR_HEIGHT // 2))

		self.p2_coords[Y] += BAR_SPEED * self.p2_dir
		self.p2_coords[Y] = max(BAR_HEIGHT // 2, min(self.p2_coords[Y], HEIGHT - BAR_HEIGHT // 2))

	def move_ball(self):
		self.check_paddle_collision()
		self.ball_coords[X] += self.ball_speed * self.ball_dir[X]
		self.ball_coords[Y] += self.ball_speed * self.ball_dir[Y]

		self.check_wall_collision()

	def check_paddle_collision(self):
		if get_distance(self.p1_coords, self.ball_coords) <= BALL_RADIUS:
			self.ball_dir[X] *= -1

		if get_distance(self.p2_coords, self.ball_coords) <= BALL_RADIUS * 2:
			self.ball_dir[X] *= -1

	def check_wall_collision(self):
		if self.ball_coords[X] <= BALL_RADIUS:
			self.ball_dir[X] *= -1
			self.goal(P2)
		if self.ball_coords[X] >= WIDTH - BALL_RADIUS * 2:
			self.ball_dir[X] *= -1
			self.goal(P1)
		if self.ball_coords[Y] <= BALL_RADIUS or self.ball_coords[Y] >= HEIGHT - BALL_RADIUS * 2:
			self.ball_dir[Y] *= -1

	def goal(self, player):
		self.init_position()
		self.pause = 20
		if player == P1:
			self.score[P1] += 1
		elif player == P2:
			self.score[P2] += 1
		self.ball_speed = 5

		if self.score[0] >= END_SCORE:
			self.status = 'end'
		elif self.score[1] >= END_SCORE:
			self.status = 'end'


	def init_position(self):
		self.ball_coords = [WIDTH // 2, HEIGHT // 2]

		self.p1_coords = [BAR_OFFSET, HEIGHT // 2]
		self.p2_coords = [WIDTH - BAR_OFFSET, HEIGHT // 2]