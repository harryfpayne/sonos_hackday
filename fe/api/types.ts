export interface Track {
  uri: string;
  name: string;
  album: string;
  artist: string;
}

export const trackToTrack = (track: any) => ({
  uri: track.id,
  name: track.name,
  artist: track.artists[0]?.name ?? "???",
  album: track?.album?.name ?? "???",
})
