export function spotifyTrackToUri(id: string): string {
  return id.substr(30,22)
}
export function spotifyUriToTrack(uri: string): string {
  return `x-sonos-spotify:spotify:track:${uri}?sid=9&flags=8224&sn=2`
}
