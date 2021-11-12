from typing import List, Optional
import soco

from storage import Storage


class Sonos:
    speaker: soco.SoCo = None

    def __init__(self):
        speakers = soco.discover()
        speaker = speakers.pop()
        speaker.partymode()
        self.speaker = speaker

    def clearQueue(self):
        self.speaker.clear_queue()

    def addSong(self, uri: str):
        self.speaker.add_uri_to_queue(uri)

    def addSongs(self, songs: List[str]):
        self.speaker.add_multiple_to_queue(songs)

    def play(self):
        self.speaker.play()

    def pause(self):
        self.speaker.pause()

    def set_volume(self, vol: int):
        self.speaker.volume = vol

    @staticmethod
    def startParty(volume: Optional[int] = None):
        sonos = Sonos()
        songs = Storage.getSongs()
        sonos.clearQueue()
        for song in songs:
            sonos.addSong(song)
        if volume is not None:
            sonos.set_volume(volume)
        sonos.play()

    @staticmethod
    def stopParty():
        sonos = Sonos()
        sonos.clearQueue()
        sonos.pause()
