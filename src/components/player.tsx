/* eslint-disable react/no-unescaped-entities */
// @ts-nocheck

import {
  Alert,
  Avatar,
  Button,
  Grid,
  Link,
  List,
  ListItemText,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";
import Loading from "./loading";
import { useRouter } from "next/router";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const Player = () => {
  const [lan, setLan] = React.useState("10");
  const [tanlang, setTanLang] = React.useState("10");
  const [correctAns, setCorrectAns] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [articleData, setArticleData] = React.useState<ArticleTypes | null>(
    null
  );
  const [waiting, setWaiting] = React.useState(true);
  const [translatedTranscript, setTranslatedTranscript] = React.useState("");
  const [translated, settranslated] = React.useState(false);
  const [subtitlesData, setSubtitlesData] = React.useState([])
  const article = useRouter().query.name?.toString();

  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://wikitube-new.vercel.app/api/articles/${article?.toLowerCase()}/`
        );
        if (response.status === 200) {
          setArticleData(response.data);

          const subtitleData = response.data?.subtitles
        const subtitles = JSON.parse(subtitleData);
        setSubtitlesData(subtitles)
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
  }, [article]);

  if (!articleData) return null;

  const handleChanged = async (event) => {
    const selectedLang = event.target.value;
    setTanLang(selectedLang);
  
    try {
      const targetLanguageMap = {
        "10": "en",
        "20": "ru",
        "30": "fr",
        "40": "de",
        "50": "sw",
        "60": "es",
      };
      const targetLanguage = targetLanguageMap[selectedLang];
  
      // Combine subtitle text into larger chunks based on timestamps
      let combinedText = subtitlesData.map((item) => item.text).join(' ');
  
      // Send the combined text for translation
      const response = await axios.post("/api/translate", {
        text: combinedText,
        targetLanguage,
      });
  
      const translatedText = response.data.translatedText;
  
      // Split the translated text based on approximate positions in original subtitles
      const words = translatedText.split(' '); // split the translated text into words
      let translatedSubtitles = [];
      let wordIndex = 0;
  
      subtitlesData.forEach((subtitle) => {
        const subtitleWords = subtitle.text.split(' ').length; // how many words are in this subtitle
        const translatedPart = words.slice(wordIndex, wordIndex + subtitleWords).join(' '); // grab the same number of translated words
        wordIndex += subtitleWords;
  
        translatedSubtitles.push({
          ...subtitle,
          translatedText: translatedPart, // store the translated text
        });
      });
  
      // Update subtitles with translated text
      setSubtitlesData(translatedSubtitles);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      settranslated(true);
    }
  };
  
  

  const quizz = articleData.quizzes;

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setLan(event.target.value);
  };

  const linkWords = articleData.hyperlinks.reduce(
    (acc, link) => {
      acc[link.hyper_link_word] = link.hyper_link_word_url;
      return acc;
    },
    {} as Record<string, string>
  );

  const createLinkWithButton = (word, url) => (
    <span key={word + Math.random()}>
      <Tooltip title={word}>
        <Link href={`/wiki/${word.toLowerCase()}`} underline="none">
          {word}
        </Link>
      </Tooltip>
    </span>
  );

  const renderDescription = (text) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[\.\,]/g, "");
      if (linkWords[cleanWord]) {
        return (
          <React.Fragment key={index}>
            {createLinkWithButton(cleanWord, linkWords[cleanWord])}{" "}
          </React.Fragment>
        );
      }
      return word + " ";
    });
  };

  const splittingDescription = articleData.description.split("\r\n");

  const formatTime = (seconds) => {
    if (typeof seconds !== "number" || isNaN(seconds)) {
      return "0:00";
    }
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (waiting) return <Loading />;

  return (
    <Stack px={"10%"}>
      <Grid container mt={5}>
        <Grid md={7}>
          <Stack>
            <Stack
              sx={{
                width: "100%",
                aspectRatio: "16/9",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
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

            {articleData.videos.map((vid) => (
              <React.Fragment key={vid.video_played_id}>
                <Typography
                  sx={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: 18,
                    fontWeight: "bold",
                    pt: 2,
                  }}
                >
                  {vid.video_title}
                </Typography>
                <Stack
                  display={"flex"}
                  direction={"row"}
                  alignItems={"center"}
                  gap={1}
                  mt={1}
                >
                  <Avatar></Avatar>
                  <Typography fontSize={15} fontWeight={700}>
                    {vid.channel_name}
                  </Typography>
                </Stack>
                <Paper sx={{ my: 2 }}>
                  <Typography p={2}>{vid.video_description}</Typography>
                </Paper>
              </React.Fragment>
            ))}
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#eaecf0ff",
                color: "#202122",
                borderRadius: 0,
                borderColor: "#a2a9b1",
                "&:hover": {
                  borderColor: "#a2a9b1",
                  backgroundColor: "#eaecf0ff",
                },
              }}
            >
              Share
            </Button>
          </Stack>
        </Grid>
        <Grid md={0.5}></Grid>
        <Grid md={4.5} mt={{ xs: 3, md: 0 }}>
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
                <Select
                  input={<BootstrapInput />}
                  value={tanlang}
                  onChange={handleChanged}
                >
                  <MenuItem value={10}>En</MenuItem>
                  <MenuItem value={20}>Ru</MenuItem>
                  <MenuItem value={30}>Fr</MenuItem>
                  <MenuItem value={40}>De</MenuItem>
                  <MenuItem value={50}>Sw</MenuItem>
                  <MenuItem value={60}>Es</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Paper elevation={2} sx={{ p: 2, overflowY: "auto", height: "300px" }}>
  <Stack style={{ whiteSpace: "pre-wrap" }}>
    {subtitlesData.map((entry, index) => (
      <Stack flexDirection={"row"} key={index} style={{ marginBottom: "10px" }}>
        <Link href="#" underline="none" aria-label={`Jump to ${formatTime(entry.start)}`}>
          {formatTime(entry.start)}
        </Link>
        <Typography sx={{ pl: 1 }}>
          {tanlang !== "10" && entry.translatedText ? entry.translatedText : entry.text}
        </Typography>
      </Stack>
    ))}
  </Stack>
</Paper>


            
          </Stack>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ mt: 2, p: 2, mb: 2 }}>
        <Typography variant="h5" component="div" fontFamily="'Linux Libertine','Georgia','Times','Source Serif Pro',serif" sx={{ py: 1 }}>
          {articleData.article_name}
        </Typography>
        <hr />
        {splittingDescription.map((item: string, index: number) => (
          <Typography key={index} variant="body1" component="div" sx={{ pt: 2 }}>
            {renderDescription(item)}
          </Typography>
        ))}
      </Paper>

      <Paper elevation={3} sx={{ mt: 2, p: 2, mb: 2 }}>
        <Typography variant="h5" component="div" fontFamily="'Linux Libertine','Georgia','Times','Source Serif Pro',serif" sx={{ py: 1 }}>
          {articleData.article_name} Quiz
        </Typography>
        <hr />
        {quizz.map((quiz) => (
          <React.Fragment key={quiz.id}>
            <Typography variant="body1" component="div" sx={{ pt: 2, pb: 2 }}>
              {quiz.question}
            </Typography>
            {quiz.opt_values.split(';').map((option, idx) => (
              <Button
                key={idx}
                variant="outlined"
                sx={{
                  mr: 2,
                  mb: 2,
                  backgroundColor: "#eaecf0ff",
                  color: "#202122",
                  borderRadius: 0,
                  borderColor: "#a2a9b1",
                  "&:hover": { borderColor: "#a2a9b1", backgroundColor: "#eaecf0ff" },
                }}
                onClick={() => {
                  setCorrectAns(quiz.correct_options === ["A", "B", "C"][idx]);
                  setOpen(true);
                }}
              >
                {option}
              </Button>
            ))}
          </React.Fragment>
        ))}
      </Paper>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        key={"top-center"}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Answer is correct!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Player;
