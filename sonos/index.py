import api
import asyncio
from hypercorn.config import Config
from hypercorn.asyncio import serve
from sonos import Sonos
from gpiozero import Button


def button_callback():
    Sonos.startParty()

button = Button(2)
button.when_pressed = button_callback

asyncio.run(serve(api.app, Config()))

