from typing import Optional

from fastapi import FastAPI, Query
from pydantic import BaseModel
from enum import Enum
from sonos import Sonos
from storage import Storage


class Song(BaseModel):
    uri: str


class PartyState(str, Enum):
    start = "start"
    stop = "stop"


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/songs")
def add_song():
    songs = Storage.getSongs()
    return {"songs": songs}


@app.post("/songs/add")
def add_song(song: Song):
    Storage.addSongs([song.uri])
    return {"OK": True}


@app.post("/songs/clear")
def clear_song():
    Storage.clear()
    return {"OK": True}


@app.post("/party/{state}")
def party_state(
        state: PartyState,
        volume: Optional[int] = Query(ge=0, le=100, default=50)
):
    if state == PartyState.start:
        Sonos.startParty(volume)
    elif state == PartyState.stop:
        Sonos.startParty()
    return {"OK": True}
