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

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!videoLink) return;

      const videoId = videoLink.split("v=")[1]?.split("&")[0];

      if (!videoId) {
        setError("Invalid YouTube link.");
        return;
      }

      setError(null);

      try {
        console.log(`Fetching transcript for video ID: ${videoId}`);
        const res = await fetch(`https://wikitubeio.vercel.app/api/hello?videoId=${videoId}`);
        const data = await res.json();

        if (data.transcript) {
          setTranscript(data.transcript);
        } else {
          setTranscript(null);
          setError("No transcript available for this video.");
        }
      } catch (err:any) {
        console.error(`Error fetching transcript: ${err.message}`);
        setTranscript(null);
        setError("Error fetching transcript.");
      }
    };

    fetchTranscript();
  }, [videoLink]);

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
      {error && <Typography color="error">{error}</Typography>}

      {transcript && (
        <Stack style={{ whiteSpace: "pre-wrap" }}>
          {transcript.map((entry, index) => (
            <Stack flexDirection={"row"} key={index} style={{ marginBottom: "10px" }}>
              <Link href="#" underline="none">{formatTime(entry.offset)}</Link>
              <Typography sx={{ pl: 1 }}>{entry.text}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default TranscriptPage;
