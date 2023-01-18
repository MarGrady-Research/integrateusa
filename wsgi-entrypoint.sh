#!/usr/bin/env bash

until cd /app/integrateusa
do
    echo "waiting for server volume..."
done

../manage.py migrate
../manage.py collectstatic --noinput

cd .. && gunicorn --bind 0.0.0.0:8000 integrateusa.wsgi:application --workers 4 --threads 4