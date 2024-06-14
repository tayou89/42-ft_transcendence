#!/bin/sh

cd django

export DJANGO_SETTINGS_MODULE=gameserver.settings

python3 manage.py makemigrations
python3 manage.py makemigrations api

python3 manage.py migrate

# python3 manage.py runserver 0.0.0.0:8001
uvicorn gameserver.asgi:application --host 0.0.0.0 --port 8001
