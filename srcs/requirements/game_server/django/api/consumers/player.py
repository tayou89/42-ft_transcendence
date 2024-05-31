
class Player:
	
	def __init__(self, name, channel):
		self.name = name
		self.channel = channel
		self.ready = False
  
	def make_ready(self):
		self.ready = True
  
	def make_unready(self):
		self.ready = False
  
	def is_ready(self):
		return self.ready

