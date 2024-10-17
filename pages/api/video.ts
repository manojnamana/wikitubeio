// src/pages/api/video.ts

import { fetchVideoDetails } from '@/src/services/IdBasedServices';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const videoDetails = await fetchVideoDetails(videoId as string);
    res.status(200).json(videoDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching video details' });
  }
}
