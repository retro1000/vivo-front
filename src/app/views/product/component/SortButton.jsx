
import React from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SortIcon from "@mui/icons-material/Sort";
import { themeColors } from "app/components/MatxTheme/themeColors";

const options = [
  { value: 'POPULAR', label: 'Popularity' },
  { value: 'PRICE_ACS', label: 'Price: Low to High' },
  { value: 'PRICE_DESC', label: 'Price: High to Low' },
  { value: 'NEWEST', label: 'Newest' },
];

const SortButton = ({ sort, handleSort }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    value!==sort && handleSort(value);
    handleClose();
  };

  return (
    <>
      <IconButton
        variant="outlined"
        color="primary"
        onClick={handleClick}
        sx={{
          border: `1px solid ${themeColors.red.palette.primary.main}`,  // Simulating outlined variant
          borderRadius: 2,
          color: "#000",
          width: '220px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'flex',  // Flex layout for alignment
          justifyContent: 'space-between',  // Ensures space between text and end icon
          alignItems: 'center',  // Vertically centers the content
          backgroundColor: '#fff',
        }}
      >
        {/* Start Icon */}
        <SortIcon sx={{ mr: 1 }} />  {/* Add margin-right to give space from text */}

        {/* Text */}
        <Typography variant="body2" fontSize={'13px'} sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {`Sort by ${options.find(val => val.value === sort)?.label}`}
        </Typography>

        {/* End Icon */}
        <ArrowDropDownIcon sx={{ ml: 'auto' }} />  {/* Push to the far right */}
      </IconButton>
      <Menu 
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleClose} 
        sx={{ 
          '& .MuiPaper-root': {  // Target the paper that wraps the menu items
            width: '219px',
            mt: 0.5       // Set the width of the Menu
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            sx={{width: '100%'}}
            key={option.value}
            onClick={() => handleMenuItemClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={handleClose}>Popularity</MenuItem>
        <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
        <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
        <MenuItem onClick={handleClose}>Newest</MenuItem> */}
      </Menu>
    </>
  );
};

export default SortButton;
