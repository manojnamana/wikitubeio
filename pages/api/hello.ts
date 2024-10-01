import { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import { getSubtitles } from 'youtube-captions-scraper';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allows any origin
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS method for preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { videoId } = req.query;

  if (!videoId || typeof videoId !== "string") {
    return res.status(400).json({ error: "Invalid or missing videoId" });
  }

  try {
    const captions = await getSubtitles({
      videoID: videoId, // YouTube video id
      lang: 'en'     // default language is 'en'
    });
    
    console.log(getSubtitles)
    // console.log(captions);
    res.status(200).json({ captions });
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    res.status(500).json({ error: "Error fetching transcript" });
  }
}
