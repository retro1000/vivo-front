import React from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { useFormik } from "formik";
import * as Yup from 'yup'

const LoginForm = ({ loading, loginTitle, loginSubtitle, onClick }) => {

  const renderLabel = (labelText, req) => (
    <Box component="span" display="flex" alignItems="center">
      <Typography variant="body1" component="span" fontSize={"14px"}>
        {labelText}
      </Typography>
      {req && <Typography variant="body1" component="span" color="error" fontSize={"14px"} marginLeft={0.5}>
        *
      </Typography>}
    </Box>
  );


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false, // Add remember to initialValues
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username cannot be empty.'),
      password: Yup.string()
        .required('Password cannot be empty.'),
      remember: Yup.boolean()
    }),
    onSubmit: (values) => {
      onClick(values)
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          label={"Username *"}
          variant="outlined"
          margin="normal"
          sx={{ marginTop: "20px" }}
          FormHelperTextProps={{
            sx: { marginLeft: 0.2 },  // Adjust the left margin
          }}
          InputLabelProps={{
            sx: { 
              width: 'fit-content'
            },
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          label={"Password *"}
          variant="outlined"
          margin="normal"
          FormHelperTextProps={{
            sx: { marginLeft: 0.2 },  // Adjust the left margin
          }}
          InputLabelProps={{
            sx: { 
              width: 'fit-content'
            },
          }}
        />
         <FormControlLabel
          control={
            <Checkbox
              size="small"
              name="remember"
              checked={formik.values.remember}
              onChange={formik.handleChange}
            />
          }
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
            disabled={!(formik.isValid && formik.dirty)}
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
