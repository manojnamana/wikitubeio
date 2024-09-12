import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript, TranscriptResponse } from "youtube-transcript"; // Use the type from the library

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { videoId } = req.query;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Invalid or missing videoId" });
  }

  try {
    const transcript: TranscriptResponse[] = await YoutubeTranscript.fetchTranscript(videoId);
    res.status(200).json({ transcript });
    // console.log(transcript)
  } catch (error) {
    res.status(500).json({ error: "Error fetching transcript" });
  }
}
