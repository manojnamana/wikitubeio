import { useState } from 'react';
import axios from 'axios';
import { Stack, Typography ,Link} from '@mui/material';


interface TranscriptLine {
  text: string;
  duration: number; // duration in seconds
  offset: number; // offset (start time) in seconds
  lang: string;
}

const GetTranscript = () => {
  const [videoId, setVideoId] = useState('');
  const [transcript, setTranscript] = useState<TranscriptLine[] | null>(null);



  const fetchTranscript = async () => {
    try {
      const response = await axios.get(`https://wikitube-frontend.el.r.appspot.com/api/getTranscript?videoId=${videoId}`);
      setTranscript(response.data.transcript);
      
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
  };

  // Helper function to format the timestamp (e.g., 00:01:23)
  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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

   
      <Stack style={{ whiteSpace: "pre-wrap" }}>
          {transcript?.map((entry, index) => (
            <Stack
              flexDirection={"row"}
              key={index}
              style={{ marginBottom: "10px" }}
            >
              <Link
                href="#"
                underline="none"
                aria-label={`Jump to ${formatTimestamp(entry.offset)}`}
              >
                {formatTimestamp(entry.offset)}
              </Link>
              <Typography sx={{ pl: 1 }}>{entry.text}</Typography>
            </Stack>
          ))}
        </Stack>
    </div>
  );
};

export default GetTranscript;
