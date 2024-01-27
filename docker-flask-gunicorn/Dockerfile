FROM python:3.11.3-slim
COPY requirements.txt /
RUN pip3 install -r /requirements.txt
COPY ./app /app
COPY ./run_prod.sh /
