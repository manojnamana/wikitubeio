// src/services/youtubeVideoService.ts

import axios from 'axios';

const API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchVideoDetails = async (videoId: string) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet,statistics',  // Include both snippet and statistics parts
      id: videoId,  // The videoId for the video you want to retrieve
      key: API_KEY,
    },
  });

  const videoData = response.data.items[0];

  return {
    title: videoData.snippet.title,
    description: videoData.snippet.description,
    channelName: videoData.snippet.channelTitle,
    publishedAt: videoData.snippet.publishedAt,
    viewCount: videoData.statistics.viewCount,
    likeCount: videoData.statistics.likeCount,
    commentCount: videoData.statistics.commentCount,
    thumbnail: videoData.snippet.thumbnails.default.url,
    tags: videoData.snippet.tags,
    embedUrl: `https://www.youtube.com/embed/${videoId}`
  };
};
