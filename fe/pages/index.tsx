import { useEffect, useState } from "react";
import { Track } from "../api/types";

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
  }, [])


  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <div style={{flex: 1, borderRight: "solid black 2px", padding: "20px"}}>
        <h2>Add a track</h2>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <div>
          {tracks.map(track => (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
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
          <div>
            <h3 style={{marginBottom: 0}}>{track.name} - {track.album}</h3>
            <span>{track.artist}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
