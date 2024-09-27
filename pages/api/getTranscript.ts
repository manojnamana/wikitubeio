import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Invalid or missing videoId" });
  }

  try {
    console.log(`Fetching transcript for video ID: ${videoId}`);
    const transcript: TranscriptResponse[] = await YoutubeTranscript.fetchTranscript(videoId);
    res.status(200).json({ transcript });
  } catch (error:any) {
    console.error(`Error fetching transcript: ${error.message}`);
    res.status(500).json({ error: "Error fetching transcript" });
  }
}
