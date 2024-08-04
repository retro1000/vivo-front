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

const LoginForm = ({ loading, loginTitle, loginSubtitle, onClick, username, setUsername, password, setPassword, remember, setRemember }) => {
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
      <form onSubmit={onClick}>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          sx={{ marginTop: "46px" }}
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
        {/* <Typography
          variant="caption"
          sx={{ color: "#666", alignSelf: "flex-start" }}
        >
          Use 8 or more characters with a mix of letters, numbers & symbols
        </Typography> */}
        {/* <FormControlLabel
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
        /> */}
        
        <Box sx={{display: 'flex',
          justifyContent: 'center'}}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            // onClick={onClick}
            loading={loading}
            // sx={{
            //   marginTop: "40px",
            //   borderRadius: "32px",
            //   padding: "16px",
            //   fontSize: "22px",
            //   fontWeight: 500,
            //   width: "200px",
            // }}
          >
            Log In
          </LoadingButton>
        </Box>
      </form>
      <Typography
        variant="body2"
        sx={{ marginTop: "10px", alignSelf: "flex-start" }}
      >
        Don't have an account? <a href= "/signup">Sign Up</a>
      </Typography>
    </Box>
  );
};

export default LoginForm;
