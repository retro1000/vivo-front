
import React from "react";
import { TextField, Button, Grid } from "@mui/material";


const CouponForm = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField fullWidth label="Coupon Code" variant="outlined" />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ height: "100%"}}
        >
          Apply Coupon
        </Button>
      </Grid>
    </Grid>
  );
};

export default CouponForm;
