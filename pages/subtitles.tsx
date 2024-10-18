import React, { useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [captions, setCaptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCaptions = async () => {
    setError(null);
    try {
      const response = await axios.get('/api/getCaptions', {
        params: { videoUrl }
      });
      setCaptions(response.data.captions);
    } catch (err) {
      setError('Error fetching captions. Please check the video URL.');
    }
  };

  return (
    <div>
      <h1>YouTube Captions Fetcher</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
      />
      <button onClick={fetchCaptions}>Get Captions</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {captions.map((caption:any, index) => (
          <li key={index}>{caption.start} - {caption.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
