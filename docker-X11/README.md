# Docker template for macOS running X11 app



## About

This repository contains a simple, minimalistic template for running a X11 application in a docker on macOS (Intel and Apple Silicon). For completeness, a docker-compose.yml file is included, to make starting the xclock application a bit easier.



## Build and run with docker-compose

```sh
# Set environment variables
source env_macos.sh

# Build and run
docker-compose build
docker-compose up
```



## Build and run without docker compose

```sh
# Set environment variables
source env_macos.sh

# Build
docker build . -t docker-xclock

# Run
docker run -rm \
	-e DISPLAY=$IP:0 \
	-e XAUTHORITY=/.Xauthority \
	-v /tmp/.X11-unix:/tmp/.X11-unix \
	-v ~/.Xauthority:/.Xauthority \
	docker-xclock /usr/bin/xclock
```





## Remove all stopped containers

```sh
# Are you sure?
docker rm $(docker ps -aq)
```



## Remove all images

```sh
# Are you sure?
docker rmi $(docker images -aq)
```



