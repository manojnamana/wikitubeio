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
  const [confPassword,setConfPassword] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [waiting, setwaiting] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState('+91'); // Default country code

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();
   const navigate = useRouter();
   const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!firstName || !lastName  || !email || !password || !phonenumber|| !gender || !dateOfBirth || !confPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    } else if (!validateEmail(email)) {
      setSnackbarMessage('Please enter a valid email address.');
      setOpenSnackbar(true);
    }
    else if (password !== confPassword) {
      setSnackbarMessage('Password and Confirm Password Should Be Same');
      setOpenSnackbar(true);
    } else {
      setwaiting(true);
      try {
        const response =  await axios.post('https://wikitubeio-backend.vercel.app/api/register/', {
          first_name: firstName,
          last_name: lastName,
          email,
          password: confPassword,
          phone_number: `${countryCode}${phonenumber}`,
          date_of_birth: dateOfBirth,
          gender
        });
        if (response.status === 201 || response.status === 200) {
          setSnackbarMessage('Verification Link Sent To Your Mail!');
          setOpenSuccessSnackbar(true);
          setwaiting(false);
          setTimeout(() => navigate.push("/"), 3000); 
        }
      } catch (error: any) {
        setwaiting(false);
        setSnackbarMessage(error.response?.data?.error);
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
            <TextField 
              type='date' 
              id="dateOfBirth" 
              required 
              value={dateOfBirth} 
              sx={{mb:3}} 
              onChange={(e) => setDateOfBirth(e.target.value)} 
              inputProps={{
                min: "2009-01-01", // Minimum date
                max: new Date().toISOString().split("T")[0] // Today's date
              }}
            />
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
                  placeholder='Gender'
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
          <FormControl sx={{ ml: 2, width: '95%' }} required variant="outlined">
          <OutlinedInput
            placeholder='Password'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
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
          />
        </FormControl>
          </Grid>
          <Grid xs={12}>
          <FormControl sx={{ ml: 2, width: '95%' }} required variant="outlined">
          <OutlinedInput
            placeholder='Confirm Password'
            id="outlined-adornment-password"
            type={showConfPassword ? 'text' : 'password'}
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            sx={{ mb: 3 }}
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
          />
        </FormControl>
          </Grid>

          {/* <Grid xs={12} md={6}>
            <FormControl sx={{ ml: 2, width: {md:'90%',xs:"95%"}}} variant="outlined">
              <Select
                labelId='CountryCodelabel'
                id="countryCode"
                value={countryCode}
                label="Country Code"
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="+1">+1 (US)</MenuItem>
                <MenuItem value="+44">+44 (UK)</MenuItem>
                <MenuItem value="+91">+91 (India)</MenuItem>

              </Select>
            </FormControl>
          </Grid> */}
          <Grid xs={12} >

            <FormControl sx={{ ml: 2, width: {xs:"95%"}}} variant="outlined">
              <Stack flexDirection={"row"} >
            <Select
                labelId='CountryCodelabel'
                id="countryCode"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                sx={{ mb: 3 ,minHeight:20,mr:2}}
                size='small'
              >
                <MenuItem value="+1">+1</MenuItem>
                <MenuItem value="+44">+44</MenuItem>
                <MenuItem value="+91">+91</MenuItem>
                {/* Add more country codes as needed */}
              </Select>
              <TextField
                id="PhoneNumber"
                required
                placeholder='Phone Number'
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                sx={{ mb: 3 ,width:"100%"}}
              />
              </Stack>
            </FormControl>
          </Grid>

        </Grid>
        <Grid container alignItems={"center"} justifyContent={"center"}>

          <Button variant='contained' disabled={waiting} sx={{ px: { md: 5, xs: 5 }, width: { md: "80%", xs: "90%" }, textTransform: "capitalize", my: 3 }} onClick={handleSubmit}>Register</Button>
        </Grid>
        <Typography my={2}>Already Have an account?<Link href="/" ml={2} underline='none'>Sign In</Link></Typography>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
      </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
