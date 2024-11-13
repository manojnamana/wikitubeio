// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Stack, FormControl, Select, MenuItem, Paper, Button, styled, Avatar, Grid, Typography, Link } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useRouter } from 'next/router';
import axios from 'axios';

// Custom styled InputBase for the dropdowns
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

interface VideoDetailsPageProps {
  id: any;
}

const VideoDetailsPage: React.FC<VideoDetailsPageProps> = ({ id }) => {
  const [videoDetails, setVideoDetails] = useState<any | null>(null);
  const [lan, setLan] = useState<string>('10');
  const [tanlang, setTanLang] = useState<string>('10');
  const [transcript, setTranscript] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [subtitlesData, setSubtitlesData] = useState([]);
  const [translated, setTranslated] = useState(false);

  // const url = `https://www.youtube.com/watch?v=${id}`;

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/video?videoId=${id}`);
        const data = await response.json();
        setVideoDetails(data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  useEffect(() => {
    const fetchTranscript = async () => {
       if (!id) return;

      try {
        const res = await axios.get(`https://wikitube-frontend.el.r.appspot.com/api/getTranscript?videoId=${id}`);
        const data = res.data;
        setTranscript(data?.transcript);
        setSubtitlesData(data?.transcript);  // Updated to match API response
      } catch (err: any) {
        console.error(`Error fetching transcript: ${err.message}`);
        setTranscript(null);
      }
    };

    fetchTranscript();
  }, [id]);

  const handleChanged = async (event) => {
    const selectedLang = event.target.value;
    setTanLang(selectedLang);

    try {
      const targetLanguageMap = {
        "10": "en",
        "20": "ru",
        "30": "fr",
        "40": "de",
        "50": "sw",
        "60": "es",
      };
      const targetLanguage = targetLanguageMap[selectedLang];

      // Combine subtitle text into larger chunks based on timestamps
      let combinedText = subtitlesData.map((item) => item.text).join(' ');

      // Send the combined text for translation
      const response = await axios.post("/api/translate", {
        text: combinedText,
        targetLanguage,
      });

      const translatedText = response.data.translatedText;

      // Split the translated text based on approximate positions in original subtitles
      const words = translatedText.split(' ');
      let translatedSubtitles = [];
      let wordIndex = 0;

      subtitlesData.forEach((subtitle) => {
        const subtitleWords = subtitle.text.split(' ').length;
        const translatedPart = words.slice(wordIndex, wordIndex + subtitleWords).join(' ');
        wordIndex += subtitleWords;

        translatedSubtitles.push({
          ...subtitle,
          translatedText: translatedPart,
        });
      });

      setSubtitlesData(translatedSubtitles);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setTranslated(true);
    }
  };

  const handleChange = (event: { target: { value: string } }) => {
    setLan(event.target.value);
  };

  const formatTime = (seconds) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Stack>
      {videoDetails && (
        <Grid container mt={5}>
          <Grid xs={12} md={7}>
            <Stack>
              <Stack sx={{ width: '100%', aspectRatio: '16/9', alignItems: 'center', justifyContent: 'center' }}>
                <iframe
                  src={videoDetails.embedUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  frameBorder={0}
                  width="100%"
                  height="100%"
                  title="YouTube video"
                />
              </Stack>

              <Typography sx={{ textOverflow: 'ellipsis', fontSize: 18, fontWeight: 'bold', pt: 2 }}>
                {videoDetails.title}
              </Typography>

              <Stack direction={'row'} alignItems={'center'} gap={1} mt={1}>
                <Avatar />
                <Typography fontSize={15} fontWeight={700}>
                  {videoDetails.channelName}
                </Typography>
              </Stack>

              <Paper sx={{ my: 2, overflowY: 'auto', maxHeight: '300px','&::-webkit-scrollbar': {
                            display: 'none',
                        }, '-ms-overflow-style': 'none', }}>
                <Typography p={2} sx={{ fontSize: 15 }}>{videoDetails.description}</Typography>
              </Paper>

              <Button variant="outlined" sx={{ color: '#202122', borderRadius: 0 ,backgroundColor: "#eaecf0ff",
                 
                  borderRadius: 0,
                  borderColor: "#a2a9b1",
                  "&:hover": { borderColor: "#a2a9b1", backgroundColor: "#eaecf0ff" },}}>
                Share
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={0.5}></Grid>
          <Grid item xs={12} md={4.5}>
            <Stack>
              <Stack direction={'row'}>
                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select value={lan} onChange={handleChange} input={<BootstrapInput />}>
                    <MenuItem value={10}>En</MenuItem>
                    <MenuItem value={20}>Ru</MenuItem>
                    <MenuItem value={30}>Fr</MenuItem>
                    <MenuItem value={40}>De</MenuItem>
                    <MenuItem value={50}>Sw</MenuItem>
                    <MenuItem value={60}>Es</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1 }} variant="standard">
                  <Select value={tanlang} onChange={handleChanged} input={<BootstrapInput />}>
                    <MenuItem value={10}>En</MenuItem>
                    <MenuItem value={20}>Ru</MenuItem>
                    <MenuItem value={30}>Fr</MenuItem>
                    <MenuItem value={40}>De</MenuItem>
                    <MenuItem value={50}>Sw</MenuItem>
                    <MenuItem value={60}>Es</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <Paper elevation={2} sx={{ p: 2, overflowY: 'auto', maxHeight: '300px','&::-webkit-scrollbar': {
                            display: 'none',
                        }, '-ms-overflow-style': 'none', }}>
                <Stack style={{ whiteSpace: "pre-wrap", }}>
                  {subtitlesData.map((entry, index) => (
                    <Stack flexDirection={"row"} key={index} style={{ marginBottom: "10px" }}>
                      <Link href="#" underline="none" aria-label={`Jump to ${formatTime(entry.offset)}`}>
                        {formatTime(entry.offset)}
                      </Link>
                      <Typography sx={{ pl: 1, }}>
                        {tanlang !== "10" && entry.translatedText ? entry.translatedText : entry.text}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>

              <Button
                href="/transcripteditor"
                variant="outlined"
                sx={{
                  mt: 2,
                  color: '#202122', borderRadius: 0 ,backgroundColor: "#eaecf0ff",
                 
                  borderRadius: 0,
                  borderColor: "#a2a9b1",
                  "&:hover": { borderColor: "#a2a9b1", backgroundColor: "#eaecf0ff" },
                }}
              >
                Edit Transcript
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default VideoDetailsPage;
