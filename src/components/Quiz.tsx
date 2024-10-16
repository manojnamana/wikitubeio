import React, { useState } from 'react';
import { Typography, Button, Snackbar, Alert } from '@mui/material';

const Quiz = ({ quizzes }: { quizzes: { id: number; question: string; options: string; opt_values: string; correct_options: string; }[] }) => {
  const [open, setOpen] = useState(false);
  const [correctAns, setCorrectAns] = useState(false);

  const handleClick = (quiz: any, idx: number) => {
    setCorrectAns(quiz.correct_options === ["A", "B", "C"][idx]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h5">Quiz</Typography>
      {quizzes.map(quiz => (
        <React.Fragment key={quiz.id}>
          <Typography>{quiz.question}</Typography>
          {quiz.opt_values.split(';').map((option, idx) => (
            <Button key={idx} onClick={() => handleClick(quiz, idx)}>{option}</Button>
          ))}
        </React.Fragment>
      ))}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {correctAns ? (
          <Alert onClose={handleClose} severity="success">Correct Answer</Alert>
        ) : (
          <Alert onClose={handleClose} severity="error">Wrong Answer</Alert>
        )}
      </Snackbar>
    </>
  );
};

export default Quiz;
