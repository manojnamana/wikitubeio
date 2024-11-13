import * as React from 'react';
import { styled } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Link } from '@mui/material';
import { Height, Logout, VolunteerActivism } from '@mui/icons-material';
import router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "whitesmoke",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '80ch',
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [article_name, setArticle_name] = React.useState('');
  const[fullname,setFullname]=React.useState("")
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function stringToColor(string: string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width:45,
        Height:30
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const bearer_token = (Cookies.get('access_token'))


  React.useEffect(()=>{

    const gettinUserId = async()=>{

           try{
       const getID = await axios.get('https://wikitube-new.vercel.app/api/dashboard/',{
         headers: {
                 Authorization: `Bearer ${bearer_token}`
             }
        })
        if (getID.status===200){

            setFullname(getID.data.full_name)


       }

    }
    catch(err){
        console.error('error')
        
    }

    }

    gettinUserId()

},[bearer_token])

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = async (e: React.FormEvent) => {
    // e.preventDefault();
    router.push(`/wiki/${article_name}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticle_name(event.target.value);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=>{router.push('/dashboard')}}>
        <IconButton
          href='/dashboard'
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton >
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
          href='/'
          sx={{ fontSize: 17 }}
        >
          <Logout sx={{ mr: 2 }} />
          Logout
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <VolunteerActivism />
        </IconButton>
        <p>Donate</p>
      </MenuItem>
    </Menu>
  );

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    }
  });

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={lightTheme}>
        <AppBar position="static" sx={{ backgroundColor: 'white', width: "100vw" }}>
          <Toolbar>
            <IconButton href='/wiki/calculus' sx={{ "&:hover": { backgroundColor: "transparent" }, alignItems: "end" }}>
              <Avatar src="/static/images/wikitube_logo.jpeg" sx={{ width: 60 }} />
              <Typography
                fontSize={22}
                fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"}
                sx={{ pr: { xs: 2, md: 0 }, color: "black", display: { xs: "none", md: "block" } }}
              >
                Wikitube
              </Typography>
            </IconButton>
            <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flexGrow: 1 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "black" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Wikitube"
                  inputProps={{ 'aria-label': 'search' }}
                  value={article_name}
                  onChange={handleInputChange}
                />
              </Search>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="primary"
                href='/dashboard'
              >
                 {fullname?<Avatar {...stringAvatar(fullname)} />:<Avatar  sx={{  width: 30,height:30 }}/>}
                
                {/* <AccountCircle sx={{ color: "black", fontSize: 30 }} /> */}
              </IconButton>
              <Button variant="contained" href="/" color='primary' sx={{ marginRight: 3, marginLeft: 3, marginTop: 0.8, height: 40 }}>Logout</Button>
              <Button variant="contained" color='primary' sx={{ height: 40, marginTop: 0.8 }}>Donate</Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {renderMobileMenu}
    </Box>
  );
}
