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
import { Logout, VolunteerActivism } from '@mui/icons-material';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:"whitesmoke",
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
    // vertical padding + font size from searchIcon
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
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
            <MenuItem >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>

     
      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
          href='/'
          sx={{fontSize:17}}
        >     
            <Logout sx={{mr:2}}/>
             Logout   
        </IconButton>
        {/* <p>Logout</p> */}
      </MenuItem>
      <MenuItem>
        <IconButton size="large"  color="inherit"> 
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
    <Box sx={{ display:"flex" }} >
      <ThemeProvider  theme={lightTheme}>
      <AppBar position="static" sx={{backgroundColor:'white',width:"100vw"}}  >
        <Toolbar>
          
         
          <IconButton href='/wiki/calculus' sx={{"&:hover":{backgroundColor:"transparent"},alignItems:"end"}}>
                <Avatar  src="/static/images/wikitube_logo.jpeg" sx={{width:60}} />
                <Typography
            fontSize={22}
            fontFamily={"'Linux Libertine','Georgia','Times','Source Serif Pro',serif"}
            sx={{pr:{xs:2,md:0},color:"black",display:{xs:"none",md:"block"}}}
          >
            Wikitube
          </Typography>
              </IconButton>
          <Search >
            <SearchIconWrapper>
              <SearchIcon sx={{color:"black"}}/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Wiktube"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <AccountCircle sx={{color:"black" , fontSize:30}} />
            </IconButton>
            <Button variant="contained"  href ="/" color= 'primary'sx={{marginRight:3 ,marginLeft:3,marginTop:0.8,height:40}}>Logout</Button>
            <Button variant="contained" color= 'primary' sx={{height:40,marginTop:0.8}}>Donate</Button>
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
              <MenuIcon  sx={{color:"black"}}/>
            </IconButton>
          </Box>
        </Toolbar>
        
      </AppBar>
      </ThemeProvider>
      {renderMobileMenu}
      
    </Box>
  );
}
