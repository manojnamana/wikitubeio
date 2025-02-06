// import { Avatar, Button, Grid, Link, Paper, Stack, Typography } from '@mui/material'
// import axios from 'axios'
// import Image from 'next/image'
// import Cookies from 'js-cookie';

// import React, { useEffect, useState } from 'react'

// const Dashboard = () => {

//     const[mail,setMail]=useState("")
//     const[fullname,setFullname]=useState("")
//     const[phonenumber,setPhonenumber]=useState("")
//     const[profile,setProfile]=useState("")
//     const bearer_token = (Cookies.get('access_token'))

//     function stringToColor(string: string) {
//         let hash = 0;
//         let i;
      
//         /* eslint-disable no-bitwise */
//         for (i = 0; i < string.length; i += 1) {
//           hash = string.charCodeAt(i) + ((hash << 5) - hash);
//         }
      
//         let color = '#';
      
//         for (i = 0; i < 3; i += 1) {
//           const value = (hash >> (i * 8)) & 0xff;
//           color += `00${value.toString(16)}`.slice(-2);
//         }
//         /* eslint-enable no-bitwise */
      
//         return color;
//       }
      
//       function stringAvatar(name: string) {
//         return {
//           sx: {
//             bgcolor: stringToColor(name),
//           },
//           children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
//         };
//       }

//     useEffect(()=>{

//         const gettinUserId = async()=>{

//                try{
//            const getID = await axios.get('https://wikitube-new.vercel.app/api/dashboard/',{
//              headers: {
//                      Authorization: `Bearer ${bearer_token}`
//                  }
//             })
//             if (getID.status===200){
//                 //  console.log(getID.data)
//                 setMail(getID.data.email) 
//                 setFullname(getID.data.full_name)
//                 setPhonenumber(getID.data.phone_number)
//                 setProfile(getID.data.profile_picture)

//            }
    
//         }
//         catch(err){
//             console.error('error')
            
//         }

//         }

//         gettinUserId()

//     },[bearer_token])
//   return (

//     <Stack >
//         <Link href={'/wiki/calculus'} underline="none" color='black'>
//         {<Stack display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
//             <Image src={"/static/images/wiki_logo.png"} alt='wikitube' width={100} height={100}/>
//             <Typography sx={{cursor:'default'}} fontSize={25}>Wikitube</Typography>
//         </Stack>}
//         </Link>
//     <Grid container padding={5} gap={2} >

//         <Grid item xs={12} md={3}>

//         <Paper elevation={2} sx={{display:'flex',flexDirection:"column",p:3.5,gap:2}} >

//             <Button color='inherit'  href="/dashboard" sx={{backgroundColor:"#f8f9fa"}}>dashboard</Button>
//             <Button color='inherit' href="/editprofile" sx={{backgroundColor:"#f8f9fa"}}>Edit Profile</Button>
//             <Button color='inherit' href="/changepassword" sx={{backgroundColor:"#f8f9fa"}}>Change Password</Button>
//             <Button color='inherit' href="/" sx={{backgroundColor:"#f8f9fa"}} onClick={()=>{Cookies.remove('access_token')}}>Logout</Button>
//         </Paper>
//         </Grid>
//         <Grid item xs={12} md={8.8}>
//         <Paper elevation={2} sx={{pb:2,}}>
//             <Paper sx={{display:"flex",flexDirection:"row",gap:1,p:2,bgcolor:'lightgrey',borderRadius:0}}>
//             <Typography fontSize={{xs:13,md:18}} fontWeight={"780"}>Logged in as: </Typography>
//             <Typography fontSize={{xs:13,md:18}}>{fullname} </Typography>
//             </Paper>
            
//         <Paper elevation={2} sx={{display:"flex",flexDirection:"row", justifyContent:"center",p:2,mx:2,mt:2}}>
//         <Stack alignItems={"center"} p={1} gap={1}>
//         {fullname?<Avatar {...stringAvatar(fullname)} />:<Avatar/>}
//         <Typography fontSize={{xs:13,md:18}}>{mail}</Typography>
//         <Typography fontSize={{xs:13,md:18}}>{phonenumber}</Typography>
//         </Stack>
//         </Paper>
//         </Paper>
//         </Grid>
        
//     </Grid>
//     </Stack>
//   )
// }

// export default Dashboard
import { Avatar, Button, Grid, Link, Paper, Stack, Typography } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [mail, setMail] = useState("")
    const [googleEmail, setGoogleEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [profile, setProfile] = useState("")
    const [isGoogleConnected, setIsGoogleConnected] = useState(false)
    const [googleProfilePic, setGoogleProfilePic] = useState("")
    const bearer_token = Cookies.get('access_token')

    function stringToColor(string: string) {
        let hash = 0;
        let i;
      
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 3; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
      
        return color;
    }
      
    function stringAvatar(name: string) {
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get('https://wikitube-new.vercel.app/api/dashboard/', {
                    headers: {
                        Authorization: `Bearer ${bearer_token}`
                    }
                })
                
                if (response.status === 200) {
                    const data = response.data;
                    
                    // Set regular profile data
                    setMail(data.email)
                    setFullname(data.full_name)
                    setPhonenumber(data.phone_number)
                    setProfile(data.profile_picture)

                    // Handle Google account data if available
                    if (data.social_account?.is_google_connected) {
                        setIsGoogleConnected(true)
                        setGoogleEmail(data.social_account.google_email)
                        // If Google profile picture is available in google_data
                        if (data.google_data?.picture) {
                            setGoogleProfilePic(data.google_data.picture)
                        }
                    }
                }
            } catch (err) {
                console.error('Error fetching user profile:', err)
            }
        }

        getUserProfile()
    }, [bearer_token])

    return (
        <Stack>
            <Link href={'/wiki/calculus'} underline="none" color='black'>
                <Stack display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"}>
                    <Image src={"/static/images/wiki_logo.png"} alt='wikitube' width={100} height={100}/>
                    <Typography sx={{cursor:'default'}} fontSize={25}>Wikitube</Typography>
                </Stack>
            </Link>
            
            <Grid container padding={5} gap={2}>
                <Grid item xs={12} md={3}>
                    <Paper elevation={2} sx={{display:'flex',flexDirection:"column",p:3.5,gap:2}}>
                        <Button color='inherit' href="/dashboard" sx={{backgroundColor:"#f8f9fa"}}>dashboard</Button>
                        <Button color='inherit' href="/editprofile" sx={{backgroundColor:"#f8f9fa"}}>Edit Profile</Button>
                        <Button color='inherit' href="/changepassword" sx={{backgroundColor:"#f8f9fa"}}>Change Password</Button>
                        <Button color='inherit' href="/" sx={{backgroundColor:"#f8f9fa"}} onClick={()=>{Cookies.remove('access_token')}}>Logout</Button>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} md={8.8}>
                    <Paper elevation={2} sx={{pb:2}}>
                        <Paper sx={{display:"flex",flexDirection:"row",gap:1,p:2,bgcolor:'lightgrey',borderRadius:0}}>
                            <Typography fontSize={{xs:13,md:18}} fontWeight={"780"}>Logged in as: </Typography>
                            <Typography fontSize={{xs:13,md:18}}>{fullname}</Typography>
                            {isGoogleConnected && (
                                <Typography fontSize={{xs:13,md:18}} color="primary">(Google Account)</Typography>
                            )}
                        </Paper>
                        
                        <Paper elevation={2} sx={{display:"flex",flexDirection:"row", justifyContent:"center",p:2,mx:2,mt:2}}>
                            <Stack alignItems={"center"} p={1} gap={1}>
                                {isGoogleConnected && googleProfilePic ? (
                                    <Avatar src={googleProfilePic} alt={fullname} />
                                ) : fullname ? (
                                    <Avatar {...stringAvatar(fullname)} />
                                ) : (
                                    <Avatar />
                                )}
                                <Typography fontSize={{xs:13,md:18}}>
                                    {isGoogleConnected ? googleEmail : mail}
                                </Typography>
                                <Typography fontSize={{xs:13,md:18}}>{phonenumber}</Typography>
                            </Stack>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Dashboard
