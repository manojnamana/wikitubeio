// @ts-nocheck

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Paper, Stack, Typography, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, Box, LinearProgress, Link, Snackbar, Alert } from '@mui/material';
import { KeyboardDoubleArrowRight, West, East } from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from "next/router";
import { ArticleTypes } from '@/types/articleTypes';
import Loading from '@/src/components/loading';
import Cookies from 'js-cookie';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress color="warning" variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
}

const Creater = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('Engineering');
    const [courseLis, setCourseLis] = useState<ArticleTypes[] | null>(null);
    const [videos, setVideos] = useState<{ id: string, title: string, thumbnail: string }[]>([]);
    const [waiting, setWaiting] = useState(true);
    const [show, setShow] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [watchedVideoIds, setWatchedVideoIds] = useState<string[]>([]);
    const [userId,setUserId]= useState('')
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [openSnackbar2, setOpenSnackbar2] = useState(false);
    const [snackbarMessage2, setSnackbarMessage2] = React.useState('');

    const bearer_token = (Cookies.get('access_token'))

    useEffect(()=>{

        const gettinUserId = async()=>{

               try{
           const getID = await axios.get('https://wikitube-new.vercel.app/api/get-user-id/',{
             headers: {
                     Authorization: `Bearer ${bearer_token}`
                 }
            })
            if (getID.status===200){
            setUserId(getID.data.user_id )
           
            // console.log(getID.data.user_id)
           }
    
        }
        catch(err){
            console.error('error')
            
        }

        }

        gettinUserId()

    },[])

    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://wikitube-new.vercel.app/api/courses/');
                const sortedData = response.data.sort((a, b) => a.course_id - b.course_id);
                setCourseLis(sortedData);
            } catch (error) {
                console.error(error);
            } finally {
                setWaiting(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchVideos = async () => {
            const selectedCourse = courseLis?.find(course => course.course_name === value);
            if (!selectedCourse) return;

            const videoPromises = selectedCourse.articles.split(';').map(async (article) => {
                try {
                    const response = await axios.get(`/api/youtube?query=${article}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching video data:', error);
                }
            });

            const videoData = await Promise.all(videoPromises);

            
            const flattenedVideos = videoData.flat().map(data => ({
                id: data.videoId,
                title: data.title,
                thumbnail: data.thumbnail,
                
            }));
            setVideos(flattenedVideos);
        };
        fetchVideos();
    }, [value, courseLis]);

    


    const handleChange = (event) => {
        setValue(event.target.value);
    };


    // Function to handle selecting a video
const handleSelectVideo = (videoId: string) => {
    setSelectedVideo(videoId);
};


// Function to handle adding the selected video to watched list
// Function to handle adding the selected video to watched list
const handleAddToWatched = async () => {
    if (!selectedVideo || watchedVideoIds.includes(selectedVideo)) return;

    try {
        const updatedWatchedVideos = [...watchedVideoIds, selectedVideo];


        const response = await axios.put(`https://wikitube-new.vercel.app/api/user-performance/1/`, {
            user: userId, // Replace with dynamic user ID
            course: 5, // Replace with dynamic course ID
            watched_video_ids_readonly: updatedWatchedVideos,
            progress:100 
        });

        setWatchedVideoIds(updatedWatchedVideos); // Update local state
        console.log(response.data)
        setOpenSnackbar(true)
        setSnackbarMessage('Video added to Database');
    } catch (error) {
        setOpenSnackbar(true)
        setSnackbarMessage('Error adding video to database');
        console.error("Error adding video to database:", error);
    }
};

// Function to handle deleting the selected video from watched list
// Function to handle deleting the selected video from watched list
const handleDeleteFromWatched = async () => {
    

    try {
        const response = await axios.post(`https://wikitube-new.vercel.app/api/user-performance/1/delete-watched-ids/`, {
            watched_video_ids: [selectedVideo],
        });

        if (response.status === 200) {
            // Update the `watchedVideoIds` state
            const updatedWatchedVideos = watchedVideoIds.filter(id => id !== selectedVideo);
            setWatchedVideoIds(updatedWatchedVideos);

            // Update the `videos` state to remove the deleted video
            const updatedVideos = videos.filter(video => video.id !== selectedVideo);
            setVideos(updatedVideos);

            console.log(response.data); // Log the response data
            setOpenSnackbar2(true)
            setSnackbarMessage2('Video removed from Database');
        }
    } catch (error) {
        console.error("Error deleting video from database:", error);
        setOpenSnackbar2(true)
            setSnackbarMessage2('Error deleting video from database');
    }
};

const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbar2(false);
  };

    if (waiting) return <Loading />;
    if (!courseLis) return null;

    return (
        <Stack sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ my: 3, width: { md: "70%" }, p: 3 }}>
                <Stack display="flex" flexDirection={{ md: "row", xs: 'column' }} alignItems="center" justifyContent="space-between">
                    <Stack display="flex" flexDirection="row" gap={2}>
                        <IconButton onClick={() => setShow(!show)}><KeyboardDoubleArrowRight /></IconButton>
                        <Typography fontSize={25} fontWeight="bold">C.R.E.A.T.E.R.</Typography>
                    </Stack>

                    <Stack display="flex" flexDirection="row" gap={2}>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="success">Go!</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="secondary">Repeat?</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="primary">𝕏</Button>
                    </Stack>
                </Stack>

                <Stack display="flex" flexDirection={{ md: "row", xs: 'column' }} marginTop={2} justifyContent={show ? 'space-between' : 'center'}>
                    {show && (
                        <Stack>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    onChange={handleChange}
                                >
                                    {courseLis.map((course, index) => (
                                        <React.Fragment key={index}>
                                            <FormControlLabel
                                                value={course.course_name}
                                                control={<Radio />}
                                                label={course.course_name}
                                            />
                                            <Box sx={{ width: { xs: "100%", md: "200%" } }}>
                                                <LinearProgressWithLabel sx={{ borderRadius: 50, p: 1 }} value={1} />
                                            </Box>
                                        </React.Fragment>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    )}

                    <Paper elevation={2} sx={{
                        p: 3, overflowY: "scroll", maxHeight: 400, mr: { md: 0, xs: 0 }, mb: 2,
                        '&::-webkit-scrollbar': { display: 'none' }, '-ms-overflow-style': 'none'
                    }}>
                        <Stack flexDirection={show ? { xs: "row", md: 'column' } : { xs: "column" }} gap={2} maxWidth={{ md: 480, xs: 200 }}>
                        {videos.map((item) => (
    <Paper 
        key={item.id} 
        onClick={() => (setSelectedVideo(item.id),console.log(item.id))} // Set selected video on click
        elevation={1}
        sx={{
            bgcolor: "whitesmoke",
            width: { md: 400, xs: 200 },
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 2,
            border: selectedVideo === item.id ? '2px solid blue' : 'none', // Apply border conditionally
            cursor: 'pointer'
        }}
    >
        <img src={item.thumbnail} style={{ borderRadius: 10 }} alt={item.title} width={'100%'} />
        <Link underline="hover" fontSize={{ xs: 15, md: 20 }} marginTop={2} textAlign={{md:'center'}} fontStyle={"italic"} href='#'>
            {item.title}
        </Link>
    </Paper>
))}

                        </Stack>
                    </Paper>
                </Stack>

                <Stack display="flex" flexDirection={{ md: "row", xs: 'column' }} gap={3} justifyContent="space-between">
                    <Stack display="flex" flexDirection={{ md: "row", xs: 'column' }} gap={2}>
                        <Button variant="text" sx={{ color: "black" }}>+ Add to Database</Button>
                        <Button variant="contained" color="success" onClick={handleAddToWatched}><West sx={{ mr: 1 }} />Select</Button>
                    </Stack>

                    <Stack display="flex" flexDirection={{ md: "row", xs: 'column' }} gap={2}>
                        <Button variant="contained" color="error" onClick={handleDeleteFromWatched} ><East sx={{ mr: 1 }} />Delete</Button>
                        <Button variant="text" sx={{ color: "black" }}> 🗑️ Remove from Results</Button>
                    </Stack>
                </Stack>
            </Paper>

            <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Video added to Database' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar2}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage2 === 'Video removed from Database' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage2}
        </Alert>
      </Snackbar>
        </Stack>
    );
};

export default Creater;
