import { Alert, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";


export default function CourseMaker () {

    const [courseName ,setCourseName]= useState('')
    const [article ,setArticle]= useState('')
    const [articleCount ,setArticleCount]= useState(0)
    const [articlesList, setArticlesList] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [alertSwitch,setAlertSwitch] = useState(false);


  const handleClose = () => {
    
    setOpen(false);
  };

    const OnAddArticle =()=>{
        if (article !== "" && courseName!== "" && article!==" "){
           setArticle("")
           articlesList.push(article.trim())
           console.log(articlesList)
               setArticleCount(articleCount+1)
            }
        else if (courseName === "")  {
            setOpen(true);

        }        
        }


    
    return(

        <Stack sx={{display:"flex",flexDirection:'column',alignItems:'center',}}>
    <Paper elevation={2} sx={{my:3,p:2,width:{md:"45%"}}}>
        <Typography fontSize={25} fontWeight={"bold"}  textAlign={"center"} py={2} >
        Wikitube Course-Maker
        </Typography>
        <Typography fontSize={15} pb={1}>
        Course Name:
        </Typography>
        <TextField placeholder="Enter course name" value={courseName}  onChange={(e)=>setCourseName(e.target.value)}fullWidth rows={1}  sx={{mb:2}} />
        <Typography fontSize={15} pb={1}>
        Add Wikipedia Article:
        </Typography>
        <TextField placeholder="Enter wikipedia article name" value={article}  onChange={(e)=>setArticle(e.target.value)} fullWidth rows={1}  sx={{mb:2}} />
       { articleCount===12 ?<Button variant="contained" color="success" disabled  >
        Add Article
        </Button> :<Button variant="contained" color="success" onClick={OnAddArticle} >
        Add Article
        </Button>}

        <Typography fontSize={25} fontWeight={"bold"}  py={2} >
        Course Articles ({articleCount}/12):
        </Typography>

        {articlesList.map((i,index)=>(
            <Stack key = {index} mb={2}>
            <Paper  sx={{bgcolor:"#f1f1f1",display:"flex",justifyContent:"space-between",p:2,alignItems:'center',}}>
                <Typography>{i}</Typography>
                <Button variant="contained" color="error" onClick={() =>{
                    setArticleCount(articleCount-1)
                    setArticlesList([
                        ...articlesList.slice(0, index),
                        ...articlesList.slice(index + 1),
                      ]);
                }}>Remove</Button>
            </Paper>
        </Stack>
        ))}
        
        <Button variant="contained" color="success" onClick={()=>{setAlertSwitch(true)
            setOpen(true);if (articleCount ===0){
              setOpen(false);
            }else{
              setOpen(true);
            }
        }} >
        Save Course
        </Button>
    </Paper>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:"bottom", horizontal:"right" }}>
  {alertSwitch ?<Alert
    onClose={handleClose}
    severity="success"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Course {courseName} saved with {articleCount} articles!
  </Alert>:<Alert
    onClose={handleClose}
    severity="error"
    variant="filled"
    sx={{ width: '100%' }}
  >
    Enter Course Name
  </Alert>}
</Snackbar>
    </Stack>
    )
}


