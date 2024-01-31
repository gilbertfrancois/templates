# Docker-Flask-Gunicorn-Nginx template

_Gilbert François Duivesteijn_

## About

- Python Flask website or REST api
- In production mode, served by Gunicorn to port 5000, exposed to the Docker internal bridge network only.
- Nginx reverse proxy to port 80, exposed to the Docker internal bridge network and the host machine.

## Build and run

```sh
# Build (when needed), start the container and return the prompt (detach)
docker compose up -d
```

Check if it works. Open a browser use curl and go to `http://localhost`. You should see "Hello world!"

## Follow the log

```sh
docker logs -f [container name]
```

## Get in the running container

```sh
docker exec -it [container name] /bin/bash
```

## See all docker network interfaces

```sh
docker network ls
```

## References

- [https://testdriven.io/blog/dockerizing-flask-with-postgres-gunicorn-and-nginx](Dockerizing Flask with Postgres, Gunicorn, and Nginx)
- [https://www.freecodecamp.org/news/docker-nginx-letsencrypt-easy-secure-reverse-proxy-40165ba3aee2](How to set up an easy and secure reverse proxy with Docker, Nginx & Letsencrypt)
