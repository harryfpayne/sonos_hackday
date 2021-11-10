import {NextApiRequest} from "next";
import {getClient} from "../../api/spotify";
import {trackToTrack} from "../../api/types";
import {spotifyTrackToUri} from "../../api";

export async function getSongs(): Promise<string[]> {
  const res = await fetch("http://localhost:8000/songs");
  const songs = await res.json();
  return songs.songs.filter(Boolean);
}

export default async function handler(req: NextApiRequest, res) {
  const client: any = await getClient();
  const ids = await getSongs();
  const tracks = await client.tracks.getMultiple(ids.map(spotifyTrackToUri));
  const transformed = tracks.map(trackToTrack);
  res.status(200).json({ tracks: transformed })
}
