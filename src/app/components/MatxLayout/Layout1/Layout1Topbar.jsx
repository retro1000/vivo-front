import { memo, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  Typography
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, MatxSearchBox, TButton, TIconButton } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";

import { topBarHeight } from "app/utils/constant";

import {
  Home,
  Menu,
  Person,
  Settings,
  WebAsset,
  MailOutline,
  StarOutline,
  PowerSettingsNew
} from "@mui/icons-material";
import React from "react";

import WishListIcon from '@mui/icons-material/Favorite'
import { themeColors } from "app/components/MatxTheme/themeColors";
import { useEffect } from "react";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "6px",
  paddingLeft: 12,
  paddingRight: 12,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
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

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user, role } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const location = useLocation()

  useEffect(() => {
    switch(location.pathname){
      case '/' || undefined:
        setActiveNav('home')
        break;
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
    height: !user || role==='USER' ? 80 : topBarHeight,
    // boxShadow: themeShadows[8],
    transition: "all 0.3s ease",
    background: 'white'
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
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          {
            !user || role==='USER' ?  
              <React.Fragment>
                <Box
                  onClick={()=>navigate("home")}
                  component="img"
                  src="/assets/images/logos/HH01.jpg"
                  alt="Logo"
                  sx={{ width: '60px', height: '60px', borderRadius: 1, cursor:"pointer" }}
                >
                </Box>
                <Box display='flex' alignItems='center' gap='1.5em' marginLeft='3em'>
                  <Typography color={activeNav==='home'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='home'?'18px':'15px',cursor: 'pointer'}} onClick={()=>navigate("home")}>Home</Typography>
                  <Typography color={activeNav==='product'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='product'?'18px':'15px', cursor: 'pointer'}} onClick={()=>navigate("product")}>Products</Typography>
                  <Typography color={activeNav==='track'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='track'?'18px':'15px',cursor: 'pointer'}} onClick={()=>navigate("track")}>Track Order</Typography>
                  <Typography color={activeNav==='about'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='about'?'18px':'15px', cursor: 'pointer'}} onClick={()=>navigate("about")}>About Us</Typography>
                  <Typography color={activeNav==='contact'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='contact'?'18px':'15px', cursor: 'pointer'}} onClick={()=>navigate("contact")}>Contact Us</Typography>
                  <Typography color={activeNav==='inquiries'?themeColors.red.palette.primary.main:''} style={{fontWeight: '500', fontSize: activeNav==='inquiries'?'18px':'15px', cursor: 'pointer'}} onClick={()=>navigate("inquiries")}>Inquiries</Typography>
                </Box>
              </React.Fragment> :
              <React.Fragment>
                <StyledIconButton onClick={handleSidebarToggle}>
                  <Menu />
                </StyledIconButton>

                <IconBox>
                  <StyledIconButton>
                    <MailOutline />
                  </StyledIconButton>

                  <StyledIconButton>
                    <WebAsset />
                  </StyledIconButton>

                  <StyledIconButton>
                    <StarOutline />
                  </StyledIconButton>
                </IconBox>
              </React.Fragment>
          }
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          {
            !user ?
              <React.Fragment>
                <Box display='flex' gap='0.8em'>
                  <TButton
                    title='Login'
                    label='Log in'
                    variant="outlined"
                    sx={{border: `0.1em solid ${themeColors.red.palette.secondary.main}`, color: themeColors.red.palette.secondary.main}}
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
                  {/* <Hidden xsDown>
                    <Span>
                      Hi <strong>{user?user.username:''}</strong>
                    </Span>
                  </Hidden> */}
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
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);
