// src/pages/api/youtube.ts

import { fetchYoutubeVideos } from '@/src/services/youtubeService';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const videos = await fetchYoutubeVideos(query as string);
    res.status(200).json(videos); // Return the video data, including videoId
  } catch (error) {
    res.status(500).json({ error: 'Error fetching videos' });
  }
}
