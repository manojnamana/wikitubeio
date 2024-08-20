import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';

import { Button } from '@mui/material';


export default function Footer() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);


  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Button variant='contained'  color='primary' sx={{height:30,marginRight:3,marginTop:2}}>C.R.E.A.T.E.R</Button>
          <Button variant='contained' href='/coursemaker' color='primary' sx={{height:30,marginTop:2}}>Course Maker</Button>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}



