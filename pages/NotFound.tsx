import { Stack, Typography } from '@mui/material'
import React from 'react'

const NotFound = () => {
  return (
    <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} >
        <Typography fontWeight={'bold'} fontSize={25} marginTop={{xs:'75%',md:'25%'}}>Article Not Found</Typography>
    </Stack>
  )
}

export default NotFound
