// @ts-nocheck
import { Stack, FormControl, Select, MenuItem, Paper, Button, styled, Avatar, Grid, Typography } from '@mui/material';
import * as React from 'react';
import TranscriptPage from '../src/components/transcript';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { useRouter } from 'next/router';

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
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const VideoDetails = () => {
  const [lan, setLan] = React.useState<string>('10');
  const [tanlang, setTanLang] = React.useState<string>('10');
  const [videoData, setVideoData] = React.useState<any>(null); // Store video details
  const router = useRouter();
  const videoId = 'WsQQvHm4lSw'

  // Handle change for language select
  const handleChange = (event: { target: { value: string } }) => {
    setLan(event.target.value);
  };

  // Fetch video data when videoId changes
  React.useEffect(() => {
    if (videoId) {
      const fetchVideoInformation = async () => {
        try {
          const response = await axios.get(`/api/video?videoId=WsQQvHm4lSwd}`); // Fetch by videoId
          if (response.status === 200) {
            setVideoData(response.data); // Set fetched video data
          } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error fetching video:', error);
        }
      };
      fetchVideoInformation();
    }
  }, [videoId]);

  // Loading state before data is fetched
  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container mt={5}>
      <Grid item md={7}>
        <Stack>
          {/* Video Embed */}
          <Stack
            sx={{ width: '100%', aspectRatio: '16/9', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
          >
            <iframe
              src={videoData.embedUrl}
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
            {videoData.title}
          </Typography>

          <Stack display={'flex'} direction={'row'} alignItems={'center'} gap={1} mt={1}>
            <Avatar />
            <Typography fontSize={15} fontWeight={700}>
              {videoData.channelName}
            </Typography>
          </Stack>

          <Paper sx={{ my: 2 }}>
            <Typography p={2}>{videoData.description}</Typography>
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
      <Grid item md={4.5} mt={{ xs: 3, md: 0 }}>
        <Stack>
          {/* Language Selectors */}
          <Stack display={'flex'} flexDirection={'row'}>
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
            {/* <TranscriptPage /> */}
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
  );
};

export default VideoDetails;
