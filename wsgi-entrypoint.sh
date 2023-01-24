#!/usr/bin/env bash

until cd /app/integrateusa
do
    echo "waiting for server volume..."
done

../manage.py migrate
../manage.py collectstatic --noinput

cd .. && gunicorn --bind 0.0.0.0:8000 integrateusa.wsgi:application --workers 3 --threads 3 --max-requests 1000 --max-worker-lifetime 3600 --reload-on-rss 256 --worker-reload-mercy 60