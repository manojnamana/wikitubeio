// src/services/youtubeService.ts

import axios from 'axios';

const API_KEY = process.env.YOUTUBE_API_KEY;

export const fetchYoutubeVideos = async (query: string) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 3,
      key: API_KEY,
    },
  });



  // Map the response to return video IDs along with other info
  return response.data.items.map((item: any) => ({
    videoId: item.id.videoId,  // Video ID
    title: item.snippet.title,  // Video Title
    description: item.snippet.description,  // Video Description
    thumbnail: item.snippet.thumbnails.default.url,  // Thumbnail URL
    channelName: item.snippet.channelTitle,  // Channel Name
    embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`  // Embed URL
  }));
};
