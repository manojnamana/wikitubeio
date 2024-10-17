/* eslint-disable react/no-unescaped-entities */

import { Alert, Avatar, Button, Grid, Link, List, ListItemText, Paper, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";

import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";
import Loading from "../loading";
import { useRouter } from "next/router";

import VideoDetailsPage from "../name";



const Player = () => {
  
  const [correctAns, setCorrectAns] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [articleData, setArticleData] = React.useState<ArticleTypes | null>(null);
  const [waiting, setWaiting] = React.useState(true);
  
  const router = useRouter();
  const { name } = router.query;

  // If the URL parameter contains encoded characters, decode it
  const decodedName = decodeURIComponent(name as string);

  // Remove the extra characters, if needed, such as spaces or special characters
  const article = decodedName.trim().split('&')[0];
  const videoId = decodedName.trim().split('&')[1];



  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://wikitubeio-backend.vercel.app/api/articles/${article?.toLowerCase()}/`);
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

    if (article) {
      fetchArticle();
    }
  }, [article]);

  if (waiting) return <Loading />;
  if (!articleData) return null;

  const quizz = articleData.quizzes;

  const handleClose = () => {
    setOpen(false);
  };



  const linkWords: Record<string, string> = articleData.hyperlinks.reduce((acc: Record<string, string>, link) => {
    acc[link.hyper_link_word] = link.hyper_link_word_url;
    return acc;
  }, {});

  // Function to create a link with tooltip
  const createLinkWithButton = (word: string, url: string) => (
    <span key={word + Math.random()}>
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

  return (
    <Stack px={"10%"}>

      <p>{decodedName}</p>
      <VideoDetailsPage />

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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        {correctAns ? (
          <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
            Correct Answer
          </Alert>
        ) : (
          <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
            Wrong Answer!
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
};

export default Player;
