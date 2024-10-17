
import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const SortButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
        sx={{
          borderRadius: 2,
          // backgroundColor: "#fff",
          color: "#000",
          p: "10px 12px 10px 20px",
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
        }}
      >
        Sort by popularity
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} sx={{width: anchorEl ? `${anchorEl.getBoundingClientRect().width}px` : 'auto'}}>
        <MenuItem onClick={handleClose}>Popularity</MenuItem>
        <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
        <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
        <MenuItem onClick={handleClose}>Newest</MenuItem>
      </Menu>
    </>
  );
};

export default SortButton;
