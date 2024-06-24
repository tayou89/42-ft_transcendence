import httpx

import socketio
import asyncio

from . import sio
from .game_state import GameState
from ..models import Room

from asgiref.sync import sync_to_async
from .pong import Pong


class MttPong(Pong):
	
	rooms = {}
	locker = {}
	games = {}
	sub_games = {}
	
	def __init__(self, namespace=None):
		super().__init__(namespace)
		self.field_list = ['p1', 'p2', 'p3', 'p4']
		self.MAX_USER = 4
 
	


sio.register_namespace(MttPong('/api/mtt'))
