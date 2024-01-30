#!/bin/sh
gunicorn --access-logfile - --chdir app main:app -w 2 --threads 2 --bind 0.0.0.0:5000
