from typing import List

fileLocation: str = "./playlist.txt"

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
            return [song.strip() for song in file.readlines()]
