//@ts-nocheck

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSubtitles } from 'youtube-captions-scraper';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { videoUrl } = req.query;

    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid YouTube URL' });
    }

    // Extract the video ID from the YouTube URL
    const videoIdMatch = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (!videoIdMatch) {
      return res.status(400).json({ error: 'Invalid YouTube URL format' });
    }

    const videoId = videoIdMatch[1];

    // Use youtube-captions-scraper to fetch the captions
    const captions = await getSubtitles({
      videoID: videoId, // youtube video id
    });

    res.status(200).json({ captions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch captions' });
  }
}
