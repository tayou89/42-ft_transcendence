import math

END_SCORE = 100

WIDTH = 1300
HEIGHT = 800

BALL_RADIUS = 15

BAR_SPEED = 20
BAR_OFFSET = 50
BAR_HEIGHT = 120
BAR_WIDTH = 20

X = 0
Y = 1

P1 = 0
P2 = 1

def calculate_bounce_angle(ball_dir, ball_y, paddle_y) -> list:

	relative_intersect_y = ((ball_y + BALL_RADIUS) - (paddle_y + BAR_HEIGHT // 2)) / (BAR_HEIGHT / 2)
	
	max_bounce_angle = math.pi / 3
	bounce_angle = relative_intersect_y * max_bounce_angle

	new_direction_x = math.cos(bounce_angle)
	new_direction_y = math.sin(bounce_angle)

	if ball_dir[X] < 0:
		return [new_direction_x, new_direction_y]
	else:
		return [-new_direction_x, new_direction_y]


def check_collision(ball, bar):
    
	ball_left = ball[X]
	ball_right = ball[X] + BALL_RADIUS * 2
	ball_top = ball[Y]
	ball_bottom = ball[Y] + BALL_RADIUS * 2

	bar_left = bar[X]
	bar_right = bar[X] + BAR_WIDTH
	bar_top = bar[Y]
	bar_bottom = bar[Y] + BAR_HEIGHT

	if ball_bottom < bar_top or ball_top > bar_bottom:
		return False

	if ball_right < bar_left or ball_left > bar_right:
		return False

	return True


def clamp(value, min_value, max_value):
	return max(min(value, max_value), min_value)


class GameState:
	def __init__(self):
		self.ball_dir = [-1, 0]
		self.ball_speed = 5

		self.p1_pid = 0
		self.p2_pid = 0

		self.p1_dir = 0
		self.p2_dir = 0

		self.init_position()

		self.score = [0, 0]
		self.status = 'play'

		self.bounce_time = 0
		self.pause = 15

	def set_player_dy(self, pid, direction):
		if pid == self.p1_pid:
			self.p1_dir = direction
		elif pid == self.p2_pid:
			self.p2_dir = direction

	def next_frame(self) -> None:
		if self.pause > 0:
			self.pause -= 1
		else:
			self.move_ball()
			self.move_player()
		return {
			"ball": self.ball_coords,
			"paddle": [self.p1_coords[1], self.p2_coords[1]],
			"score": self.score,
		}
  
	def move_player(self):
		self.p1_coords[Y] += BAR_SPEED * self.p1_dir
		self.p1_coords[Y] = clamp(self.p1_coords[Y], 10, HEIGHT - BAR_HEIGHT - 10)

		self.p2_coords[Y] += BAR_SPEED * self.p2_dir
		self.p2_coords[Y] = clamp(self.p2_coords[Y], 10, HEIGHT - BAR_HEIGHT - 10)

	def move_ball(self):

		self.check_paddle_collision()
  
		self.ball_coords[X] += self.ball_speed * self.ball_dir[X]
		self.ball_coords[Y] += self.ball_speed * self.ball_dir[Y]
		self.ball_coords[Y] = clamp(self.ball_coords[Y], BALL_RADIUS, HEIGHT - BALL_RADIUS * 2)

		self.check_wall_collision()
  
		if self.ball_speed < 30:
			self.ball_speed += 0.2
  

	def check_paddle_collision(self):

		if self.ball_dir[X] < 0 and check_collision(self.ball_coords, self.p1_coords):
			self.ball_dir = calculate_bounce_angle(self.ball_dir, self.ball_coords[Y], self.p1_coords[Y])

		if self.ball_dir[X] > 0 and check_collision(self.ball_coords, self.p2_coords):
			self.ball_dir = calculate_bounce_angle(self.ball_dir, self.ball_coords[Y], self.p2_coords[Y])
   
	def check_wall_collision(self):
		if self.ball_coords[X] <= 0 - BALL_RADIUS * 2:
			self.goal(P2)
		if self.ball_coords[X] >= WIDTH + BALL_RADIUS * 2:
			self.goal(P1)
		if self.ball_coords[Y] <= BALL_RADIUS or self.ball_coords[Y] >= HEIGHT - BALL_RADIUS * 2:
			self.ball_dir[Y] *= -1

	def goal(self, player):
		self.init_position()
		self.pause = 20
		if player == P1:
			self.ball_dir = [1, 0]
			self.score[P1] += 1
		elif player == P2:
			self.ball_dir = [-1, 0]
			self.score[P2] += 1
		self.ball_speed = 5

		if self.score[0] >= END_SCORE:
			self.status = 'end'
		elif self.score[1] >= END_SCORE:
			self.status = 'end'

	def unearned_win(self, player):
		if player == 'p1':
			self.score[P1] = 7
			self.score[P2] = 0
		else:
			self.score[P1] = 0
			self.score[P2] = 7
		self.status = 'end'

	def get_result(self):
		if self.score[P1] >= END_SCORE:
			return {
				"p1": "win",
				"p2": "lose",
			}
		else:
			return {
				"p1": "lose",
				"p2": "win",
			}

	def init_position(self):
		self.ball_coords = [WIDTH // 2 - BALL_RADIUS, HEIGHT // 2 - BALL_RADIUS]

		self.p1_coords = [BAR_OFFSET, HEIGHT // 2 - BAR_HEIGHT // 2]
		self.p2_coords = [WIDTH - BAR_OFFSET - BAR_WIDTH, HEIGHT // 2 - BAR_HEIGHT // 2]
