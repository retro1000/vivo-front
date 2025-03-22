import React, { useState } from "react";
import { Typography, TextField, Button, Divider, Box, Grid } from "@mui/material";
import { useFormatter } from "app/hooks/useFormatter";
import { useAxios } from "app/hooks/useAxios";

const textStyles = {
  fontSize: '15px',
}

const OrderSummary = ({ products, deliveryService, district }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCodes, setAppliedCodes] = useState([]);

  const { apiNonAuth, api } = useAxios();

  // Sample promo codes (You can replace with backend API validation)
  const promoCodes = {
    "SAVE10": 10,  // 10% discount
    "FREESHIP": 5, // Flat 5 discount
    "WELCOME20": 20 // 20% discount
  };

  const ratePerKilo = deliveryService?.ratePerKilo || undefined;

  const shippingRate =deliveryService?.districts.find(d => d.districtName === district)?.rate || undefined

  let subtotal = 0;
  let orderWeight = 0;
  let discountedAmount = 0;
  let deliveryFee = undefined;

  products && products.length > 0 && products.forEach(product => {
    subtotal += product.price * product.quantity;
    orderWeight += product.weight * product.quantity;
  })

  if(shippingRate!==undefined && ratePerKilo!==undefined) deliveryFee = shippingRate + ((orderWeight > 1) ? (Math.ceil(orderWeight - 1) * ratePerKilo) : 0);

  const handlingFee = 2.50;
  const taxRate = 0.08; // 8% tax
  const taxAmount = subtotal * taxRate;

  const total = subtotal + taxAmount + (deliveryFee || 0) + handlingFee - discountedAmount;

  const applyPromoCode = async() => {

    await api.get(`/promo-codes/${promoCode}?action=validate`)
      .then(response => {
        if(response.status === 200 && response.data){
          
        }
      })
      .catch(error => {

      })
      .finally(() => {

      })
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
      setAppliedCodes(promoCode);
    } else {
      setDiscount(0);
      setAppliedCodes(null);
    }
  };

  const { formatToLKR } = useFormatter()

  return (
    // <Paper elevation={3} sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
    <>
      <Typography variant="h6" fontWeight="bold">Order Summary</Typography>
      <br></br>  
      {/* Subtotal */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1" sx={textStyles}>Subtotal:</Typography>
        <Typography variant="body1" sx={textStyles}>{formatToLKR(subtotal)}</Typography>
      </Box>

      {/* Handling Fee */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1" sx={textStyles}>Handling Fee:</Typography>
        <Typography variant="body1" sx={textStyles}>{formatToLKR(handlingFee)}</Typography>
      </Box>

      {/* Taxes */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1" sx={textStyles}>Taxes (8%):</Typography>
        <Typography variant="body1" sx={textStyles}>{formatToLKR(taxAmount)}</Typography>
      </Box>

      {/* Discount (if applied) */}
      {discount > 0 && (
        <Box display="flex" justifyContent="space-between" mb={1} color="green">
          <Typography variant="body1">Discount ({appliedCodes}):</Typography>
          <Typography variant="body1">- {formatToLKR(discountedAmount)}</Typography>
        </Box>
      )}

      {/* Delivery Fee */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1" sx={textStyles}>Delivery Fee:</Typography>
        <Typography variant="body1" color={deliveryFee === 0 ? "green" : "black"} sx={textStyles}>
          {deliveryFee === 0 ? "Free" : deliveryFee === undefined ? '--' : `${formatToLKR(deliveryFee)}`}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">Total:</Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">{formatToLKR(total)}</Typography>
      </Box>

      {/* Offer Code Input */}
      <Box mt={2} mb={4}>
        <Typography variant="body2">Apply Promo Code:</Typography>
        <Grid container spacing={1} mt={0}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={applyPromoCode}
              disabled={!promoCode}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
        {appliedCodes && appliedCodes.length > 0 && (
          <Typography variant="body2" color="green" mt={1}>
            "{appliedCodes}" applied! {discount}% discount added.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default OrderSummary;
