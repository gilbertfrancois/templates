# Run docker container with X11 forwarding on macOS Ventura
export IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
export DISPLAY=$IP:0
xhost +$IP
xhost +local:docker
