import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



import React from 'react'

const Accordin = () => {
  return (
    <Accordion sx={{maxWidth:'100%'}}>
    <AccordionSummary
      expandIcon={<ArrowDownwardIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Typography>Related Links</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
  )
}

export default Accordin
