/* eslint-disable react/no-unescaped-entities */

import { Alert, Avatar, Button, Grid, Link, List, ListItemText, Paper, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { VerticalAlignBottom } from "@mui/icons-material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}));



const Player = () =>{

const [lan, setLan] = React.useState("10");
const [tanlang, setTanLang] = React.useState("10");
const [correctAns,setCorrectAns] = React.useState(false);
const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: { target: { value: string } }) => {
    setLan(event.target.value);
  };
    return(
        <Stack px={"10%"}>

        <Grid container mt={5}>
            <Grid md={7}>
            <Stack >
                {/* <Stack sx={{bgcolor:"black",width:"100%",aspectRatio:"16/9",alignItems:"center",display:"flex",justifyContent:"center",color:"white",fontSize:"24px"}}>
                Video Placeholder
                </Stack> */}
                <Stack sx={{width:"100%",aspectRatio:"16/9",alignItems:"center",display:"flex",justifyContent:"center"}}>
                <iframe
            src={`https://www.youtube.com/embed/Zp3Q57EJO4E?si=PABW_0l9xe-BhI4a`}
            allow=""
            allowFullScreen
            frameBorder={0}
            title="YouTube video"
            width={"100%"}
            height={"100%"}
            
          />
                </Stack>
                <Typography sx={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontSize:18,fontWeight:"bold",pt:2}}>
                Calculus at a Fifth Grade Level
                </Typography>

               <Stack display={"flex"} direction={"row"} alignItems={"center"} gap={1} mt={1}>
                <Avatar
        src="/broken-image.jpg"
      >
      </Avatar>

      <Typography fontSize={15} fontWeight={700}> 3Blue 1Brown</Typography>
                
                
                </Stack> 
                <Paper sx={{my:2,}} >
                    <Typography p={2}>
                    Many people view calculus as the pinnacle of high school math. But actually, it's an introduction to some very simple and elegant ideas that use the math we already know. If we teach kids these ideas at a young age, it could completely change how people view math.
                    </Typography>
                </Paper >

                <Button  variant="outlined"  sx={{backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}}>Share</Button>
            </Stack>
            </Grid>
            <Grid md={0.5}>
            </Grid>
            <Grid md={4.5} mt={{xs:3,md:0}}>
                <Stack>
                <Stack display={"flex"} flexDirection={"row"}>
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
        <Select value={tanlang} onChange={(e)=>{setTanLang(e.target.value)}} input={<BootstrapInput />}>
        <MenuItem value={10}>En</MenuItem>
        <MenuItem value={20}>Ru</MenuItem>
        <MenuItem value={30}>Fr</MenuItem>
        <MenuItem value={40}>De</MenuItem>
        <MenuItem value={50}>Sw</MenuItem>
        <MenuItem value={60}>Es</MenuItem>
        </Select>
                </FormControl>
                </Stack>
                <Paper elevation={2} sx={{p:2,overflowY:"auto",height:"300px"}}  >
                    <List >
                        <ListItemText sx={{pb:2}} ><span style={{color:"#606060"}}>0:00</span> Today we're going to learn about <Tooltip title= "Calculus"><Link href="/directory" underline="none">{"calculus"}</Link></Tooltip>.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:15</span> Calculus is all about studying how things change.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:20</span> It's like <Tooltip title= "Algebra"><Link href="/directory" underline="none">{"algebra"}</Link></Tooltip>, but instead of using numbers, we use rates of change.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:45</span> One important concept in calculus is the <Tooltip title= "Derivative"><Link href="/directory" underline="none">{"derivative"}</Link></Tooltip>.</ListItemText>
                    </List>
                </Paper>
                <Button href="/transcripteditor" variant="outlined"  sx={{mt:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}}>Edit Transcript</Button>
                </Stack>
            </Grid>
            </Grid>
            <Paper elevation={3} sx={{mt:2,p:2,mb:2}}>
      <Typography variant='h5' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{py:1}}>
        Calculus
      </Typography>
      <hr/>
      <Typography variant='body1' component="div" sx={{py:2}}>
      <Tooltip  title="Calculus" >
        <Link  href="/directory" underline="none"  variant="body1">
        {"Calculus"}
        </Link>
        </Tooltip> is the mathematical study of continuous change, in the same way that <Tooltip  title="Geometry">
        <Link  href="/directory" underline="none"  variant="body1">
        {"geometry"}
        </Link>
        </Tooltip> is the study of shape, and <Tooltip  title="Algebra">
        <Link  href="/directory" underline="none"  variant="body1">
        {"algebra"}
        </Link>
        </Tooltip> is the study of generalizations of arithmetic operations.
      </Typography>
      <Typography variant='body1' component="div" sx={{pb:2}}>
      It has two major branches, <Tooltip  title="Differential_Calculus">
        <Link  href="/directory" underline="none"  variant="body1">
        {"differential calculus"}
        </Link>
        </Tooltip> and<Tooltip  title="Integral_Calculus">
        <Link  href="/directory" underline="none"  variant="body1">
        {"integral calculus"}
        </Link>
        </Tooltip>; differential calculus concerns instantaneous rates of change, and the slopes of curves, while integral calculus concerns accumulation of quantities, and areas under or between curves.      </Typography>
            </Paper>
            <Paper elevation={3} sx={{mt:2,p:2,mb:2}}>
      <Typography variant='h5' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{py:1}}>
        Calculus Quiz
      </Typography>
      <hr/>
      <Typography variant='body1' component="div" sx={{pt:2,pb:2}}>
      What is the main focus of calculus?
      </Typography>
      <Button variant='outlined' sx={{mr:2,mb:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}} onClick={()=>{setCorrectAns(true); setOpen(true);}}>Continuous Change</Button>
      <Button variant='outlined' sx={{mr:2,mb:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}} onClick={()=>{setCorrectAns(false); setOpen(true);}}>Static quantitie</Button>
      <Button variant='outlined' sx={{mr:2,mb:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}} onClick={()=>{setCorrectAns(false); setOpen(true);}}>Discrete numbers</Button>
      </Paper>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:"bottom",horizontal:"right"}}>
  {correctAns ?<Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
   Correct Answer
  </Alert>:<Alert
    onClose={handleClose}
    severity="error"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Wrong Answer!
  </Alert>}
</Snackbar>
        </Stack>
    )
}


export default Player;