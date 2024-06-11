"""
ASGI config for gameserver project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import django
django.setup()

import os
from django.core.asgi import get_asgi_application
from api.socketio.connection import sio
from socketio import ASGIApp

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django_asgi_app = get_asgi_application()

application = ASGIApp(sio, django_asgi_app)
