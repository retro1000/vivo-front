import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { LoadingButton } from "@mui/lab";

const SignupForm = ({ loading, loginTitle, loginSubtitle }) => {

  const navigate = useNavigate()
  
  return (
    <Box
      sx={{
        width: "max-width",
        padding: "80px",
        maxWidth: '500px',
        minWidth: '400px',
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
        sx={{ marginTop: "20px" }}
      />
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
      />
      <TextField
        fullWidth
        label="Retype Password"
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
          <Typography variant="body2" sx={{width: '100%'}}>
            Agree to our <u>Terms of use</u> and <u>Privacy Policy</u>
          </Typography>
        }
        sx={{ width: '100%', mt: 3, alignSelf: "flex-start", display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start' }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography variant="body2">
            Subscribe to our monthly newsletter
          </Typography>
        }
        sx={{ alignSelf: "flex-start" }}
      />
      
      <Box mt={3} sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          loading={loading}
        > 
          Sign Up
        </LoadingButton>
      </Box>
      <Typography
        variant="body2"
        sx={{ marginTop: "15px", alignSelf: "flex-start", display: 'flex', gap: '0.3em', width: '100%' }}
      >
        Allready have an account? <Typography variant='body2' onClick={() => navigate('/login')} sx={{color: themeColors.red.palette.primary.main, cursor: 'pointer'}}>Sign In</Typography>
      </Typography>
    </Box>
  );
};

export default SignupForm;