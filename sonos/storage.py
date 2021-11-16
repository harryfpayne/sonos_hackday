from typing import List

fileLocation: str = "./playlist.txt"

def shareLinkToUri(link: str) -> str:
    return "x-sonos-spotify:spotify:track:" + link.strip()[31:53] + "?sid=9&flags=8224&sn=2"

class Storage:
    @staticmethod
    def clear():
        open(fileLocation, "w").close()

    @staticmethod
    def addSongs(songs: List[str]):
        with open(fileLocation, "a") as file:
            file.write('\n'.join(songs) + "\n")

    @staticmethod
    def getSongs() -> List[str]:
        with open(fileLocation) as file:
            return [shareLinkToUri(song) for song in file.readlines()]
