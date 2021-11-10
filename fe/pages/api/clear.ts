import {NextApiRequest} from "next";
import {spotifyUriToTrack} from "../../api";

export default async function handler(req: NextApiRequest, res) {
  await fetch(`http://localhost:8000/songs/clear`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
  });
  setTimeout(() => {
    res.status(200).json({ "OK": "OK" })
  }, 500)
}
