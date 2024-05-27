#!/bin/sh

cd django

python3 manage.py makemigrations
python3 manage.py makemigrations api

python3 manage.py migrate

# python3 manage.py runserver 0.0.0.0:8000
gunicorn -k gevent --workers 4 --bind 0.0.0.0:8000 user_manage.wsgi:application