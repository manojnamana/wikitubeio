import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { videoUrl } = req.query;
    
    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid YouTube URL' });
    }

    // Extract video ID from the URL
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      return res.status(400).json({ error: 'Invalid YouTube URL format' });
    }

    const videoId = videoIdMatch[1];

    // Initialize YouTube API client
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY, // Use your API key from environment variables
    });

    // Fetch video captions (use 'snippet' or 'id' to get caption details)
    const response = await youtube.captions.list({
      part: ['snippet'],
      videoId,
    });

    // Extract captions and respond
    const captions = response.data.items;
    if (captions && captions.length > 0) {
      res.status(200).json({ captions });
    } else {
      res.status(404).json({ error: 'No captions found for this video' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch captions' });
  }
}
