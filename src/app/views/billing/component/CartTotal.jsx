
import React from "react";
import { Typography, Button, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartTotal = ({ subtotal, shipping, total }) => {

  const navigate = useNavigate()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Cart Total</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right">{subtotal}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography>Shipping:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right">{shipping}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography>Total:</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right">{total}</Typography>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
        <Button variant="contained" color="primary" onClick={()=>navigate("/checkout")} sx={{maxWidth: '200px'}}>
          Proceed to checkout
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartTotal;
