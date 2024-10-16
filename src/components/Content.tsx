import React from 'react';
import { Typography, Paper } from '@mui/material';

const Content = ({ content }: { content: { content_id: number; content_name: string; }[] }) => {
  return (
    <Paper>
      <Typography variant="h6">Contents</Typography>
      {content.map((item, index) => (
        <Typography key={item.content_id} variant="body1">
          {index + 1}. {item.content_name}
        </Typography>
      ))}
    </Paper>
  );
};

export default Content;
