import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, Grid, IconButton, InputLabel, OutlinedInput, Paper, Typography, Snackbar, Alert, Select, MenuItem, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useRouter } from 'next/router';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phonenumber, setPhonenumber] = React.useState('');
  const [dateOfBirth, setDateOfBirth] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();
   const navigate = useRouter()

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!firstName || !lastName  || !email || !password || !phonenumber|| !gender || !dateOfBirth) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    } else if (!validateEmail(email)) {
      setSnackbarMessage('Please enter a valid email address.');
      setOpenSnackbar(true);
    } else {
      // setSnackbarMessage('Registertion Success!');
      // setOpenSuccessSnackbar(true);

      try {
       const response =  await axios.post('https://wikitubeio-backend.vercel.app/api/register/', {first_name:firstName,last_name:lastName, email, password,phone_number:phonenumber,date_of_birth:dateOfBirth,gender });
        if (response.status === 201 || response.status === 200) {
          // setSnackbarMessage('Verfication Link Sent To Your Mail!');
          setOpenSuccessSnackbar(true);
          setSnackbarMessage('Registertion Success!');
          setTimeout(() => navigate.push("/"), 3000); 
        }
      } catch (error:any) {
        setSnackbarMessage(error.response?.data?.error );
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSuccessSnackbar(false);
  };

  return (
    <Box>
       <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"} display={{md:"none"}}>
            <Stack alignItems={"flex-end"}>
            <img src='/static/images/wiki_logo.png' alt ="logo" width={100} />
            </Stack>
            <Typography fontSize={{ md: "20", xs: 25 }}  fontWeight={"bold"} my={3} >
          Wikitube
        </Typography>
        </Stack>
        <Grid container alignItems={"center"}>
            <Grid md={6} sx={{display:{xs:"none",md:"flex"}}}>
                <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} ml={6}>
                <img src='/static/images/wiki_logo.png' alt ="logo" width={200} height={200}/>
                <Typography fontSize={35} fontWeight={"bold"}>Wikitube</Typography>
                </Stack>
            </Grid>
            <Grid xs={12} md={6}>
      <Paper
        elevation={3}
        sx={{
          display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center",
          mt: { md: "10%", xs: "0" },mb: { md: "10%", xs: "25%" }, p: 3, mx: { md: "20%", xs: "5%" }, width: "450"
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      ><Typography fontSize={{ md: "20", xs: 25 }} textAlign={"center"} fontWeight={"bold"} my={3} >Create a new account
    </Typography>
        
        <Grid container display={"flex"} justifyContent={"center"}>
          <Grid xs={12} md={6}>
            <FormControl sx={{ ml: 2, width: {md:'90%',xs:"95%"} }} variant="outlined">
              <TextField
                id="FirstName"
                label="First Name"
                required
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                sx={{ mb: 3 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl sx={{ ml: 2, width: {md:'90%',xs:"95%"}}} variant="outlined">
              <TextField
                id="LastName"
                label="Last Name"
                required
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                sx={{ mb: 3 }}
              />
            </FormControl>
          </Grid>

          <Grid xs={12} md={6}>
            <FormControl sx={{ ml: 2, width: {md:'90%',xs:"95%"} }} variant="outlined">
            <TextField type='date' id = "dateOfBirth" required   value={dateOfBirth} sx={{mb:3}} onChange={(e)=>setDateOfBirth(e.target.value)} />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl sx={{ ml: 2, width: {md:'90%',xs:"95%"}}} variant="outlined">
            <InputLabel id="Genderlabel">Gender</InputLabel>
                <Select
                labelId='Genderlabel'
                  id="gender"
                  required
                  value={gender}
                  label="Gender"
                  sx={{mb:3}}
                  onChange={(e)=>setGender(e.target.value)}
                >
                  
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Others</MenuItem>
                </Select>

            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl sx={{ ml: 2, width: '95%' }} variant="outlined">
              <TextField
                id="email"
                label="Email"
                type='email'
                required
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!validateEmail(email) && email.length > 0}
                helperText={!validateEmail(email) && email.length > 0 ? "Invalid email format" : ""}
                sx={{ mb: 3 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl sx={{ ml: 2, width: '95%' ,mb:3}} required variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                placeholder='Password'
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
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl sx={{ ml: 2, width: '95%' }} variant="outlined">
              <TextField
                id="phonenumber"
                label="Phonenumber"
                required
                placeholder='Phonenumber'
                type='number'
                value={phonenumber}
                onChange={(e) => setPhonenumber (e.target.value)}
                sx={{ mb: 3 }}
              />
            </FormControl>
          </Grid>

        </Grid>
        <Button variant='contained' type='submit' sx={{ my: 3 }}>Register</Button>

        <Typography mr={2}>Already have an account?</Typography>
        <Link href="/" style={{ textDecoration: "none", fontSize: 20 }}>Login</Link>
      </Paper>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Grid>
    </Box>
  );
}

export default Register;
