import { Box, List, ListItemButton, ListItemText, Slide, Tab, Tabs } from "@mui/material";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { memo } from "react";
import TabPanel from "./TabPanel";
import useLayout from "app/hooks/useLayout";
import { useState } from "react";
import { MenuList } from "app/components";

const categorie = [
  {
    id: 1,
    name: "Electronics",
    subCategories: [
      {
        id: 11,
        name: "Mobile Phones",
        subCategories: [
          { id: 111, name: "Smartphones", subCategories: [] },
          { id: 112, name: "Feature Phones", subCategories: [] },
        ],
      },
      {
        id: 12,
        name: "Laptops",
        subCategories: [
          { id: 121, name: "Gaming Laptops", subCategories: [] },
          { id: 122, name: "Ultrabooks", subCategories: [] },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    subCategories: [
      {
        id: 21,
        name: "Men",
        subCategories: [
          { id: 211, name: "Shirts", subCategories: [] },
          { id: 212, name: "Jeans", subCategories: [] },
        ],
      },
      {
        id: 22,
        name: "Women",
        subCategories: [
          { id: 221, name: "Dresses", subCategories: [] },
          { id: 222, name: "Tops", subCategories: [] },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Accessories",
    subCategories: [
      { id: 31, name: "Watches", subCategories: [] },
      { id: 32, name: "Bags", subCategories: [] },
    ],
  },
];

const SideMenu = memo(({ allCategories, navigates, activeNav, navigate, loading }) => {

    const { categories, sideMenuOn } = useLayout();
console.log(categories)
    const [tab, setTabs] = useState(0)

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
                      <ListItemText primary={'Shop'} />
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
            <MenuList menuItems={categories.values}/>
          </TabPanel>
        </Box>
      </Slide>
    ); 
  })

  export default SideMenu