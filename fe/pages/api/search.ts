import {getClient} from "../../api/spotify";
import {NextApiRequest} from "next";
import {Track, trackToTrack} from "../../api/types";

export default async function handler(req: NextApiRequest, res) {
  const search = req.query.q;
  if (!search) {
    res.status(200).json({ tracks: [] })
  }
  const client: any = await getClient();
  const tracks = await client.tracks.search(search);

  const transformed: Track[] = tracks.map(trackToTrack)
  res.status(200).json({ tracks: transformed })
}
