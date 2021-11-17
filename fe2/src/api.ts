import SpotifyWebApi from "spotify-web-api-node";
import SpotifyWebApiServer from 'spotify-web-api-node/src/server-methods';

SpotifyWebApi._addMethods(SpotifyWebApiServer);

const client_id = '342d8aa2c22c4847a7ed319ddb87e768';
const client_secret = '8c0194c87f304a1fa8cabed834cf5f65';
const spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
});

export async function getClient() {
  await spotifyApi.clientCredentialsGrant().then(
    function(data) {
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
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
  const {body: {tracks: {items: tracks}}} = await client.searchTracks(q);
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
