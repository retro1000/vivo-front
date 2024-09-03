
import React from "react";
import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { useState } from "react";

const Sidebar = () => {

  const [selected, setSelected] = useState(0)

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Manage My Account
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Address Book" />
        </ListItem>
        <ListItem>
          <ListItemText primary="My Payment Options" />
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        My Orders
      </Typography>
      <List>
        <ListItem button>
          <ListItemText primary="My Returns" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="My Cancellations" />
        </ListItem>
      </List>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        My WishList
      </Typography>
    </Box>
  );
};

export default Sidebar;
