#!/usr/bin/env bash

pythonApi() {
  source ./env/bin/activate
  cd sonos
  uvicorn index:app --reload
}

buttonApi() {
  cd sonos
  python index.py
}

nodeFe() {
#  cd fe
#  yarn dev
}

(trap 'kill 0' SIGINT; pythonApi & nodeFe)
