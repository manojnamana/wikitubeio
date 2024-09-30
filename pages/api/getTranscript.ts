import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "youtube-transcript";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { videoId } = req.query;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Invalid or missing videoId" });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId as string);
    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: "No transcript found for this video" });
    }
    res.status(200).json({ transcript });
  } catch (error:any) {
    console.error('Error fetching transcript:', error);

    // Enhanced error handling
    if (error.response) {
      // Error returned by YouTube API (if it's used internally)
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // Request was made but no response was received
      res.status(500).json({ error: "No response received from YouTube" });
    } else {
      // Something else went wrong
      res.status(500).json({ error: "Error fetching transcript", details: error.message });
    }
  }
}
