# Docker-Flask-Gunicorn template

_Gilbert François Duivesteijn_



## About

This is a minimalistic template for a Python Flask driven web backend, using Gunicorn WSGI server, in a docker container.



## Build and run

```sh 
# Build (when needed), start the container and return the prompt (detach)
docker compose up -d
```

Check if it works. Open a browser use curl and go to `http://127.0.0.1:5000`. You should see "Hello world!"



## Follow the log

```sh
docker logs -f [container name]
```



## Get in the running container

```sh
docker exec -it [container name] /bin/bash
```



