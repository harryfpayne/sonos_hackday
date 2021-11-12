import { useEffect, useState } from "react";
const { Client } = require("spotify-api.js");

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [queue, setQueue] = useState<Track[]>([]);

  async function search() {
    const res = await fetch(`/api/search?q=${query}`);
    const {tracks} = await res.json();
    setTracks(tracks);
  }

  async function getQueue() {
    const res = await fetch(`/api/list`);
    const {tracks} = await res.json();
    setQueue(tracks);
  }

  async function add(id: string) {
    await fetch(`/api/add?uri=${id}`);
    await getQueue();
  }

  async function clear() {
    await fetch(`/api/clear`);
    await getQueue();
  }


  useEffect(() => {
    search();
  }, [query])

  useEffect(() => {
    getQueue();
    fetch("http://localhost:8000/")
  }, [])


  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{flex: 1, borderRight: "solid black 2px", padding: "20px"}}>
        <h2>Add a track</h2>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <div>
          {tracks.map(track => (
            <div key={track.uri} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <div>
                <h3 style={{marginBottom: 0}}>{track.name} - {track.album}</h3>
                <span>{track.artist}</span>
              </div>
              <button onClick={() => add(track.uri)}>+</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{flex: 1, padding: "20px"}}>
        <button onClick={() => clear()}>Clear</button>
        <h2>Queued up tracks</h2>
        {queue.map(track => (
          <div key={track.uri + "-list"}>
            <h3 style={{marginBottom: 0}}>{track.name} - {track.album}</h3>
            <span>{track.artist}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const client_id = '342d8aa2c22c4847a7ed319ddb87e768';
const client_secret = '8c0194c87f304a1fa8cabed834cf5f65';

export async function getClient() {
  return new Promise(res => {
    const client = new Client({
      token: { clientID: client_id, clientSecret: client_secret },
      // Ready event is required if you are providing clientID and clientSecret fields.
      // As the client has to create the token first with it and then emits the ready event.
      onReady() {
        res(client)
      }
    })
  })
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
  const client: any = await getClient();
  const res = await fetch("http://localhost:8000/songs");
  const songs = await res.json();
  const ids = songs.songs.filter(Boolean);
  const tracks = await client.tracks.getMultiple(ids.map(spotifyTrackToUri));
  return tracks.map(trackToTrack);
}

export async function search(q: string): Promise<Track[]> {
  const client: any = await getClient();
  const tracks = await client.tracks.search(q);
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
  return `x-sonos-spotify:spotify:track:${uri}?sid=9&flags=8224&sn=2`
}



