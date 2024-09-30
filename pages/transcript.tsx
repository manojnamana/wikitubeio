import { useState } from 'react';
import axios from 'axios';

const GetTranscript = () => {
  const [videoId, setVideoId] = useState('Zp3Q57EJO4E');
  const [transcript, setTranscript] = useState<any>(null);

  const fetchTranscript = async () => {
    try {
      const response = await axios.get(`/api/hello?videoId=${videoId}`);
      setTranscript(response.data);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        placeholder="Enter YouTube video ID"
      />
      <button onClick={fetchTranscript}>Get Transcript</button>

      {transcript && (
        <div>
          <h3>Transcript Data:</h3>
          <pre>{JSON.stringify(transcript, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GetTranscript;
