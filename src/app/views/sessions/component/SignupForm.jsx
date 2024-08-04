import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const SignupForm = ({ loginTitle, loginSubtitle }) => {
  return (
    <Box
      sx={{
        width: "46%",
        padding: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: "#333", marginTop: "27px", fontWeight: 500 }}
      >
        {loginTitle}
      </Typography>
      <Typography variant="body1" sx={{ color: "rgba(102, 102, 102, 0.8)" }}>
        <br />
        {loginSubtitle}
      </Typography>
      <TextField
        fullWidth
        label="Email address"
        variant="outlined"
        margin="normal"
        sx={{ marginTop: "46px" }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
      />
      <Typography
        variant="caption"
        sx={{ color: "#666", alignSelf: "flex-start" }}
      >
        Use 8 or more characters with a mix of letters, numbers & symbols
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            Agree to our <u>Terms of use</u> and <u>Privacy Policy</u>
          </Typography>
        }
        sx={{ marginTop: "40px", alignSelf: "flex-start" }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Subscribe to our monthly newsletter"
        sx={{ alignSelf: "flex-start" }}
      />
      
      <Box sx={{display: 'flex',
        justifyContent: 'center', minWidth:350 }}>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
      > 
        Sign Up
      </Button>
      </Box>
      <Typography
        variant="body2"
        sx={{ marginTop: "10px", alignSelf: "flex-start" }}
      >
        Don't have an account? <a href= "#">Sign Up</a>
      </Typography>
    </Box>
  );
};

export default SignupForm;