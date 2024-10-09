/* eslint-disable @next/next/no-img-element */
import { Button, colors, Fab, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Add, East, KeyboardDoubleArrowRight, MoreVert, PlayCircle, RampRight, Settings, West } from "@mui/icons-material";
import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";

import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import Box from '@mui/material/Box';
import Loading from "@/src/components/loading";
import { useRouter } from "next/router";

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


  const imagesWithText = [
    {
    name:'calculus',
    title:"Calculus",
    image:"/static/images/calculus.jpg"
  },
  {
    name:'geometry',
    title:"Geometry",
    image:"/static/images/geometry.jpg"
  },
  {
    name:'computation',
    title:"Computation",
    image:"/static/images/computation.jpg"
  },
  {
    name:'energy',
    title:"Energy",
    image:"/static/images/energy.jpg"
  },
  {
    name:'robotics',
    title:"Robotics",
    image:"/static/images/robotics.jpg"
  },
]


const Creater = () => {
    const navigate = useRouter()
    const [value, setValue] = React.useState('Computation');
    const [courseLis, setCourseLis] = React.useState<ArticleTypes[] | null>(null); 
    const [waiting ,setWaiting] = React.useState(true)
    const [show,setShow] = React.useState(false)


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
                    <Stack display={"flex"} flexDirection={"row"} gap={2}>
                    {show?<IconButton onClick={()=>setShow(false)}><KeyboardDoubleArrowRight/></IconButton>:<IconButton onClick={()=>setShow(true)}><KeyboardDoubleArrowRight/></IconButton>}
                    <Typography fontSize={25} fontWeight={"bold"} py={2}>C.R.E.A.T.E.R.</Typography>
                    </Stack>
                    
                    

                    <Stack display={"flex"} flexDirection={"row"} gap={2}>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="success">Go!</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="secondary">Repeat?</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="primary">𝕏</Button>
                    </Stack>
                </Stack>

                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} justifyContent={show?'space-between':'center'}>
                    {show&&<Stack>
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
                    </Stack>}

                    <Paper elevation={0} sx={{ p: 3, overflowY: "scroll", scrollbarWidth:0, maxHeight:400, overflowX: { xs: "scroll", md: "hidden" }, mr: { md: 0, xs: 0 }, '&::-webkit-scrollbar': {
          display: 'none', 
        }, '-ms-overflow-style':'none',mb:2}}  >
                        <Stack flexDirection={show?{  xs: "row",md:'column' }:{  xs: "column" }} display={"flex"} justifyContent={!show?{  xs: "start",md:'center' }:   "start" }  gap={2} maxWidth={{md:480,xs:200}}>
                            
                            {imagesWithText.map((item)=>(
                                
                                 <Stack key ={item.name}>
                                 <Paper elevation={0} sx={{ bgcolor: "white", width: {md:400,xs:200},  alignItems: "center", display: "flex", flexDirection:"column" , justifyContent: "center" }}>
                                     <img src={item.image} alt={item.name} width={'100%'} onClick={()=>(navigate.push(`/tube/2?name=${item.name}`))} />
                                     <Link underline="hover" target="_blank" fontSize={{xs:20,md:25}}  fontStyle={"italic"} href={`/wiki/${item.name}`}>{item.title}</Link>
                                 </Paper>
 
                             </Stack>
                            ))}

                           



                          

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
