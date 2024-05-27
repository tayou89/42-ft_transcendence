"""
ASGI config for gameserver project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gameserver.settings')
django_asgi_app = get_asgi_application()

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path, re_path
from api.consumers import PongCunsumer, MultiPongConsumer

application = ProtocolTypeRouter({
	"http": get_asgi_application(),
	"websocket": AuthMiddlewareStack(
		URLRouter([
			re_path(r"api/pong/(?P<room_name>\w+)/$", PongCunsumer.as_asgi()),
			re_path(r"api/mtt/(?P<room_name>\w+)/$", MultiPongConsumer.as_asgi()),
		])
	),
})
