
import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

const ProfileForm = () => {
  return (
    <form>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Password Changes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button 
          variant="outlined"
          color="secondary"
          >Cancel</Button>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
