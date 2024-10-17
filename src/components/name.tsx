// src/pages/videoDetails.tsx
import React, { useEffect, useState } from 'react';
import { Stack, FormControl, Select, MenuItem, Paper, Button, styled, Avatar, Grid, Typography } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { useRouter } from 'next/router';
import TranscriptPage from '../components/transcript';

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



const VideoDetailsPage: React.FC = () => {
  const [videoDetails, setVideoDetails] = useState<any | null>(null);
  const [lan, setLan] = useState<string>('10');
  const [tanlang, setTanLang] = useState<string>('10');

  // const id ='Kss13U-hvPk';

  
  const router = useRouter();
  const { id } = router.query;

  // // If the URL parameter contains encoded characters, decode it
  // const decodedName = decodeURIComponent(name as string);

  // // Remove the extra characters, if needed, such as spaces or special characters

  // const id = decodedName.trim().split('&')[0];

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (!id) return;

      try {
        const response = await fetch(`/api/video?videoId=WsQQvHm4lSw`);
        const data = await response.json();
        setVideoDetails(data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    fetchVideoDetails();
  }, [id]);

  const handleChange = (event: { target: { value: string } }) => {
    setLan(event.target.value);
  };

  return (
    <div>
      {videoDetails && (
        <Grid container mt={5}>
          <Grid item md={7}>
            <Stack>
              {/* Video Embed */}
              <Stack
                sx={{ width: '100%', aspectRatio: '16/9', alignItems: 'center', justifyContent: 'center' }}
              >
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


              {/* Video Details */}
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  fontSize: 18,
                  fontWeight: 'bold',
                  pt: 2,
                }}
              >
                {videoDetails.title}
              </Typography>

              <Stack display={'flex'} direction={'row'} alignItems={'center'} gap={1} mt={1}>
                <Avatar />
                <Typography fontSize={15} fontWeight={700}>
                  {videoDetails.channelName}
                </Typography>
              </Stack>

              <Paper sx={{ my: 2 }}>
                <Typography p={2}>{videoDetails.description}</Typography>
              </Paper>

              <Button
                variant="outlined"
                sx={{
                  backgroundColor: '#eaecf0ff',
                  color: '#202122',
                  borderRadius: 0,
                  borderColor: '#a2a9b1',
                  '&:hover': { borderColor: '#a2a9b1', backgroundColor: '#eaecf0ff' },
                }}
              >
                Share
              </Button>
            </Stack>
          </Grid>

          {/* Right Sidebar */}
          <Grid item md={0.5}></Grid>
          <Grid item md={4.5}>
            <Stack>
              {/* Language Selectors */}
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
                  <Select value={tanlang} onChange={(e) => setTanLang(e.target.value)} input={<BootstrapInput />}>
                    <MenuItem value={10}>En</MenuItem>
                    <MenuItem value={20}>Ru</MenuItem>
                    <MenuItem value={30}>Fr</MenuItem>
                    <MenuItem value={40}>De</MenuItem>
                    <MenuItem value={50}>Sw</MenuItem>
                    <MenuItem value={60}>Es</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Transcript Page */}
              <Paper elevation={2} sx={{ p: 2, overflowY: 'auto', height: '300px' }}>
                <TranscriptPage />
              </Paper>

              <Button
                href="/transcripteditor"
                variant="outlined"
                sx={{
                  mt: 2,
                  backgroundColor: '#eaecf0ff',
                  color: '#202122',
                  borderRadius: 0,
                  borderColor: '#a2a9b1',
                  '&:hover': { borderColor: '#a2a9b1', backgroundColor: '#eaecf0ff' },
                }}
              >
                Edit Transcript
              </Button>
            </Stack>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default VideoDetailsPage;
