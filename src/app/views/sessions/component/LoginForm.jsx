import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { themeColors } from "app/components/MatxTheme/themeColors";

const LoginForm = ({ loading, loginTitle, loginSubtitle, onClick, username, setUsername, password, setPassword, remember, setRemember }) => {

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
      <form onSubmit={onClick}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          sx={{ marginTop: "20px" }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant="body2">
              Remember me
            </Typography>
          }
          sx={{ alignSelf: "flex-start" }}
        />
        
        <Box mt={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            loading={loading}
          >
            Sign In
          </LoadingButton>
        </Box>
      </form>
      <Typography
        variant="body2"
        sx={{ marginTop: "10px", alignSelf: "flex-start", display: 'flex', gap: '0.3em', width: '100%' }}
      >
        Don't have an account? <Typography variant='body2' onClick={() => navigate('/signup')} sx={{color: themeColors.red.palette.primary.main, cursor: 'pointer'}}>Sign Up</Typography>
      </Typography>
    </Box>
  );
};

export default LoginForm;
