/* eslint-disable react/no-unescaped-entities */

import { Alert, Avatar, Button, Grid, Link, List, ListItemText, Paper, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { VerticalAlignBottom } from "@mui/icons-material";
import TranscriptPage from "./transcript";
import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";
import Loading from "./loading";
import { useRouter } from "next/router";


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
const [articleData, setArticleData] = React.useState<ArticleTypes | null>(null);
const [waiting, setWaiting] = React.useState(true);
const {article_name} = useRouter().query
const article = (useRouter().query.name)?.toString()
React.useEffect(()=>{
  const fetchArticle = async () => {
  
    try {
      const response = await axios.get(`https://wikitubeio-backend.vercel.app/api/articles/${article?.toLowerCase()}/`);
      // console.log(response.data)
      if (response.status === 200) {
        setArticleData(response.data);
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setWaiting(false);
    }
  };

  fetchArticle();
},[article])

if(!articleData) return null


const quizz = articleData.quizzes

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: { target: { value: string } }) => {
    setLan(event.target.value);
  };



  const linkWords: Record<string, string> = articleData.hyperlinks.reduce((acc: Record<string, string>, link) => {
    acc[link.hyper_link_word] = link.hyper_link_word_url;
    return acc;
  }, {} as Record<string, string>);

  // Function to create button and link for a word
  const createLinkWithButton = (word: string,url:string) => (
    <span  key={word + Math.random()}>
      <Tooltip title={word}>
      <Link href={`/wiki/${word.toLowerCase()}`} underline="none">
   {word}
 </Link>
 </Tooltip>
    </span>
    
  );

  // Function to render description with links
  const renderDescription = (text: string) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      const cleanWord = word.replace(/[\.\,]/g, ''); // Remove punctuation for accurate matching
      if (linkWords[cleanWord]) {
        return (
          <React.Fragment key={index}>
            {createLinkWithButton(cleanWord, linkWords[cleanWord])}{' '}
          </React.Fragment>
        );
      }
      return word + ' ';
    });
  };
  const splittingDescription = articleData.description.split('\r\n');


    return(
      <>
        {waiting ?(<Loading/>):(<Stack px={"10%"}>

        <Grid container mt={5}>
            <Grid md={7}>
            <Stack >
                <Stack sx={{width:"100%",aspectRatio:"16/9",alignItems:"center",display:"flex",justifyContent:"center"}}>
                <iframe
            src={`${articleData.article_video_url}`}
            allow=""
            allowFullScreen
            frameBorder={0}
            title="YouTube video"
            width={"100%"}
            height={"100%"}
            
          />
                </Stack>

                {articleData.videos.map((vid)=>(
                   <React.Fragment key={vid.video_played_id}>
                    <Typography sx={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",fontSize:18,fontWeight:"bold",pt:2}}>
                {vid.video_title}
                </Typography>
                <Stack display={"flex"} direction={"row"} alignItems={"center"} gap={1} mt={1}>
                <Avatar>
                </Avatar>
                <Typography fontSize={15} fontWeight={700}> {vid.channel_name}</Typography>
                </Stack> 
                <Paper sx={{my:2,}} >
                    <Typography p={2}>
                      {vid.video_description}
                    </Typography>
                </Paper >
                   </React.Fragment>
                ))}
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
                    {/* <List >
                        <ListItemText sx={{pb:2}} ><span style={{color:"#606060"}}>0:00</span> Today we're going to learn about <Tooltip title= "Calculus"><Link href="/directory" underline="none">{"calculus"}</Link></Tooltip>.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:15</span> Calculus is all about studying how things change.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:20</span> It's like <Tooltip title= "Algebra"><Link href="/directory" underline="none">{"algebra"}</Link></Tooltip>, but instead of using numbers, we use rates of change.</ListItemText>
                        <ListItemText sx={{pb:2}}><span style={{color:"#606060"}}>0:45</span> One important concept in calculus is the <Tooltip title= "Derivative"><Link href="/directory" underline="none">{"derivative"}</Link></Tooltip>.</ListItemText>
                    </List> */}
                    <TranscriptPage/>
                </Paper>
                <Button href="/transcripteditor" variant="outlined"  sx={{mt:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"}}}>Edit Transcript</Button>
                </Stack>
            </Grid>
            </Grid>
            <Paper elevation={3} sx={{mt:2,p:2,mb:2}}>
      <Typography variant='h5' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{py:1}}>
        {articleData.article_name}
      </Typography>
      <hr/>
      {splittingDescription.map((item: string, index: number) => (
              <Typography key={index} variant='body1' component="div" sx={{ pt: 2, }}>
                {renderDescription(item)}
              </Typography>
            ))}

            </Paper>
            <Paper elevation={3} sx={{ mt: 2, p: 2, mb: 2 }}>
              <Typography variant='h5' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{ py: 1 }}>
                {articleData.article_name} Quiz
              </Typography>
              <hr />
              {quizz.map(quiz => (
                <React.Fragment key={quiz.id}>
                  <Typography variant='body1' component="div" sx={{ pt: 2, pb: 2 }}>
                    {quiz.question}
                  </Typography>
                  {quiz.opt_values.split(';').map((option, idx) => (
                    <Button
                      key={idx}
                      variant='outlined'
                      sx={ {mr:2,mb:2,backgroundColor:"#eaecf0ff",color:"#202122",borderRadius:0,borderColor:'#a2a9b1',"&:hover":{borderColor:'#a2a9b1',backgroundColor:"#eaecf0ff"} }}
                      onClick={() => { setCorrectAns(quiz.correct_options === ["A", "B", "C"][idx]); setOpen(true); }}
                    >
                      {option}
                    </Button>
                  ))}
                </React.Fragment>
              ))}
            </Paper>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
              {correctAns ? (
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                  Correct Answer
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                  Wrong Answer!
                </Alert>
              )}
            </Snackbar>
        </Stack>)}
        </>
    )
}


export default Player;