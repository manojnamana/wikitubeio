// @ts-nocheck

import { ArticleTypes } from "@/types/articleTypes";
import { Link, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";

type Transcript = {
  text: string;
  start?: number; // Marking offset as optional
  duration?: number;
}[];

interface ArticleType {
  url: string;
}

const TranscriptPage: React.FC<ArticleType> = ({ url }) => {
  const [transcript, setTranscript] = useState<ArticleTypes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subtitlesData, setSubtitlesData] = useState([])


  

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!url) return;

      try {
        console.log(url)
        const res = await axios.get(
          `https://wikitube-439304.el.r.appspot.com/api/transcript/?url=${url}`
        );
        const data = res.data;
        setTranscript(data?.transcript)

        const subtitleData = data?.transcript
        const subtitles = JSON.parse(subtitleData);
        setSubtitlesData(subtitles)
                
        
      } catch (err: any) {
        console.error(`Error fetching transcript: ${err.message}`);
        setTranscript(null);
       
      }
    };

    fetchTranscript();
  }, [url]);



       


  

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
        <Stack style={{ whiteSpace: "pre-wrap" }}>
          {subtitlesData.map((entry, index) => (
            <Stack
              flexDirection={"row"}
              key={index}
              style={{ marginBottom: "10px" }}
            >
              <Link
                href="#"
                underline="none"
                aria-label={`Jump to ${formatTime(entry.start)}`}
              >
                {formatTime(entry.start)}
              </Link>
              <Typography sx={{ pl: 1 }}>{entry.text}</Typography>
            </Stack>
          ))}
        </Stack>
    
    </>
  );
};

export default TranscriptPage;
