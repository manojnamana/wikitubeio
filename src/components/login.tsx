import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, FormControl, IconButton, InputLabel, OutlinedInput, Paper, Typography, Snackbar, Alert, Stack, Grid, Chip } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import { Apple, FacebookRounded, Google } from '@mui/icons-material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

// const fetchGoogleToken = async () => {
//   try {
//       const response = await axios.get('https://wikitube-new.vercel.app/api/google-token/', { withCredentials: true });

//       if (response.data.access_token) {
//           // Store token in cookies
//           Cookies.set('access_token', response.data.access_token, { secure: true, sameSite: 'Lax' });
//       }
//   } catch (error) {
//       console.error("Error fetching access token:", error);
//   }
// };


const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [waiting, setwaiting] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: { preventDefault: () => any; }) => event.preventDefault();
  const navigate = useRouter()
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!email || !password) {
      setSnackbarMessage('Please fill in all fields.');
      setOpenSnackbar(true);
    } else if (!validateEmail(email)) {
      setSnackbarMessage('Please enter a valid email address.');
      setOpenSnackbar(true);
    } else {

      setwaiting(true)
      try{
        setwaiting(true)
        const response =  await axios.post('https://wikitube-new.vercel.app/api/login/', { email, password, });
        
        if (response.status === 200) {
          
          setSnackbarMessage('Login successful!');
          setwaiting(false)
          setOpenSnackbar(true);
          Cookies.set('access_token', response.data.access, { expires: 7 });
          setTimeout(() => navigate.push("/landing"), 3000); 
        
      }
    }catch(error:any){
      setwaiting(false)
      setSnackbarMessage(error.response?.data?.error || "No user found with this email address! ");
        setOpenSnackbar(true);
      }
    }
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
//   React.useEffect(() => {
//     const fetchToken = async () => {
//         try {
//             console.log("Fetching Google token...");
//             await fetchGoogleToken();
//             console.log("Google token fetched successfully!");
//         } catch (error) {
//             console.error("Error fetching Google token:", error);
//         }
//     };
//     fetchToken();
// }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'https://wikitube-new.vercel.app/accounts/google/login/';
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
          mt: { md: "10%", xs: "0" },mb: { md: "10%", xs: "25%" },  p: 3, mx: {xs:"5%",md:'20%'}, width: "450"
        }}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >

<Typography fontSize={{ md: "20", xs: 25 }} textAlign={"center"} fontWeight={"bold"} my={3} >
          Login
        </Typography>
        <FormControl sx={{ m: 1, width: '80%' }} variant="outlined">
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            // label="Email Address"
            sx={{ mb: 3 }}
            placeholder='Email Address'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!validateEmail(email) && email.length > 0}
            helperText={!validateEmail(email) && email.length > 0 ? "Invalid email format" : ""}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '80%' }} required variant="outlined">
          {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
          <OutlinedInput
            placeholder='Password'
            // id="outlined-adornment-password"
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
       {waiting ?<Button variant='contained'  disabled sx={{ my: 3 }} >Login</Button>: <Button variant='contained'  type='submit' sx={{ my: 3 }} >Login</Button>}
        

          <Stack direction={{md:"row",xs:"column"}} display={"flex"} justifyContent={"space-between"} spacing={4}>
        <Link href="/register" style={{ textDecoration: "none", fontSize: 20 }} textAlign={"center"}>Create New Account</Link>
        <Link href="/forgotpassword" style={{ textDecoration: "none", fontSize: 20 }} textAlign={"center"}>Forgot password ?</Link>
        </Stack>

        <Stack mt={3}>
        <Button onClick={handleGoogleLogin}>
        <Chip variant="filled" label ="Login with Google"  icon={<Google style={{color:'white'}} />} color='error' />
        </Button>
        {/* <Chip variant="filled" label ="Login with Facebook" color='primary' icon={<FacebookRounded />} sx={{ mt: 2,}} />
        
        <Chip variant="outlined" label ="Login with Apple"  icon={<Apple style={{color:'white'}} />} sx={{ my: 2 ,color:"white",backgroundColor:"black"}} /> */}
        </Stack>
      </Paper>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage === 'Login successful!' ? 'success' : 'error'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Grid>
    </Box>
  );
}

export default Login;
