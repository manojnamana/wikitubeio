import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Alert, Button, FormControl, IconButton, Link, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, Typography } from '@mui/material';
import CarouselComponent from '../src/components/carousel';
// import SwipeableTextMobileStepper from './carousel';


export default function Directory() {

  const [lang, setLang] = React.useState("10");
  const [calculusvisb,setCalculusvisb] = React.useState(false)
  const [mo2,setNo2] = React.useState(false)
  const [mo3,setNo3] = React.useState(false)
  const [mo4,setNo4] = React.useState(false)
  const [mo5,setNo5] = React.useState(false)
  const [mo6,setNo6] = React.useState(false)
  const [correctAns,setCorrectAns] = React.useState(false);
const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };



  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value);
  };


  const coursel = () =>{
    setInterval(function() {
      alert("This runs every 2 seconds");
  }, 1000);
  }

  return (
    <>
  <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{  display:"flex" }} >
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{color:'black',paddingTop:2,fontSize:16,alignSelf:"center",display:"flex"}}
          >
            Language : 
            </Typography>
              <FormControl sx={{ mt:2, minHeight:20 ,ml:2}} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={lang}
        onChange={handleChange}
      >
        <MenuItem value={10}>En</MenuItem>
        <MenuItem value={20}>Ru</MenuItem>
        <MenuItem value={30}>Fr</MenuItem>
        <MenuItem value={40}>De</MenuItem>
        <MenuItem value={50}>Sw</MenuItem>
        <MenuItem value={60}>Es</MenuItem>
      </Select>
    </FormControl>    
        </Box>

      <Typography variant='h4' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{pt:5,pb:1}}>
        Calculus
      </Typography>
      <hr/>
      <Paper elevation={3}  sx={{mt:3,p:2}}>
      <Typography variant='h6' component="div" sx={{fontWeight:"bold",}}>
        Contents
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:2,}}>
      1. Etymology
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:2,}}>
      2. History
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:2,}}>
      3. Principles
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:4,}}>
      3.1 Limits and infinitesimals
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:4,}}>
      3.2  Differential calculus
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:4,}}>
      3.3 Integral calculus
      </Typography>
      <Typography variant='body1' component="div" sx={{pl:2,}}>
      4. Applications
      </Typography>
      </Paper>

      <Typography variant='body1' component="div" sx={{pt:2,}}>
      {!calculusvisb?<IconButton color='primary'size='small' onClick={()=>{setCalculusvisb(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setCalculusvisb(false)
      }} >[-]</IconButton>}
      <Link href="https://en.wikipedia.org/wiki/Calculus" underline="none">
  {'Calculus '}
</Link> 

{calculusvisb&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",md:"hidden"}}} >
    <Stack flexDirection={"row"} gap={2} maxWidth={160}>
      <Stack >
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography  textAlign={"center"} >Calculus: Video 1</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >Calculus: Video 2</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >Calculus: Video 3</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >Calculus: Video 4</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >Calculus: Video 5</Typography>
      </Stack>
      
    </Stack>
  </Paper> */} 
  {/* <Button href='/player' sx={{"&:hover":{backgroundColor:"transparent"}}}>
  <SwipeableTextMobileStepper/>
  </Button> */}
  <CarouselComponent/>
</Stack>}
 is the mathematical study of continuous change, in the same way that {!mo2?<IconButton color='primary'size='small' onClick={()=>{setNo2(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setNo2(false)
      }} >[-]</IconButton>}
 <Link href="#" underline="none">
  {'geometry'}
</Link> {mo2&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{display:'flex',flexDirection:'row',p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",}}} >
    

  </Paper> */}
<CarouselComponent/>
</Stack>}   is the study of shape and  {!mo3?<IconButton color='primary'size='small' onClick={()=>{setNo3(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setNo3(false)
      }} >[-]</IconButton>}
<Link href="#" underline="none">
  {'algebra'}
</Link> {mo3&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",md:"hidden"}}} >
    <Stack flexDirection={"row"} gap={2} maxWidth={160}>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >algebra: Video 1</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >algebra: Video 2</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >algebra: Video 3</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >algebra: Video 4</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >algebra: Video 5</Typography>
      </Stack>
    </Stack>
  </Paper> */}
  {/* <Button href='/player' sx={{"&:hover":{backgroundColor:"transparent"}}}>
  <SwipeableTextMobileStepper/>
  </Button> */}
  <CarouselComponent/>
</Stack>} is the study of generalizations of arithmetic operations.
      </Typography>
      <Typography variant='body1' component="div" sx={{pt:2,}}>
      It has two major branches, {!mo4?<IconButton color='primary'size='small' onClick={()=>{setNo4(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setNo4(false)
      }} >[-]</IconButton>} <Link href="#" underline="none">
  {'differential calculus'}
</Link>{mo4&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",md:"hidden"}}} >
    <Stack flexDirection={"row"} gap={2} maxWidth={160}>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >differential calculus: Video 1</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >differential calculus: Video 2</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >differential calculus: Video 3</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >differential calculus: Video 4</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >differential calculus: Video 5</Typography>
      </Stack>
    </Stack>
  </Paper> */}
  <CarouselComponent/>
</Stack>} and  {!mo5?<IconButton color='primary'size='small' onClick={()=>{setNo5(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setNo5(false)
      }} >[-]</IconButton>}
      <Link href="#" underline="none">
  {'integral calculus'}
</Link>{mo5&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",md:"hidden"}}} >
    <Stack flexDirection={"row"} gap={2} maxWidth={160}>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >integral calculus: Video 1</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >integral calculus: Video 2</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >integral calculus: Video 3</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >integral calculus: Video 4</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >integral calculus: Video 5</Typography>
      </Stack>
    </Stack>
  </Paper> */}
  <CarouselComponent/>
</Stack>}. The former concerns instantaneous rates of change, and the slopes of curves, while integral calculus concerns accumulation of quantities, and areas under or between curves. These two branches are related to each other by the 
{!mo6?<IconButton color='primary'size='small' onClick={()=>{setNo6(true)}} >[+]</IconButton>:<IconButton size='small' color='primary' onClick={()=>{
        setNo6(false)
      }} >[-]</IconButton>}<Link href="#" underline="none">
  {'fundamental theorem of calculus.'}
</Link>{mo6&&<Stack maxWidth={"100%"}>
  {/* <Paper elevation={3} sx={{p:3,my:2,overflowY:"hidden",overflowX:{xs:"scroll",md:"hidden"}}} >
    <Stack flexDirection={"row"} gap={2} maxWidth={160}>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >fundamental theorem of calculus: Video 1</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >fundamental theorem of calculus: Video 2</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >fundamental theorem of calculus: Video 3</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >fundamental theorem of calculus: Video 4</Typography>
      </Stack>
      <Stack>
      <Paper elevation={0} sx={{bgcolor:"grey",width:160,height:90,alignItems:"center",display:"flex",justifyContent:"center"}}>160 X 90</Paper>
      <Typography textAlign={"center"} >fundamental theorem of calculus: Video 5</Typography>
      </Stack>
    </Stack>
  </Paper> */}
  <CarouselComponent/>
</Stack>}
      </Typography>
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
      </Container>
    </React.Fragment>

    </>
  );
}
