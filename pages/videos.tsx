// src/pages/index.tsx

import { useState } from 'react';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`/api/youtube?query=${query}`);
      const data = await response.json();
      setVideos(data); // Set the videos array from the API response
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search YouTube videos"
      />
      <button onClick={handleSearch}>Search</button>

      {videos.length > 0 && (
        <ul>
          {videos.map((video) => (
            <li key={video.videoId}>
              <h3>{video.title}</h3>
              <p>Video ID: {video.videoId}</p> {/* Display the video ID */}
             
              <img src={video.thumbnail} alt={video.title} />
            <p>{video.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
