import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex' , justifyContent:"center",alignItems:'center', marginTop:{md:'25%',xs:'80%'}, overflowY:"hidden",}}>
      <CircularProgress />
    </Box>
  );
}
