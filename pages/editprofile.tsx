// @ts-nocheck
import {  Alert, Avatar, Button, FormControl, Grid, InputLabel, Link, MenuItem, Paper, Select, Snackbar, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie';

import React, { useEffect, useState } from 'react'
import { MuiPhone } from '@/src/components/MuiPhone';


const Editprofile = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [phonenumber, setPhonenumber] = React.useState('');
    const [address1,setAddress1] = React.useState('');
    const [address2,setAddress2] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [profile, setProfile] = React.useState<File | null>(null);
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [waiting, setwaiting] = React.useState(false);
    const bearer_token = (Cookies.get('access_token'))
    const[pro,setPro]= useState('')


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

      const handleCloseSnackbar = () => {
        setOpenSnackbar(false);

      };

      const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
          if (!allowedTypes.includes(file.type)) {
            setSnackbarMessage('Invalid file format. Only jpeg, jpg, and png are allowed.');
            setOpenSnackbar(true);
            return;
          }
          setProfile(file);
        }
      };
      

      const handleSubmit = async() => {
        if(!firstName || !lastName || !phonenumber ||!gender ||!address1 ||!address2||!state||!city
            ||!country||!profile||!dateOfBirth
        ){
            setOpenSnackbar(true)
            setSnackbarMessage("Please fill all fields")


        }
        else if (!validateDateOfBirth(dateOfBirth)) {
            setSnackbarMessage('Please enter a valid date of birth (YYYY-MM-DD) above 2009 ');
            setOpenSnackbar(true);

          } else if ((phonenumber.length === 3 || phonenumber.length<15)) {
            console.log(phonenumber.length)
            setSnackbarMessage(`Please Enter Valid Phone Number`);
            setOpenSnackbar(true);
          } else{
            setPro(URL.createObjectURL(profile))

            try{
                setwaiting(true)
    const updateProfile = await axios.patch(
        'https://wikitube-new.vercel.app/api/profile/edit/',
        {
            first_name:firstName,
            last_name:lastName,
            date_of_birth:dateOfBirth,
            gender,
            phone_number:phonenumber,
            address_line_1:address1,
            address_line_2:address2,
            profile_picture:profile,
            city,
            state,
            country
            
        },
        {
            headers: {
                Authorization: `Bearer ${bearer_token}`
            }
        }
    );
    
    if (updateProfile.status === 200) {
      console.log(updateProfile.data)
      setSnackbarMessage('Profile Updated');
      setOpenSnackbar(true);
      setwaiting(false)
    }

            }catch(err){
                console.error("error while Fetching :" ,err)
                setwaiting(false)
            }
            finally{
                setAddress1(''),setAddress2(''),
                setCity("")
                setCountry("")
                setDateOfBirth('') ,setFirstName(''),setLastName(''),
    setPhonenumber(''),setGender(''),setProfile(null),setState("")

            }
          }

      };


  return (
    <Stack >
        <Link href={'/wiki/calculus'} underline="none" color='black'>
        {<Stack display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
            <Image src={"/static/images/wiki_logo.png"} alt='wikitube' width={100} height={100}/>
            <Typography sx={{cursor:'default'}} fontSize={25}>Wikitube</Typography>
        </Stack>}
        </Link>
    <Grid container padding={5} gap={2} >

        <Grid item xs={12} md={3}>

        <Paper elevation={2} sx={{display:'flex',flexDirection:"column",p:3.5,gap:2}} >

            <Button color='inherit'  href="/dashboard" sx={{backgroundColor:"#f8f9fa"}}>dashboard</Button>
            <Button color='inherit' href="/editprofile" sx={{backgroundColor:"#f8f9fa"}}>Edit Profile</Button>
            <Button color='inherit' href="/changepassword" sx={{backgroundColor:"#f8f9fa"}}>Change Password</Button>
            <Button color='inherit' href="/" sx={{backgroundColor:"#f8f9fa"}} onClick={()=>{Cookies.remove('access_token')}}>Logout</Button>
        </Paper>
        </Grid>
        <Grid item xs={12} md={8.8}>
        <Paper elevation={2} sx={{pb:2,}}>
            <Paper sx={{display:"flex",flexDirection:"row",gap:1,p:2,bgcolor:'lightgrey',borderRadius:0}}>
            <Typography fontSize={{xs:13,md:18}} fontWeight={"780"}>Edit Profile</Typography>

            </Paper>
            
        <Paper elevation={2} sx={{p:2,mx:2,mt:2}}>

            <Grid container p={{xs:0,md:4}}  >
            
            <Grid item xs={12} md={5.5}>
                <Typography sx={{fontSize:15,pb:1}}>First Name</Typography>
                <FormControl fullWidth variant="outlined">
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
              <Grid  md={1}/>
              <Grid item xs={12} md={5.5}>
              <Typography sx={{fontSize:15,pb:1}}>Last Name</Typography>
                <FormControl fullWidth  variant="outlined">
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
                <Grid item xs={12} md={5.5}>
                <Typography sx={{fontSize:15,pb:1}}>Date of birth</Typography>
                <FormControl fullWidth variant="outlined">
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
              <Grid item md={1}/>
              <Grid item xs={12} md={5.5}>
              <Typography sx={{fontSize:15,pb:1}}>Gender</Typography>
                <FormControl fullWidth  variant="outlined">
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
           

              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>Address Line 1</Typography>
                <TextField placeholder='Address1'
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                 fullWidth/>
              </Grid>
              <Grid item md={1}/>
              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>Address Line 2</Typography>
                <TextField
                 placeholder='Address2' 
                 value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                 fullWidth/>
              </Grid>

              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>Phone Number</Typography>
                <FormControl fullWidth variant="outlined" >
                  
                
                  <MuiPhone value={phonenumber} onChange={setPhonenumber} />
               
                </FormControl>
              </Grid>
              <Grid item md={1}/>
             
              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>City</Typography>
                <TextField placeholder='City' 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                fullWidth/>
              </Grid>
             
              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>State</Typography>
                <TextField placeholder='State' 
                value={state}
                onChange={(e) => setState(e.target.value)}
                fullWidth/>
              </Grid>
              <Grid item md={1}/>
              <Grid item xs={12} md={5.5} mb={3}>
              <Typography sx={{fontSize:15,pb:1}}>Country</Typography>
                <TextField placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                fullWidth/>
              </Grid>

              <Stack display={'flex'} flexDirection={'row'} justifyContent={'start'}>
        {!waiting&&<Button color='inherit' onClick={handleSubmit}  sx={{bgcolor:"black",color:"white"}}>Submit</Button>}
        {waiting&&<Button  disabled sx={{border:1}}>Submit</Button>}
        </Stack>
            </Grid>
           
        </Paper>
        </Paper>
        </Grid>
        
    </Grid>
    <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity={`${snackbarMessage==='Profile Updated'?'success':'error'}`} sx={{ width: '100%' }}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
    </Stack>
  )
}

export default Editprofile
