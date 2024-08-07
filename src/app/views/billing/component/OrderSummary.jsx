
import React from "react";
import { Typography, Grid, Divider, Button, TextField ,  FormControlLabel, 
  Radio,
  RadioGroup,
  Box,} from "@mui/material";

  const formatToLKR = (number) => {
    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
  }

const OrderSummary = ({ orderList, subTotal, shipping }) => {
  return (
    <Grid container spacing={2}>
      {
        orderList.map((order, index) => (
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} mb={1}>
            <Grid item xs={12} sm={6} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} flexDirection={'row'} gap={'0.5em'} ml={1.5}>
              <img alt={order.name} src={order.img} style={{width: '70px', height: '70px', borderRadius: '5px'}}/>
              <Typography>{order.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography align="right">{formatToLKR(order.amount)}</Typography>
            </Grid>
          </Box>
        ))
      }
      <Grid item xs={12} mt={-1.5}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">{formatToLKR(subTotal)}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography>Shipping:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography align="right">{shipping || shipping===0 ? 'Free' : formatToLKR(shipping)}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6">Total:</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" align="right">
          {formatToLKR(subTotal+(shipping || shipping===0?0:shipping))}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Coupon Code" variant="outlined" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          Apply Coupon
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment Method
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RadioGroup defaultValue="bank" name="payment-method" color="primary"        >
          <FormControlLabel value="bank" control={<Radio />} label={
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'0.4em'}>
              <Typography>Credit/Debit card</Typography>
              <Box display={'flex'} gap={'0.2em'} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'}>
                <img src="/assets/images/logos/mc_sym_debit_pos_46_1x.png" alt="master" />
                <img src="/assets/images/logos/visa-logo-svgrepo-com.png" alt="visa" style={{width: '30px', height: '20px'}}/>
                </Box>
            </Box>
            }
          />
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Cash on delivery"
          />
        </RadioGroup>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" fullWidth>
          Place Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
