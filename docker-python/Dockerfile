FROM ubuntu:22.04

SHELL ["/bin/bash", "-c"]

RUN apt update && \
    apt install -y --no-install-recommends \
    python3-dev \
    python3-pip \
    python3-venv \
    build-essential \
    git 

# Create virtual environment, so that we can expose that later 
# outside of the container.
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
RUN python3 -m pip install --no-cache-dir -U pip

# Install project requirements.
WORKDIR /tmp
COPY requirements.txt /tmp/requirements.txt
RUN python3 -m pip install --no-cache-dir -r /tmp/requirements.txt

WORKDIR /src
