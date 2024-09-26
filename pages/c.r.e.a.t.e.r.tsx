import { Button, colors, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { East, PlayCircle, West } from "@mui/icons-material";
import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import Loading from "@/src/components/loading";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '200%', mr: 1 }}>
          <LinearProgress color="warning"  variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }

const Creater = () => {
    const [value, setValue] = React.useState('Computation');
    const [courseLis, setCourseLis] = React.useState<ArticleTypes[] | null>(null); 
    const [waiting ,setWaiting] = React.useState(true)


    React.useEffect(() => {
        const fetching = async () => {
            try {
                const response = await axios.get('https://wikitubeio-backend.vercel.app/api/courses/');
                let data = response.data;
                data = data.sort((a: { course_id: number }, b: { course_id: number }) => a.course_id - b.course_id);

                setCourseLis(data);
            } catch (error) {
                console.log(error);
            }finally{
                setWaiting(false)
            }
        };
        fetching();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    if(waiting) return <Loading/>
    if (!courseLis) return null;

    return (
        <Stack sx={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ my: 3, width: { md: "70%" }, p: 3 }}>
                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography fontSize={25} fontWeight={"bold"} py={2}>C.R.E.A.T.E.R.</Typography>

                    <Stack display={"flex"} flexDirection={"row"} gap={2}>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="success">Go!</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="secondary">Repeat?</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="primary">𝕏</Button>
                    </Stack>
                </Stack>

                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} justifyContent={"space-between"}>
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
                                            value={course.course_name as unknown as string} // Ensuring it's a string
                                            control={<Radio />}
                                            label={course.course_name as unknown as string} // Ensure label is a string
                                        />

                                        <Box sx={{ width: { xs: "100%", md: "200%" } }}>
                                            <LinearProgressWithLabel  sx={{ borderRadius: 50,p:1}} value={1} />
                                            </Box>
                                        {/* <Stack flexDirection={"row"}>
                                            <Paper sx={{ bgcolor: "blueviolet", width: { xs: "100%", md: "200%" }, color: "white", borderRadius: 50, textAlign: "center" }}></Paper>
                                            100%
                                        </Stack> */}
                                    </React.Fragment>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Stack>

                    <Paper elevation={0} sx={{ p: 3, overflowY: "hidden", overflowX: { xs: "scroll", md: "hidden" }, mr: { md: "35%", xs: 0 } }} >
                        <Stack flexDirection={{ xs: "row", md: "column" }} gap={2} maxWidth={160}>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>

                        </Stack>
                    </Paper>
                </Stack>

                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={3} justifyContent={"space-between"}>
                    <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={{ md: 5 }} justifyContent={"space-between"}>
                        <Button variant="text" sx={{ color: "black" }}>+ Add to Database</Button>
                        <Button variant="contained" color="success"><West sx={{ mr: 1 }} />Select</Button>
                    </Stack>

                    <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={{ md: 5 }} justifyContent={"space-between"}>
                        <Button variant="contained" color="error"><East sx={{ mr: 1 }} />Delete</Button>
                        <Button variant="text" sx={{ color: "black" }}> 🗑️ Remove from Results</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Creater;
