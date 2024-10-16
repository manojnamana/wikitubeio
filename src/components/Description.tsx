import React from 'react';
import { Typography } from '@mui/material';
import { renderDescription } from '../../utils/renderDescription';

const Description = ({ description, hyperlinks }: { description: string; hyperlinks: { hyper_link_word: string; hyper_link_word_url: string; }[] }) => {
  const splittingDescription = description.split('\r\n');
  return (
    <>
      {splittingDescription.map((item: string, index: number) => (
        <Typography key={index} variant="body1">
          {renderDescription(item, hyperlinks)}
        </Typography>
      ))}
    </>
  );
};

export default Description;
