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
import { MuiPhone } from '@/src/components/MuiPhone';

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
  const [confPassword, setConfPassword] = React.useState('');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [waiting, setwaiting] = React.useState(false);
  const [showConfPassword, setShowConfPassword] = React.useState(false);
  const [countryCode, setCountryCode] = React.useState<'+91' | '+1' | '+44'>('+91'); // Default country code with type

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();
  const navigate = useRouter();
  const handleClickShowConfPassword = () => setShowConfPassword((show) => !show);

  const validateEmail = (email: string) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateDateOfBirth = (date: string) => {
    // Check if the entered date matches the format yyyy-mm-dd and is between 2009 and now
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = date.match(dateRegex);

    if (!match) return false;

    const year = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const day = parseInt(match[3], 10);
    const now = new Date();

    if (year > 2009 || year > now.getFullYear()) return false;
    if (month < 1 || month > 12) return false;

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) return false;

    return true;
  };

  

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !phonenumber || !gender || !dateOfBirth || !confPassword) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    } else if (!validateEmail(email)) {
      setSnackbarMessage('Please enter a valid email address.');
      setOpenSnackbar(true);
    } else if (password !== confPassword) {
      setSnackbarMessage('Password and Confirm Password Should Be Same');
      setOpenSnackbar(true);
    } else if (!validateDateOfBirth(dateOfBirth)) {
      setSnackbarMessage('Please enter a valid date of birth (dd/mm/yyyy) above 2009 ');
      setOpenSnackbar(true);
    } else if ((phonenumber.length === 0 || phonenumber.length<15)) {
      console.log(phonenumber.length)
      setSnackbarMessage(`Please Enter Valid Phone Number`);
      setOpenSnackbar(true);
    } else {
      setwaiting(true);
      try {
        const response = await axios.post('https://wikitube-new.vercel.app/api/register/', {
          first_name: firstName,
          last_name: lastName,
          email,
          password: confPassword,
          phone_number: `${phonenumber}`,
          date_of_birth: dateOfBirth,
          gender,
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
      <Stack flexDirection={"row"} justifyContent={"center"} alignItems={"center"} display={{ md: "none" }}>
        <Stack alignItems={"flex-end"}>
          <img src='/static/images/wiki_logo.png' alt="logo" width={100} />
        </Stack>
        <Typography fontSize={{ md: "20", xs: 25 }} fontWeight={"bold"} my={3}>
          Wikitube
        </Typography>
      </Stack>
      <Grid container alignItems={"center"}>
        <Grid md={6} sx={{ display: { xs: "none", md: "flex" } }}>
          <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"center"} ml={6}>
            <img src='/static/images/wiki_logo.png' alt="logo" width={200} height={200} />
            <Typography fontSize={35} fontWeight={"bold"}>Wikitube</Typography>
          </Stack>
        </Grid>
        <Grid xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              display: "flex", justifyContent: 'center', flexDirection: "column", alignItems: "center",
              mt: { md: "10%", xs: "0" }, mb: { md: "10%", xs: "25%" }, p: 3, mx: { md: "20%", xs: "5%" }, width: "450"
            }}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography fontSize={{ md: "20", xs: 25 }} textAlign={"center"} fontWeight={"bold"} my={3} >Create a new account</Typography>

            <Grid container display={"flex"} justifyContent={"center"}>
              <Grid xs={12} md={6}>
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
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
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
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
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
                  <TextField
                    id="dateOfBirth"
                    required
                    placeholder="YYYY-MM-DD"
                    value={dateOfBirth}
                    sx={{ mb: 3 }}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    helperText={!validateDateOfBirth(dateOfBirth) && dateOfBirth.length > 0 ? "Invalid date format or age above 16" : ""}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
                  <InputLabel id="Genderlabel">Gender</InputLabel>
                  <Select
                    labelId='Genderlabel'
                    id="gender"
                    required
                    value={gender}
                    placeholder='Gender'
                    label="Gender"
                    sx={{ mb: 3 }}
                    onChange={(e) => setGender(e.target.value)}
                  >
                  
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} md={12}>
                <FormControl sx={{ ml: 2, width: { md: '95%', xs: "95%" } }} variant="outlined">
                  <TextField
                    id="email"
                    required
                    placeholder='Email'
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: 3 }}
                  />
                </FormControl>
              </Grid>

              {/* <Grid xs={12} md={3}>
                <FormControl sx={{ ml: 2, width: { md: '95%', xs: "95%" } }} variant="outlined">
                  <InputLabel id="CountryCodeLabel">Country Code</InputLabel>
                  
                </FormControl>
              </Grid> */}

              <Grid xs={12}>
                <FormControl  variant="outlined" sx={{width:"95%"}}>
                  <Stack flexDirection={"row"} sx={{ ml: 2, width: { md: '100%', xs: "100%" },mb:2 }}>
                {/* <Select
                    labelId="CountryCodeLabel"
                    id="countryCode"
                    required
                    value={countryCode}
                    placeholder='Country Code'
                    sx={{ mb: 3 ,mr:2}}
                    onChange={(e) => setCountryCode(e.target.value as '+91' | '+1' | '+44')}
                  >
                    <MenuItem value="+91">+91</MenuItem>
                    <MenuItem value="+1">+1</MenuItem>
                    <MenuItem value="+44">+44</MenuItem>
                  </Select>
                  <TextField
                    id="phonenumber"
                    required
                    placeholder='Phone Number'
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    sx={{ mb: 3,width:"100%" }}
                    helperText={!validatePhoneNumber() && phonenumber.length > 0 ? "Invalid phone number length" : ""}
                  /> */}
                  <MuiPhone value={phonenumber} onChange={setPhonenumber} />
                  </Stack>
                </FormControl>
              </Grid>

              <Grid xs={12} md={6}>
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
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
                    label="Password"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl sx={{ ml: 2, width: { md: '90%', xs: "95%" } }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
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
                    label="Confirm Password"
                  />
                </FormControl>
              </Grid>

              <Grid xs={12} md={12}>
                <FormControl sx={{ ml: 2, width: { md: '95%', xs: "95%" } }} variant="outlined">
                  <Button type='submit' variant="contained" disabled={waiting}>Register</Button>
                </FormControl>
              </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>

            <Snackbar open={openSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>

            <Typography mt={2} mb={1}>Already have an account? <Link href="/" underline='none'>Sign in</Link></Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
