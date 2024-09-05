import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

const BillingForm = () => {
  return (
    <Grid container sx={{maxWidth: '600px'}} spacing={3} mb={4}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          autoComplete="given-name"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          fullWidth
          autoComplete="given-name"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}  sm={6}>
        <TextField
          id="company"
          name="company"
          label="Company Name"
          fullWidth
          autoComplete="organization"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address1"
          name="address1"
          label="Street Address"
          fullWidth
          autoComplete="shipping address-line1"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="address2"
          name="address2"
          label="Apartment, floor, etc. (optional)"
          fullWidth
          autoComplete="shipping address-line2"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="Town/City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="phone"
          name="phone"
          label="Phone Number"
          fullWidth
          autoComplete="tel"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="email"
          name="email"
          label="Email Address"
          fullWidth
          autoComplete="email"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              // borderRadius: 2,
              backgroundColor: '#f5f5f5',
              // "& fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&:hover fieldset": {
              //   borderColor: 'transparent',
              // },
              // "&.Mui-focused fieldset": {
              //   borderColor: 'transparent',
              // },
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="primary" name="saveInfo" value="yes" />}
          label="Save this information for faster check-out next time"
        />
      </Grid>
    </Grid>
  );
};

export default BillingForm;
