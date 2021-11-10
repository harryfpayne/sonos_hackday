import {NextApiRequest} from "next";
import {spotifyUriToTrack} from "../../api";

export default async function handler(req: NextApiRequest, res) {
  const uri = req.query.uri;
  if (!uri || Array.isArray(uri)) {
    res.status(200).json({ "OK": "OK" })
    return
  }
  await fetch(`http://localhost:8000/songs/add/`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({uri: spotifyUriToTrack(uri)})
  });
  res.status(200).json({ "OK": "OK" })
}
