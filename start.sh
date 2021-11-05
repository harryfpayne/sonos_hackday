#!/usr/bin/env bash

pythonApi() {
  source ./env/bin/activate
  cd sonos
  uvicorn index:app --reload
}

nodeFe() {
#  cd fe
#  yarn dev
}

(trap 'kill 0' SIGINT; pythonApi & nodeFe)
