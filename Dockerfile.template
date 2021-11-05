# base-image for python on any machine using a template variable,
# see more about dockerfile templates here: https://www.balena.io/docs/learn/develop/dockerfile/
FROM balenalib/%%BALENA_MACHINE_NAME%%-python:3-stretch-run

WORKDIR /usr/src/app

RUN cd ./sonos
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . ./

ENV UDEV=1

CMD ["./start.sh"]
