import * as React from 'react';
import { useState, useEffect } from 'react';
import {  Alert, Button, FormControl, Grid, IconButton, InputAdornment, Link, OutlinedInput, Paper, Snackbar, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';

const Changepassword = () => {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [createNewPassword, setCreateNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const [showPassword, setShowPassword] = React.useState(false);
    const [showCreateNewPassword, setShowCreateNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const[waiting,setwaiting] = useState(false)

    const bearer_token = (Cookies.get('access_token'))

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleShowConfirmNewPassword = () => setShowConfirmNewPassword((show) => !show);
    const handleClickShowCreateNewPassword = () => setShowCreateNewPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };


      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);

      };
      const handleSubmit = async()=>{
        setwaiting(true)
        if(!currentPassword || !createNewPassword|| !confirmNewPassword ){
          setSnackbarMessage('Please fill in all fields.');
        setOpenSnackbar(true);
        setwaiting(false)
        }
        else if(createNewPassword !== confirmNewPassword){
          setSnackbarMessage('New Password and Confirm Password Mismatch');
          setOpenSnackbar(true);
          setwaiting(false)
        }else{
        
         try {
          setwaiting(true)
    const ChangingPassword = await axios.post(
        'https://wikitube-new.vercel.app/api/profile/change-password/',
        {
            old_password: currentPassword,
            new_password1: createNewPassword,
            new_password2: confirmNewPassword
        },
        {
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }
    );
    
    if (ChangingPassword.status === 200) {
      
      setSnackbarMessage('Password updated successfully');
      setOpenSnackbar(true);
      setwaiting(false)
    }
    
} catch (error) {
    console.error("Error changing password:", error);
    setSnackbarMessage('Current Password Incorrect');
      setOpenSnackbar(true);
  }finally{
    setConfirmNewPassword('')
      setCreateNewPassword('')
      setCurrentPassword('')
      setwaiting(false)

    
  }

        }
    
        
    
         
    
        
      }
  return (
    <Stack >
        <Link href={'/wiki/calculus'} underline="none" color='black'>
        {<Stack display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Image src={"/static/images/wiki_logo.png"} alt='wikitube' width={100} height={100}/>
            <Typography sx={{cursor:'default'}} fontSize={25}>Wikitube</Typography>
        </Stack>}
        </Link>
    <Grid container padding={5} gap={2} alignItems={"start"}>

        <Grid item xs={12} md={3}>

        <Paper elevation={2} sx={{display:'flex',flexDirection:"column",p:3.5,gap:2}} >

            <Button color='inherit'  href="/dashboard" sx={{backgroundColor:"#f8f9fa"}}>dashboard</Button>
            <Button color='inherit' href="/editprofile" sx={{backgroundColor:"#f8f9fa"}}>Edit Profile</Button>
            <Button color='inherit' href="/changepassword" sx={{backgroundColor:"#f8f9fa"}}>Change Password</Button>
            <Button color='inherit' href="/" sx={{backgroundColor:"#f8f9fa"}}onClick={()=>(Cookies.remove('access_token'))}>Logout</Button>
        </Paper>
        </Grid>
        <Grid item xs={12} md={8.8}>
        <Paper elevation={2} sx={{pb:2,}}>
            <Paper sx={{p:2,bgcolor:'lightgrey',borderRadius:0}}>
            <Typography fontSize={{xs:13,md:18}} fontWeight={"780"}>Change your password</Typography>
            
            </Paper>
            
        <Paper elevation={0} sx={{display:"flex",flexDirection:"column",p:2,mx:2,mt:2,gap:2}}>
            <Stack>
            <Typography>
                Current Password
            </Typography>
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          
          <OutlinedInput
            
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e)=>{setCurrentPassword(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />
        </FormControl>
        </Stack>
        <Stack>
            <Typography>
            Create New Password
            </Typography>
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          
          <OutlinedInput
            
            id="outlined-adornment-password"
            type={showCreateNewPassword ? 'text' : 'password'}
            value={createNewPassword}
            onChange={(e)=>{setCreateNewPassword(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showCreateNewPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowCreateNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showCreateNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />
        </FormControl>
        </Stack>
        <Stack>
            <Typography>
                Confirm New Password
            </Typography>
            <FormControl sx={{ mt: 1, width: '100%' }} variant="outlined">
          
          <OutlinedInput
            
            id="outlined-adornment-password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={(e)=>{setConfirmNewPassword(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmNewPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleShowConfirmNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />
        </FormControl>
        </Stack>
        <Stack display={'flex'} flexDirection={'row'} justifyContent={'start'}>
        {!waiting&&<Button color='inherit' onClick={handleSubmit}  sx={{bgcolor:"black",color:"white"}}>Submit</Button>}
        {waiting&&<Button  disabled sx={{border:1}}>Submit</Button>}
        </Stack>
        </Paper>
        </Paper>
        </Grid>
        
    </Grid>

    <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={`${snackbarMessage==='Password updated successfully'?'success':'error'}`} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
    </Stack>
  )
}

export default Changepassword