import { Alert, Box, Button, Grid, IconButton, InputLabel, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

type MyObject = {
    id: number;
    startTime: string;
    endTime: string;
    notes: string;
    speakerName: string;
};

const TranscriptEditor = () =>{

   
    const [startTime,setStartTime] = useState("");
    const [endtTime,setEndTime] = useState("");
    const [notes,setNotes] = useState("");
    const [speakerName,setSpeakerName] = useState("");
    const [segmentList,setSegmenList] = useState <MyObject[]>([{ "id":1,
        "startTime":startTime,
        "endTime":endtTime,
        "notes":notes,
        "speakerName":speakerName}]);
    const [dialogopen, setDialogopen] = useState(false);
    const [alerting, setAlerting] = useState(false);
    const [count,setCount] = useState(2);
    const [open, setOpen] = useState(false);


    let contentOdject = {
        "id":count,
        "startTime":startTime,
        "endTime":endtTime,
        "notes":endtTime,
        "speakerName":speakerName
    }
    const addSegment = ()=>{
        setCount(count+1)
      segmentList.push(contentOdject)
    }
    const handleClickDialogOpen = () => {
        setDialogopen(true);
    };
    const handleDialogClose = () => {
        setDialogopen(false);
    };   
    const handleClick = () => {
      setOpen(true);
      setDialogopen(false);

      setTimeout(() => {
        window.location.reload();
    }, 2000);
     
    };
    const handleClose = (
    ) => {  
      setOpen(false);
    };
    const saveSegment = () =>{
        if (startTime==="" && endtTime===""&& speakerName==="" && notes===""){
            setOpen(false);
            setAlerting(false);        }
        else{
            setAlerting(true);
            setOpen(true);
        }
    }
  
    return(
        <Stack sx={{display:"flex",flexDirection:'column',alignItems:'center',}}>
        <Paper sx={{my:3,width:{md:"90%"}}} elevation={3}>
            <Box sx={{justifyContent:'end',display:"flex"}}>
            <IconButton onClick={handleClickDialogOpen}><CancelIcon color="error" style={{fontSize:35}}/></IconButton>
            </Box>
            <Typography fontSize={35}  fontFamily = {"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} fontWeight={"500"} textAlign={"center"} pb={2}>WYSIWYG Transcript Editor</Typography>
            {segmentList.map((i,index)=>(
                <Paper variant="outlined" key ={index} sx={{p:3,m:3}} >
                    <Typography fontWeight={"bold"} pb={2}>Segment {i.id}</Typography>
                    <Grid container>
                        <Grid xs={12} sm={5} >
                        <InputLabel id ="startTime">Start Time</InputLabel>
                            <TextField type="time" aria-label="Start Time" size="small" fullWidth placeholder="Start Time"  />
                        </Grid>
                        <Grid sm={2}>
                            
                        </Grid>
                        <Grid xs ={12}  sm={5} sx={{mt:{xs:2,sm:0}}} >
                            <InputLabel id ="EndTime">End Time</InputLabel>
                            <TextField type="time" aria-label="End Time"  size="small" fullWidth placeholder="End Time"/>
                        </Grid>
                    </Grid>
                    <TextField size="medium"  fullWidth sx={{mt:2,fontFamily:"monospace,monospace"}}   multiline rows={4} />
                    <TextField size="small"  fullWidth placeholder="Speaker Name" sx={{mt:2}} />
                    <Box sx={{justifyContent:'end',display:"flex",mt:2}}>
            <Button variant="outlined" sx={{mr:2,backgroundColor:"#F8F9FA",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#F8F9FA"}}}><ContentCopyIcon  style={{fontSize:20}}/></Button>
            <Button variant="outlined" sx={{backgroundColor:"#F8F9FA",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#F8F9FA"}}}><SaveIcon  style={{fontSize:20}}/></Button>
            </Box>
                     </Paper>
            ))}
            <Button variant="outlined"  sx={{my:2,ml:3,backgroundColor:"#F8F9FA",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#F8F9FA"}}} onClick={addSegment}>Add New Segment</Button>
            
        </Paper>

        <Dialog
        open={dialogopen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to close? Unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClick}>Yes</Button>
          <Button variant="contained" onClick={handleDialogClose} >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
 {alerting ?<Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Segment Saved.
  </Alert>:<Alert
    onClose={handleClose}
    severity="warning"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Editor closed without saving changes.
  </Alert>}
</Snackbar>
        </Stack>
    )
}


export default TranscriptEditor;