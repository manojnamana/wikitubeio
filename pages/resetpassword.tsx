import * as React from 'react';
import {useState,useEffect} from "react"
import Box from '@mui/material/Box';
import { Button, FormControl, IconButton, InputLabel, OutlinedInput, Paper, Typography, Snackbar, Alert, Stack, Backdrop,Link } from '@mui/material';
import {  useNavigate, } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';


const ResetPassword = () => {
const [confPassword,setConfPassword] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const navigate = useRouter();
  const { uidb64, token } = navigate.query;

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();
  // const location = useLocation();
  // const [uidb64, setUidb64] = useState('');
  // const [token, setToken] = useState('');

  // useEffect(() => {
  //   const { uidb64, token } = queryString.parse(location.search);
  //   setUidb64(uidb64);
  //   setToken(token);
  // }, [location.search]);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!confPassword || !password) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    } else if (password !== confPassword) {
      setSnackbarMessage('Password and Confirm Password Should Be Same');
      setOpenSnackbar(true);
    } else {
        setWaiting(true)
      //   setSnackbarMessage('Password Reseted successful!');
      //     setOpenSnackbar(true);
      // // setTimeout(() => navigate("/"), 3000); 
      // setWaiting(false)
     
      try{ 
        setWaiting(true)
        const response =  await axios.post(`https://wikitube-new.vercel.app/api/password-reset-confirm/${uidb64}/${token}/`, { 

          new_password: password,

      });

      console.log(response.status)

        if (response.status === 200) {
          setSnackbarMessage('Password Reseted successful!');
          setOpenSnackbar(true);
          setTimeout(() => navigate.push("/"), 3000); 
          setWaiting(false)
      }
    }catch(error:any){
      setSnackbarMessage(error.response?.data?.error|| "Error resetting password" );
        setOpenSnackbar(true);
        setWaiting(false)
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
       <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Stack alignItems={"flex-end"}>
            <img src='/static/images/wiki_logo.png' alt ="logo" width={100} />
            </Stack>
            <Typography fontSize={{ md: "20", xs: 25 }}  fontWeight={"bold"} my={3} >
          Wikitube
        </Typography>
        </Stack>
      <Paper
        elevation={3}
        sx={{
          display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center",
          mb: { md: "10%", xs: "25%" }, p: 3, mx: "20%", width: "450"
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography fontSize={{ md: "20", xs: 25 }} textAlign={"center"} fontWeight={"bold"} my={3} >
          Reset Password
        </Typography>
        <FormControl sx={{ m: 1, width: '80%' }} required variant="outlined">
          {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
          <OutlinedInput
            placeholder='Password'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            // label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '80%' }} required variant="outlined">
          {/* <InputLabel htmlFor="outlined-adornment-ConfirmPassword">Confirm Password</InputLabel> */}
          <OutlinedInput
            placeholder='Confirm Password'
            id="outlined-adornment-password"
            type={showConfPassword ? 'text' : 'password'}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            // label="ConfirmPassword"
          />
        </FormControl>
{  waiting    ? <Button variant='contained' type='submit' disabled sx={{ my: 3 }}>Submit</Button> :  <Button variant='contained' type='submit' sx={{ my: 3 }}>Submit</Button>}
          <Stack direction={{md:"row",xs:"column"}} display={"flex"} justifyContent={"space-between"} spacing={4}>
        <Link href="/register" style={{ textDecoration: "none", fontSize: 20 }}>Create New Account</Link>
        </Stack>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Password Reseted successful!' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={waiting} 
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Box>
  );
}

export default ResetPassword;
