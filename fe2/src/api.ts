import SpotifyWebApi from "spotify-web-api-js";

const access_token = "BQBf88zKgw2RCaCW0Km3zlJjZucSOXyaLazF3GGmwYewBHIx9xw60Gd4PZkMOO033lpygI8gCWUQo8Sr4UOZtq7CHcwGi_NXDxAFis58DjMtpTbBEaurU1UPB2FCZfvM4bYKrDj3B9quHlZOcOaRTILg&refresh_token=AQAaQZxJ7_gp46p0TBS0XDjTF8dbj17MG9oVHas09irT4ely7UyifzuAYQ2F4gcQ7sxByOnO3tx6CglD_EPas0dElUwFhVKi8qtyiJ5l3GAiGL6pfqChUgRH13dY3_IiN1M";
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(access_token);

export async function getClient() {
  return spotifyApi;
}

export async function add(uri: string) {
  await fetch(`http://localhost:8000/songs/add/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({uri: spotifyUriToTrack(uri)})
  });
}

export async function clear() {
  await fetch(`http://localhost:8000/songs/clear`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
  });
}

export async function queue(): Promise<Track[]> {
  const client = await getClient();
  const res = await fetch("http://localhost:8000/songs");
  const songs = await res.json();
  const ids = songs.songs.filter(Boolean);
  if (!ids || ids.length === 0) return [];
  const {tracks} = await client.getTracks(ids.map(spotifyTrackToUri));
  return tracks.map(trackToTrack);
}

export async function search(q: string): Promise<Track[]> {
  if (q === "") return [];
  const client = await getClient();
  const {tracks: {items: tracks}} = await client.searchTracks(q);
  return tracks.map(trackToTrack)
}

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

export function spotifyTrackToUri(id: string): string {
  return id.substr(30,22)
}
export function spotifyUriToTrack(uri: string): string {
  return `https://open.spotify.com/track/${uri}?si=d2a7d71343e24769`
}
