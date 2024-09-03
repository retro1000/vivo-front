import React from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { LoadingButton } from "@mui/lab";

import { useFormik } from "formik";
import * as Yup from 'yup'

const initialState = {
  email: "",
  username: "",
  password: "",
  newsletter: true,
  terms: true,
  retypePassword: ""
}


const SignupForm = ({ loading, loginTitle, loginSubtitle, onClick, errorData, submitDisable, setErrorData }) => {
  console.log(errorData)

  const renderLabel = (labelText, req) => (
    <Box component="span" display="inline-flex"  alignItems="center">
      <Typography variant="body1" component="span" fontSize={'14px'}>
        {labelText}
      </Typography>
      {req && <Typography variant="body1" component="span" color="error" marginLeft={0.5} fontSize={'14px'}>
        *
      </Typography>}
    </Box>
  );

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address entered.')
        .required('Email address cannot be empty.'),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters.')
        .max(20, 'Username must be at most 20 characters.')
        .test(
          'is-secure', 
          'Username can only contain letters, numbers, and underscore.',
          value => /^[a-zA-Z0-9_]+$/.test(value))
        .required('Username cannot be empty.'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters.')
        .max(12, 'Password must be at most 12 characters.')
        .test(
          'is-secure', 
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
          value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value))
        .required('Password cannot be empty.'),
      retypePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords doesn't match.")
        .required('Password cannot be empty.'),
      terms: Yup.boolean()
        .oneOf([true], '')
        .required(''),
      newsletter: Yup.boolean(),
    }),
    onSubmit: (values) => {
      const { retypePassword, ...newObject } = values;
      onClick(newObject)
    },
  });

  // Handle field change and remove the error if the input is corrected
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Trigger formik change
    formik.handleChange(e);

    // Clear manual error when field is being changed
    setErrorData(prevErrors => {delete prevErrors[name]; return prevErrors});

  };

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
          type="email"
          name="email"
          value={formik.values.email}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(errorData.email) || (formik.touched.email && Boolean(formik.errors.email))}
          helperText={(errorData && Boolean(errorData.email) && errorData.email) || (formik.touched.email && formik.errors.email)}
          label={"Email address *"}
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
          type="text"
          name="username"
          value={formik.values.username}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(errorData.username) || (formik.touched.username && Boolean(formik.errors.username))}
          helperText={(errorData && Boolean(errorData.username) && errorData.username) || (formik.touched.username && formik.errors.username)}
          label={"Username *"}
          variant="outlined"
          margin="normal"
          FormHelperTextProps={{
            sx: { marginLeft: 0.2 },  // Adjust the left margin
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          value={formik.values.password}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(errorData.password) || (formik.touched.password && Boolean(formik.errors.password))}
          helperText={(errorData && Boolean(errorData.password) && errorData.password) || (formik.touched.password && formik.errors.password)}
          label={"Password *"}
          variant="outlined"
          margin="normal"
          FormHelperTextProps={{
            sx: { marginLeft: 0.2 },  // Adjust the left margin
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="retypePassword"
          value={formik.values.retypePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.retypePassword && Boolean(formik.errors.retypePassword)}
          helperText={formik.touched.retypePassword && formik.errors.retypePassword}
          label={"Retype password *"}
          variant="outlined"
          margin="normal"
          FormHelperTextProps={{
            sx: { marginLeft: 0.2 },  // Adjust the left margin
          }}
        />
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={formik.values.terms} 
              onChange={formik.handleChange} 
              name="terms" 
              color="primary"
              size="small"
            />
          }
          label={
            <Typography variant="body2" sx={{width: '100%'}}>
              Agree to our <u>Terms of use</u> and <u>Privacy Policy</u>
            </Typography>
          }
          sx={{ width: '100%', mt: 3, alignSelf: "flex-start", display: 'flex', justifyContent: 'flex-start', alignContent: 'flex-start' }}
        />
        {formik.touched.terms && Boolean(formik.errors.terms) && (
          <Typography variant="caption" color="error">
            {formik.errors.terms}
          </Typography>
        )}

        <FormControlLabel
          control={
            <Checkbox 
              checked={formik.values.newsletter} 
              onChange={formik.handleChange} 
              name="newsletter"
              size="small"
            />
          }
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
            disabled={submitDisable || Object.entries(errorData).length!==0 || !(formik.isValid && formik.dirty)}
          > 
            Sign Up
          </LoadingButton>
        </Box>
      </form>
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