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
  Tab,
  List,
  ListItemButton,
  ListItemText,
  lighten
} from "@mui/material";

import { NotificationProvider } from "app/contexts/NotificationContext";

import useAuth from "app/hooks/useAuth";
import useSettings from "app/hooks/useSettings";
import { useAxios } from "app/hooks/useAxios";
import { useFormatter } from "app/hooks/useFormatter";

import { Span } from "app/components/Typography";
import ShoppingCart from "app/components/ShoppingCart";
import { MatxMenu, TButton, TIconButton, MenuList } from "app/components";
import { NotificationBar } from "app/components/NotificationBar";

import { topBarHeight } from "app/utils/constant";

import {
  Home,
  Person,
  Settings,
  Menu,
  PowerSettingsNew,
  ArrowDropUp
} from "@mui/icons-material";

import WishListIcon from '@mui/icons-material/Favorite'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import PhotoCamera from '@mui/icons-material/CameraAlt'
import SearchIcon from '@mui/icons-material/Search'

import { themeColors } from "app/components/MatxTheme/themeColors";
import { useRef } from "react";

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

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '4px', // Adjust the width of the scrollbar
  },
  '&::-webkit-scrollbar-track': {
    background: '#333', // Background of the scrollbar track
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white', // Color of the scrollbar thumb
    borderRadius: '8px', // Rounded corners
    border: '2px solid transparent', // Adds a little padding between the thumb and track
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#777', // Thumb color on hover
  }
}

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
        <Box 
          sx={{ 
            p: 1, 
            mt: 1,
            maxHeight: '76dvh', 
            height: '90dvh', 
            overflowY: 'auto', 
            background: '#191919',
            ...scrollBar
    }} >
          {children}
        </Box>
      )}
    </div>
  );
})

const categories = [
  {
    id: 1,
    name: 'Electronics',
    subCategories: [
      {
        id: 11,
        name: 'Mobile Phones',
        subCategories: [
          { id: 111, name: 'Smartphones', subCategories: [] },
          { id: 112, name: 'Feature Phones', subCategories: [] }
        ]
      },
      {
        id: 12,
        name: 'Laptops',
        subCategories: [
          { id: 121, name: 'Gaming Laptops', subCategories: [] },
          { id: 122, name: 'Ultrabooks', subCategories: [] }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Clothing',
    subCategories: [
      {
        id: 21,
        name: 'Men',
        subCategories: [
          { id: 211, name: 'Shirts', subCategories: [] },
          { id: 212, name: 'Jeans', subCategories: [] }
        ]
      },
      {
        id: 22,
        name: 'Women',
        subCategories: [
          { id: 221, name: 'Dresses', subCategories: [] },
          { id: 222, name: 'Tops', subCategories: [] }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Accessories',
    subCategories: [
      { id: 31, name: 'Watches', subCategories: [] },
      { id: 32, name: 'Bags', subCategories: [] }
    ]
  }
];

const searchResult = [
  {
    type: 'Electronics',
    count: 2,
    result: [
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'Smartphone X10',                 // Product name
        price: 150000,                          // Original price
        discount: 130000                        // Discounted price (optional)
      },
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes   Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes Men Shoes 2024 Casual Fashion Outdoor Breatable Comfortable Male Sneakers Mesh Wear-resistant Student Running Training Shoes',
        price: 25000
      }
    ]
  },
  {
    type: 'Furniture',
    count: 1,
    result: [
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'Modern Chair',
        price: 12000
      }
    ]
  },
  {
    type: 'Clothing',
    count: 3,
    result: [
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'Leather Jacket',
        price: 50000,
        discount: 45000
      },
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'Jeans',
        price: 8000
      },
      {
        img: 'https://www.cucoo.lk/wp-content/uploads/2024/01/Men-Shoes-2023-Casual-Fashion-Outdoor-Breatable-Comfortable-Male-Sneakers-Mesh-Wear-resistant-Student-Running-Training-768x768.webp',  // Image URL
        name: 'T-Shirt',
        price: 3000
      }
    ]
  }
];





const getAllCategories = async (setAllCategories, setLoading, api) => {

  setLoading(true)
  await api.get('/category/view')
    .then(response => {
      if(response.status===200){
        setAllCategories(response.data)
      }
    })
    .catch(error => {

    })
    .finally(() => setLoading(false))
}

const AllCategoryDropDown = memo(({ ref, dropDownOn, allCategories, setAllCategories, loading, setLoading, menuPosition }) => {

  const { api } = useAxios();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  if(!loading && (!allCategories || allCategories.length===0)){
    getAllCategories(setAllCategories, setLoading, api)
  }

  return !isMdScreen && (
    <div style={{display: {sx: 'none', md: 'flex'}}}>
      <Slide direction="down" in={dropDownOn} mountOnEnter unmountOnExit ref={ref}>
        <Box 
          sx={{
            display: {sx: 'none', md: 'flex'},
            zIndex: 99, 
            background: 'gray', 
            height: 'max-content',
            maxHeight: '500px',
            // minHeight: '300px',
            position: 'fixed',
            boxShadow: 8,
            borderRadius: 1,
            overflowY: 'auto',
            ...scrollBar,
            ...menuPosition

          }}
        >
          <MenuList menuItems={allCategories} bgcolor='gray' hoverColor='white'/>
        </Box>
      </Slide>
    </div>
  )
})

const SearchBarDropDown = ({ ref, searchBarOn, navigates, searchRes, loading, setLoading, searchBarMenuPosition }) => {

  const { formatToLKR } = useFormatter()

  return searchBarOn && (
    <Stack 
      ref={ref}
      zIndex={199} 
      sx={{
        position: 'absolute', 
        background: 'white', 
        borderRadius: 1, 
        overflowY: 'auto', 
        maxHeight: '400px', 
        boxShadow: 4, 
        ...searchBarMenuPosition,
         ...{
          ...scrollBar,
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray',
          }
        }
      }}
    >
      { 
        searchRes && searchRes.length>0 && searchRes.map(res => (

          res.type && res.count && res.count>0 && res.result && res.result.length>0 && (
            <Stack>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={'100%'} p={2} sx={{background: lighten(themeColors.red.palette.primary.main, 0), color: 'white'}}>
                <Typography variant="body2" fontSize={'16px'}>{res.type}</Typography>
                <Typography variant="body2">{`${res.count} results found`}</Typography>
              </Box>
              {
                res.result.map(resEl => (
                  <Tooltip title={resEl.name||''} placement="top-end">
                    <Box width={'100%'} sx={{cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(240, 237, 237, 0.8)'}}} display={'flex'} padding={1} gap={1} alignItems={'flex-start'}>
                      {
                        resEl.img && 
                        <Box
                          component="img"
                          src={resEl.img}
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '0.3em',
                            flex: '0 0 auto',
                          }}
                        />
                      }
                      <Stack display={'flex'} flex={1} gap={1}>
                        {resEl.name && <Typography variant="body2" flexWrap={'wrap'}>{resEl.name}</Typography>}
                        {
                          resEl.price && 
                            <Box display={'flex'} gap={1} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'}>
                              <Typography variant="body2" sx={{textDecoration: resEl.discount?'line-through':'none'}}>{formatToLKR(resEl.price)}</Typography>
                              {resEl.discount && <Typography variant="body2" color={themeColors.red.palette.primary.main}>{formatToLKR(resEl.discount)}</Typography>}
                            </Box>
                        }
                      </Stack>
                    </Box>
                  </Tooltip>
                ))
              }
            </Stack>
          )
        ))  
      }
    </Stack>
  )
}

const SideMenu = memo(({ allCategories, sideMenuOn, tab, setTabs, navigates, activeNav, navigate, setAllCategories, loading, setLoading }) => {

  const { api } = useAxios();

  if(!loading && (!allCategories || allCategories.length===0)){
    getAllCategories(setAllCategories, setLoading, api)
  }

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
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: '#191919', color: 'white' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
                <ListItemButton 
                  onClick={()=>navigate('home')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'home' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'Home'} />
                </ListItemButton>
                <ListItemButton 
                  onClick={()=>navigate('product')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'product' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'Products'} />
                </ListItemButton>
                <ListItemButton 
                  onClick={()=>navigate('track')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'track' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'Track Orders'} />
                </ListItemButton>
                <ListItemButton 
                  onClick={()=>navigate('about')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'about' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'About Us'} />
                </ListItemButton>
                <ListItemButton 
                  onClick={()=>navigate('contact')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'contact' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'Conatct Us'} />
                </ListItemButton>
                <ListItemButton 
                  onClick={()=>navigate('inquiries')}
                  sx={{
                    '&:hover': { 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    },
                    ...(activeNav === 'inquiries' && {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: themeColors.red.palette.primary.main,
                    })
                  }}
                >
                    <ListItemText primary={'Inquiries'} />
                </ListItemButton>
          </List>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <MenuList menuItems={allCategories}/>
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

  const [dropDownOn, setDropDownOn] = useState(false)

  const [searchBarOn, setSearchBarOn] = useState(true)

  const [allCategories, setAllCategories] = useState(categories)

  const [categoryLoading, setCategoryLoading] = useState(false)

  const [searchLoading, setSearchLoading] = useState(false)

  const [searchRes, setSearchRes] = useState(searchResult)

  const [tab, setTabs] = useState(0)

  const [allCategoryDropDownMenuPosition, setAllCategoryDropDownMenuPosition] = useState({ top: 0, left: 0 })

  const categoryButtonRef = useRef(null);

  const [searchBarDropDownMenuPosition, setsearchBarDropDownMenuPosition] = useState({ top: 0, left: 0 })

  const searchBarRef1 = useRef(null);
  const searchBarRef2 = useRef(null);
  const searchBarContainerRef = useRef(null);
  const categoryDropDownContainerRef = useRef(null);

  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (categoryButtonRef.current) {
        const rect = categoryButtonRef.current.getBoundingClientRect();
  
        // Update the position on resize
        setAllCategoryDropDownMenuPosition({
          top: rect.bottom + 4, // Dropdown starts just below the button
          left: rect.left,      // Align horizontally with the button
          width: rect.width     // Match dropdown width with button width
        });
      }
    };
  
    if (categoryButtonRef.current) {
      // Set initial position
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [dropDownOn]);

  useEffect(() => {
    const handleResize = () => {
      var rect;
      if (!searchBarRef1.current || !searchBarRef2.current) return
      
      rect = (window.innerWidth<900?searchBarRef2:searchBarRef1).current.getBoundingClientRect();
      // }else if(searchBarRef2.current){
      //   rect = searchBarRef2.current.getBoundingClientRect();
      
      if(rect){
        // Update the position on resize
        setsearchBarDropDownMenuPosition({
          top: rect.bottom + 4, // Dropdown starts just below the button
          left: rect.left,      // Align horizontally with the button
          width: rect.width     // Match dropdown width with button width
        });
      }
    };
  
    if (searchBarRef1.current || searchBarRef2.current) {
      // Set initial position
      handleResize();
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [searchRes]);
  

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

  useEffect(() => {
    const handleClick = (event) => {
      console.log(searchBarRef1.current,  searchBarRef2.current , searchBarContainerRef.current ,categoryDropDownContainerRef.current)

      if(!searchBarRef1.current || !searchBarRef2.current || !searchBarContainerRef.current || !categoryDropDownContainerRef.current) return

      if (!searchBarContainerRef.current.contains(event.target) && (!searchBarRef1.current.contains(event.target) || !searchBarRef2.current.contains(event.target)) && searchBarOn) {
        setSearchBarOn(false)
      } else if(!categoryDropDownContainerRef.current.contains(event.target) && dropDownOn){
        setDropDownOn(false)
      }

      if(sideMenuOn && (searchBarOn || dropDownOn)) setSideMenuOn(false)
    };
  
      // Add event listener for window resize
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleClick);
  
      // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleClick);
    };
  }, [])

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
                      <Box 
                        justifyContent={'center'} 
                        alignItems={'center'} 
                        minWidth={'170px'} 
                        width={'40%'} 
                        maxWidth={'220px'} 
                        zIndex={100}
                        sx={{
                          display: { xs: 'none', md: 'flex' }, 
                          background: 'gray', 
                          padding: '0 0.2em', 
                          borderRadius: 1, 
                          cursor: 'pointer'
                        }}
                        color={'white'}
                        onClick={()=>setDropDownOn(!dropDownOn)}
                        ref={categoryButtonRef}
                      >
                        <StyledIconButton>
                          <Menu />
                        </StyledIconButton>
                        <Typography flex={1}>All Categories</Typography>
                        {!dropDownOn?<ArrowDropDown />:<ArrowDropUp />}
                      </Box>
                      {/* for search bar */}
                      <Box ref={searchBarRef1} flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'none', md: 'flex' }, background: 'white', borderRadius: 1, minWidth: '190px'}}>
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
                                sx={{background: `white`, color: 'black'}}
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
                    {/* for search bar */}
                    <Box ref={searchBarRef2} flex={1} display={'flex'} alignItems={'center'} sx={{display: { xs: 'flex', md: 'none' }, background: 'white', borderRadius: 1, position: 'relative', left: '-10px'}}>
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
      { (!user || user==='USER' || user==='GUEST') && <SideMenu sideMenuOn={sideMenuOn} tab={tab} setTabs={setTabs} navigates={navigates} activeNav={activeNav} navigate={navigate} allCategories={allCategories} setAllCategories={setAllCategories} loading={categoryLoading} setLoading={setCategoryLoading}/>}
      { (!user || user==='USER' || user==='GUEST') && <AllCategoryDropDown ref={categoryDropDownContainerRef} dropDownOn={dropDownOn} navigates={navigates} activeNav={activeNav} navigate={navigate} allCategories={allCategories} setAllCategories={setAllCategories} loading={categoryLoading} setLoading={setCategoryLoading} menuPosition={allCategoryDropDownMenuPosition}/>}
      <SearchBarDropDown ref={searchBarContainerRef} searchBarOn={searchBarOn} navigates={navigates} searchRes={searchRes} loading={searchLoading} setLoading={setSearchLoading} searchBarMenuPosition={searchBarDropDownMenuPosition}/>
    </React.Fragment>  
  );
};

export default memo(Layout1Topbar);
