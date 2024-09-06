import React from "react";
import { memo, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Typography,
  Stack,
  TextField,
  Tooltip,
  Slide,
  Tabs,
  Tab
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, TButton, TIconButton } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";

import { topBarHeight } from "app/utils/constant";

import {
  Home,
  Menu,
  Person,
  Settings,
  PowerSettingsNew
} from "@mui/icons-material";

import WishListIcon from '@mui/icons-material/Favorite'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import PhotoCamera from '@mui/icons-material/CameraAlt'
import SearchIcon from '@mui/icons-material/Search'

import { themeColors } from "app/components/MatxTheme/themeColors";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white'
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "6px",
  paddingLeft: 12,
  paddingRight: 12,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: '#191919',
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const TabPanel = memo(({ children, value, index, ...other }) => {
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
})

const SideMenu = memo(({ sideMenuOn, tab, setTabs }) => {

 return (
  <Slide direction={'right'} in={sideMenuOn} mountOnEnter unmountOnExit>
    <Box sx={{
        zIndex: 99, 
        background: '#191919', 
        height: '100dvh',
        position: 'fixed',
        top: '137px',
        left: 0,
        width: 300,
        boxShadow: 8,
        display: {sx: 'flex', md: 'none'}
      }}
    >
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTabs(newValue)}
          aria-label="basic tabs menu"
          variant="fullWidth"
          sx={{
            // borderBottom: 1,
            // borderColor: 'white',
            // backgroundColor: themeColors.red.palette.primary.main, // Background color of Tabs
            color: themeColors.red.palette.primary.main,
            '& .MuiTabs-indicator': {
              backgroundColor: themeColors.red.palette.primary.main, // Color of the indicator (underline)
              height: '1.5px', // Height of the underline
            },  // Text color of Tabs
          }}
        >
          <Tab 
            label="Menu" 
            id="tab-0" 
            aria-controls="tabpanel-0" 
            sx={{ 
              fontSize: '14px',
              textTransform: 'none',
              color: 'white',        // Color of the Tab labels
              '&.Mui-selected': {
                color: themeColors.red.palette.primary.main,  
              }, // Color when the Tab is selected
            }}
          />
          <Tab 
            label="All Categories"
            id="tab-1" 
            aria-controls="tabpanel-1"
            sx={{ 
              fontSize: '14px',
              textTransform: 'none',
              color: 'white',        // Color of the Tab labels
              '&.Mui-selected': {
                color: themeColors.red.palette.primary.main,     // Color when the Tab is selected
              }
            }} 
          />
        </Tabs>

      <TabPanel value={tab} index={0}>
        Content for Tab 1
      </TabPanel>
      <TabPanel value={tab} index={1}>
        Content for Tab 2
      </TabPanel>
    </Box>
  </Slide>
 ); 
})

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user, role } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [sideMenuOn, setSideMenuOn] = useState(false)

  const [tab, setTabs] = useState(0)

  const location = useLocation()

  useEffect(() => {
    switch(location.pathname){
      case '/':
        setActiveNav('home')
        break
      case '/product/filter-product':
        setActiveNav('product')
        break
      case '/about':
        setActiveNav('about')
        break
      case '/contact':
        setActiveNav('contact')
        break
      case '/track-order':
        setActiveNav('track')
        break
      case '/inquiries':
        setActiveNav('inquiries')
        break
      default:
        setActiveNav('n')
    }
  }, [location])

  const [activeNav, setActiveNav] = useState('home')

  const navigates = useNavigate()

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const TopbarRoot = styled("div")({
    top: 0,
    padding: !user || role==='USER' ? '0 3%' : '0',
    zIndex: 96,
    // borderBottom: '0.1em solid gray',
    height: !user || role==='USER' || role==='GUEST' ? '136.41px' : topBarHeight,
    // boxShadow: themeShadows[8],
    transition: "all 0.3s ease",
    background: '#191919',
  });

  const navigate = (path) => {
    setActiveNav(path)
    switch(path){
      case 'home':
        navigates('/')
        break;
      case 'product':
        navigates('/product/filter-product')
        break
      case 'about':
        navigates('/about')
        break
      case 'contact':
        navigates('/contact')
        break
      case 'track':
        navigates('/track-order')
        break
      case 'inquiries':
        navigates('/inquiries')
        break
      default:
        navigates('/not-found')
    }
  }

  return (
    <React.Fragment>
      <TopbarRoot>
        <TopbarContainer>
          {
            !user && (role==="USER" || role==="GUEST") &&
            <React.Fragment>
              <Stack width={'100%'} mt={0.4} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box display="flex" width={'100%'} alignItems={'center'} gap={'0.8em'} justifyContent={'space-between'} sx={{height: '53.21px'}}>
                  {
                    <React.Fragment>
                      <Box
                        onClick={()=>navigate("home")}
                        component="img"
                        src="/assets/images/logos/HH01.jpg"
                        alt="Logo"
                        sx={{ width: '120px', height: 'auto', borderRadius: 1, cursor:"pointer" }}
                      >
                      </Box>


                      {/* for categery bar */}
                      <Box justifyContent={'center'} alignItems={'center'} minWidth={'170px'} width={'40%'} maxWidth={'180px'} sx={{display: { xs: 'none', md: 'flex' }, background: 'gray', padding: '0 0.2em', borderRadius: 1, cursor: 'pointer'}} color={'white'}>
                        <StyledIconButton>
                          <Menu />
                        </StyledIconButton>
                        <Typography flex={1}>All categories</Typography>
                        <ArrowDropDown />
                      </Box>
                      {/* for search bar */}
                      <Box flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'none', md: 'flex' }, background: 'white', borderRadius: 1, minWidth: '190px'}}>
                        <TextField 
                          placeholder="Find your perfect match today!"
                          sx={{background: 'white', borderRadius: 1, flex: 1, height: '39.5px'}}
                          type="search"
                          focused
                          size="small"
                        />
                        <Box display={'flex'} sx={{position: 'relative', background: 'white'}} alignItems={'center'} mr={1} gap={1}>
                          <Tooltip title="Search"><SearchIcon sx={{cursor: 'pointer'}}/></Tooltip>
                          <Tooltip title="Search by image"><PhotoCamera sx={{cursor: 'pointer'}}/></Tooltip>
                        </Box>
                      </Box>

                      {
                        !user ?
                          <React.Fragment>
                            <Box gap='0.8em' display={'flex'}>
                              <TButton
                                title='Login'
                                label='Log in'
                                variant="outlined"
                                sx={{background: `white`, color: 'black',}}
                                fun={() => navigates('/login')}
                              ></TButton>
                              <TButton
                                title='Signup'
                                label='Sign up'
                                variant="contained"
                                sx={{background: themeColors.red.palette.primary.main, color: themeColors.red.palette.primary.contrastText}}
                                fun={() => navigates('/signup')}
                              ></TButton>
                            </Box>
                          </React.Fragment> :
                          <React.Fragment>
                            <NotificationProvider>
                              <NotificationBar />
                            </NotificationProvider>
                            {
                              role==='USER'?
                                <React.Fragment>
                                  <TIconButton
                                    title="Wish List"
                                    icon={WishListIcon}
                                    sx={{color: themeColors.red.palette.primary.main}}
                                    variant='outlined'
                                    fun={() => navigates(`/wishlist/${user.userId}`)}
                                  ></TIconButton>
                                  <ShoppingCart />
                                </React.Fragment>
                              : ''  
                            }
                          </React.Fragment>
                      }
                      {
                        !user ?
                        '' :
                        <MatxMenu
                          menuButton={
                            <UserMenu>
                              <Avatar src={user?user.avatar:''} sx={{ cursor: "pointer" }} />
                            </UserMenu>
                          }>
                          <StyledItem>
                            <Link to="/">
                              <Home />
                              <Span>Home</Span>
                            </Link>
                          </StyledItem>

                          <StyledItem>
                            <Link to={`/profile/${user.userId}`}>
                              <Person />
                              <Span>My Account</Span>
                            </Link>
                          </StyledItem>

                          <StyledItem>
                            <Settings />
                            <Span>Settings</Span>
                          </StyledItem>

                          <StyledItem onClick={logout}>
                            <PowerSettingsNew />
                            <Span>Logout</Span>
                          </StyledItem>
                        </MatxMenu>
                      }
                    </React.Fragment>
                  }
                </Box>
                <Box width={'100%'} mt={2.5} mb={1} sx={{display: { xs: 'block', md: 'flex' }}}>
                  {/* Large screens - md and up */}
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }} gap={'2em'}>
                  <Typography
                      sx={{
                        color: activeNav === 'home' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'home' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('home')}
                    >
                      Home
                    </Typography>
                    <Typography
                      sx={{
                        color: activeNav === 'product' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'product' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('product')}
                    >
                      Products
                    </Typography>
                    <Typography
                      sx={{
                        color: activeNav === 'track' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'track' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('track')}
                    >
                      Track Order
                    </Typography>
                    <Typography
                      sx={{
                        color: activeNav === 'about' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'about' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('about')}
                    >
                      About Us
                    </Typography>
                    <Typography
                      sx={{
                        color: activeNav === 'contact' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'contact' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('contact')}
                    >
                      Contact Us
                    </Typography>
                    <Typography
                      sx={{
                        color: activeNav === 'inquiries' ? themeColors.red.palette.primary.main : 'white',
                        fontWeight: 500,
                        fontSize: activeNav === 'inquiries' ? '18px' : '15px',
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate('inquiries')}
                    >
                      Inquiries
                    </Typography>
                  </Box>

                  {/* Small screens - xs to sm */}
                  <Box display={'flex'} gap={2}>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                      <StyledIconButton onClick={() => setSideMenuOn(!sideMenuOn)}>
                        <Menu sx={{padding: 0}}/>
                      </StyledIconButton>
                    </Box>
                    {/* for categery bar */}
                    {/* <Box justifyContent={'center'} alignItems={'center'} minWidth={'130px'} width={'40%'} maxWidth={'180px'} sx={{display: { xs: 'flex', md: 'none' }, background: 'gray', padding: '0 0.2em', borderRadius: 1, cursor: 'pointer', position: 'relative', left: '-10px'}} color={'white'}>
                      <StyledIconButton>
                        <Menu />
                      </StyledIconButton>
                      <Typography flex={1} ml={0.8}>All categories</Typography>
                      <ArrowDropDown />
                    </Box> */}
                    {/* for search bar */}
                    <Box flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'flex', md: 'none' }, background: 'white', borderRadius: 1, position: 'relative', left: '-10px'}}>
                      <TextField 
                        placeholder="Find your perfect match today!"
                        sx={{background: 'white', borderRadius: 1, flex: 1, height: '39.5px'}}
                        type="search"
                        focused
                        size="small"
                      />
                      <Box display={'flex'} sx={{position: 'relative', background: 'white'}} alignItems={'center'} mr={1} gap={1}>
                        <Tooltip title="Search"><SearchIcon sx={{cursor: 'pointer'}}/></Tooltip>
                        <Tooltip title="Search by image"><PhotoCamera sx={{cursor: 'pointer'}}/></Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>  
            </React.Fragment>     
          }

          {
            user && (role!=="USER" || role!=="GUEST") && 
              <Box>
                <Box display="flex">
                  <React.Fragment>
                    <StyledIconButton onClick={handleSidebarToggle}>
                      <Menu />
                    </StyledIconButton>
                  </React.Fragment>
                </Box>

                <Box display="flex" alignItems="center">
                  {/* <MatxSearchBox /> */}
                    <React.Fragment>
                      <NotificationProvider>
                        <NotificationBar />
                      </NotificationProvider>
                    </React.Fragment>
                    <MatxMenu
                      menuButton={
                        <UserMenu>
                          <Avatar src={user?user.avatar:''} sx={{ cursor: "pointer" }} />
                        </UserMenu>
                      }>
                      <StyledItem>
                        <Link to="/">
                          <Home />
                          <Span>Home</Span>
                        </Link>
                      </StyledItem>

                      <StyledItem>
                        <Link to={`/profile/${user.userId}`}>
                          <Person />
                          <Span>My Account</Span>
                        </Link>
                      </StyledItem>

                      <StyledItem>
                        <Settings />
                        <Span>Settings</Span>
                      </StyledItem>

                      <StyledItem onClick={logout}>
                        <PowerSettingsNew />
                        <Span>Logout</Span>
                      </StyledItem>
                    </MatxMenu>
                </Box>
              </Box>
          }
        </TopbarContainer>
      </TopbarRoot>
      { (!user || user==='USER' || user==='GUEST') && <SideMenu sideMenuOn={sideMenuOn} tab={tab} setTabs={setTabs}/>}
    </React.Fragment>  
  );
};

export default memo(Layout1Topbar);
