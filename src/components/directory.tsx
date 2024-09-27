import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {
  Alert, Button, FormControl, IconButton, Link, MenuItem, Paper, Select, SelectChangeEvent, Snackbar, Stack, Typography
} from '@mui/material';
import Loading from './loading';
import CarouselComponent from './carousel';

const Directory = ({
  article_name,
  description,
  waiting,
  article_video_thumbnail,
  article_video_url,
  hyperlinks,
  quizzes,
  content
}: {
  article_name: string;
  description: string;
  article_video_thumbnail: string;
  article_video_url: string;
  hyperlinks: { hyper_link_word: string; hyper_link_word_url: string; }[];
  quizzes: { id: number; question: string; options: string; opt_values: string; correct_options: string; }[];
  content: { content_id: number; content_name: string; }[];
  waiting: boolean;
}) => {
  const [lang, setLang] = React.useState<string>("10");
  const [open, setOpen] = React.useState<boolean>(false);
  const [correctAns, setCorrectAns] = React.useState<boolean>(false);
  const [calculusVisible, setCalculusVisible] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  // Create a dictionary of links from the hyperlinks array
  const linkWords: Record<string, string> = hyperlinks.reduce((acc: Record<string, string>, link) => {
    acc[link.hyper_link_word] = link.hyper_link_word_url;
    return acc;
  }, {} as Record<string, string>);

  // Function to create button and link for a word
  const createLinkWithButton = (word: string, url: string) => (
    <span key={word + Math.random()}>
      <IconButton
        color='primary'
        size='small'
        onClick={() => setCalculusVisible(prev => !prev)}
      >
        {calculusVisible ? '[-]' : '[+]'}
      </IconButton>
      <Link href={`${word.toLowerCase()}`} underline="none">
        {word}
      </Link>

      {calculusVisible && (
        <Stack maxWidth={"100%"}>
          <CarouselComponent />
        </Stack>
      )}
    </span>
  );

  // Function to render description with links, handling phrases or multiple hyperlinks
  const renderDescription = (text: string) => {
    const words = text.split(' ');
    const elements: JSX.Element[] = [];
  
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      let cleanedWord = word.replace(/[\.,]/g, ''); // Clean punctuation for accurate matching
  
      // Check for phrases or single word matches
      let matchedPhrase = '';
      let matchedUrl = '';
  
      for (let j = i; j < words.length; j++) {
        const phrase = words.slice(i, j + 1).join(' ').replace(/[\.,]/g, '');
        if (linkWords[phrase]) {
          matchedPhrase = phrase;
          matchedUrl = linkWords[phrase];
        }
      }
  
      if (matchedPhrase) {
        elements.push(
          <React.Fragment key={i}>
            {createLinkWithButton(matchedPhrase, matchedUrl)}{' '}
          </React.Fragment>
        );
        i += matchedPhrase.split(' ').length - 1; // Skip the words that were part of the phrase
      } else if (linkWords[cleanedWord]) {
        elements.push(
          <React.Fragment key={i}>
            {createLinkWithButton(cleanedWord, linkWords[cleanedWord])}{' '}
          </React.Fragment>
        );
      } else {
        elements.push(<span key={i}>{word} </span>);
      }
    }
  
    return elements;
  };

  const splittingDescription = description.split('\r\n');

  return (
    <>
      {waiting ? (
        <Loading />
      ) : (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: 'black', paddingTop: 2, fontSize: 16, alignSelf: "center", display: "flex" }}
              >
                Language:
              </Typography>
              <FormControl sx={{ mt: 2, minHeight: 20, ml: 2 }} size="small">
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

            <Typography variant='h4' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{ pt: 5, pb: 1 }}>
              {article_name}
            </Typography>
            <hr />
            <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
              <Typography variant='h6' component="div" sx={{ fontWeight: "bold" }}>
                Contents
              </Typography>
              {content.map((item, index) => (
                <Typography key={item.content_id} variant='body1' component="div" sx={{ pl: 2 }}>
                  {index + 1}. {item.content_name}
                </Typography>
              ))}
            </Paper>

            {splittingDescription.map((item: string, index: number) => (
              <Typography key={index} variant='body1' component="div" sx={{ pt: 2 }}>
                {renderDescription(item)}
              </Typography>
            ))}

            <Paper elevation={3} sx={{ mt: 2, p: 2, mb: 2 }}>
              <Typography variant='h5' component="div" fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"} sx={{ py: 1 }}>
                {article_name} Quiz
              </Typography>
              <hr />
              {quizzes.map(quiz => (
                <React.Fragment key={quiz.id}>
                  <Typography variant='body1' component="div" sx={{ pt: 2, pb: 2 }}>
                    {quiz.question}
                  </Typography>
                  {quiz.opt_values.split(';').map((option, idx) => (
                    <Button
                      key={idx}
                      variant='outlined'
                      sx={{
                        mr: 2,
                        mb: 2,
                        backgroundColor: "#eaecf0ff",
                        color: "#202122",
                        borderRadius: 0,
                        borderColor: '#a2a9b1',
                        "&:hover": {
                          borderColor: '#a2a9b1',
                          backgroundColor: "#eaecf0ff"
                        }
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
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                  Correct Answer
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                  Wrong Answer!
                </Alert>
              )}
            </Snackbar>
          </Container>
        </React.Fragment>
      )}
    </>
  );
};

export default Directory;
