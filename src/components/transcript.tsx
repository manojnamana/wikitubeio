import { Link, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";

type Transcript = {
  text: string;
  offset?: number; // Marking offset as optional
  duration?: number;
}[];

const TranscriptPage: React.FC = () => {
  const [videoLink, setVideoLink] = useState<string>("https://www.youtube.com/watch?v=Zp3Q57EJO4E&list=PLA3TZC6wAne_I_gH34YsZ2xSm9SBER27j&index=2"); // Pre-fill with a default link if needed
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Automatically fetch transcript when videoLink changes
  useEffect(() => {
    const fetchTranscript = async () => {
      // Only fetch if videoLink is not empty
      if (!videoLink) return;

      // Extract the video ID from the YouTube URL
      const videoId = videoLink.split("v=")[1]?.split("&")[0];
     

      if (!videoId) {
        setError("Invalid YouTube link.");
        return;
      }

      setError(null);

      try {
        const res = await fetch(`http://localhost:3000/api/hello?videoId=${videoId}`);
        const data = await res.json();

        if (data.transcript) {
          setTranscript(data.transcript);
        } else {
          setTranscript(null);
          setError("No transcript available for this video.");
        }
      } catch (err) {
        setTranscript(null);
        setError("Error fetching transcript.");
      }
    };

    fetchTranscript(); // Fetch transcript when videoLink changes
  }, [videoLink]); // Add videoLink as dependency so it runs on change

  // Fallback to 0:00 if offset is missing or invalid
  const formatTime = (seconds: number | undefined) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

      {/* Display transcript */}
      {transcript && (
        <Stack style={{ whiteSpace: "pre-wrap" }}>
          {transcript.map((entry, index) => (
            <Stack flexDirection={"row"} key={index} style={{ marginBottom: "10px" }}>
              <Link href="#" underline="none" >{formatTime(entry.offset)}</Link>
              <Typography sx={{pl:1}}> {entry.text}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default TranscriptPage;
