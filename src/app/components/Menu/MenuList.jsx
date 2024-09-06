import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { themeColors } from '../MatxTheme/themeColors';

export default function Menu({ menuItems }) {

  const [open, setOpen] = useState({});

  const navigate = useNavigate()

  const handleClick = (menu) => {
    if(menu.subCategories && menu.subCategories.length>0){
      const newList = {...open}
      newList[menu.id] = !(newList[menu.id] && newList[menu.id])
      setOpen(newList)
    }else navigate()
    
  };

  const createList = (menu) => {
    
    return (
        <>
            <ListItemButton 
              key={menu.id} 
              onClick={()=>handleClick(menu)}
              sx={{
                '&:hover': { 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', // Change background color on hover
                  color: themeColors.red.palette.primary.main, // Change text color on hover (optional)
                },
              }}
            >
                <ListItemText primary={menu.name} />
                {menu.subCategories && menu.subCategories.length>0 && (open[menu.id] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            {
                menu.subCategories && menu.subCategories.length > 0 && (
                    <Collapse in={open[menu.id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{pl:1.5}}>
                            {menu.subCategories.map((subCategory) => createList(subCategory))}
                        </List>
                    </Collapse>
            )
            }
        </>
    )
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: '#191919', color: 'white' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
        {
            menuItems && menuItems.length>0 && menuItems.map((menu, index) => (
                createList(menu)
            ))
        }
      
      {/* <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse> */}
    </List>
  );
}
