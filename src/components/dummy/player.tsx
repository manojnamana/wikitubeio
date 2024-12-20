import { Alert, Avatar, Button, Grid, Link, List, ListItemText, Paper, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { ArticleTypes } from "@/types/articleTypes";
import Loading from "../loading";
import { useRouter } from "next/router";
import VideoDetailsPage from "../VideoDetailsPage";

const Player = () => {
  const [correctAns, setCorrectAns] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [articleData, setArticleData] = React.useState<ArticleTypes | null>(null);
  const [waiting, setWaiting] = React.useState(true);

  const router = useRouter();
  const { name } = router.query;

  React.useEffect(() => {
    if (!router.isReady || !name) return;

    const decodename2 = name as string;
    const parts = decodename2.split('/');

    // Safely extract video_id and article_id
    const video_id = parts?.[0] || '';
    const article_id = parts?.[1]?.split('=')[1]?.trim() || '';

    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://wikitube-new.vercel.app/api/articles/${article_id.toLowerCase()}/`);
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

    if (article_id) {
      fetchArticle();
    }
  }, [router.isReady, name]);

  if (waiting) return <Loading />;
  if (!articleData) return null;

  const quizz = articleData.quizzes;

  const handleClose = () => {
    setOpen(false);
  };

  const linkWords: Record<string, string> = articleData.hyperlinks.reduce(
    (acc: Record<string, string>, link) => {
      acc[link.hyper_link_word] = link.hyper_link_word_url;
      return acc;
    },
    {}
  );

  const createLinkWithButton = (word: string, url: string) => (
    <span key={word + Math.random()}>
      <Tooltip title={word}>
        <Link href={`/wiki/${word.toLowerCase()}`} underline="none">
          {word}
        </Link>
      </Tooltip>
    </span>
  );

  const renderDescription = (text: string) => {
    const words = text.split(' ');

    return words.map((word, index) => {
      const cleanWord = word.replace(/[\.\,]/g, '');
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

  const decodename2 = name as string;
  const parts = decodename2.split('/');
  const video_id = parts?.[0] || '';  // Ensure video_id is available

  return (
    <Stack px={"10%"}>
      {/* Only render VideoDetailsPage if video_id exists */}
      {video_id && <VideoDetailsPage id={video_id} />}

      <Paper elevation={3} sx={{ mt: 2, p: 2, mb: 2 }}>
        <Typography
          variant="h5"
          component="div"
          fontFamily="'Linux Libertine','Georgia','Times','Source Serif Pro',serif"
          sx={{ py: 1 }}
        >
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
        <Typography
          variant="h5"
          component="div"
          fontFamily="'Linux Libertine','Georgia','Times','Source Serif Pro',serif"
          sx={{ py: 1 }}
        >
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
                  "&:hover": {
                    borderColor: "#a2a9b1",
                    backgroundColor: "#eaecf0ff",
                  },
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
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {correctAns ? (
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Correct Answer
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Wrong Answer!
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
};

export default Player;
