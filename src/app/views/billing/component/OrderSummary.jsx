import React, { useState } from "react";
import { Typography, TextField, Button, Divider, Box, Grid } from "@mui/material";
import { useFormatter } from "app/hooks/useFormatter";

const OrderSummary = ({ products }) => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState(null);

  // Sample promo codes (You can replace with backend API validation)
  const promoCodes = {
    "SAVE10": 10,  // 10% discount
    "FREESHIP": 5, // Flat 5 discount
    "WELCOME20": 20 // 20% discount
  };

  // Calculate subtotal from products
  const subtotal = products && products.length>0 ? products.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const deliveryFee = subtotal > 50 ? 0 : 5.99;  // Free shipping for orders > 50
  const handlingFee = 2.50;
  const taxRate = 0.08; // 8% tax
  const taxAmount = subtotal * taxRate;

  // Apply Discount
  const discountedAmount = (subtotal * discount) / 100;
  const total = subtotal + taxAmount + deliveryFee + handlingFee - discountedAmount;

  const applyPromoCode = () => {
    if (promoCodes[promoCode]) {
      setDiscount(promoCodes[promoCode]);
      setAppliedCode(promoCode);
    } else {
      setDiscount(0);
      setAppliedCode(null);
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
        <Typography variant="body1">Subtotal:</Typography>
        <Typography variant="body1">{formatToLKR(subtotal)}</Typography>
      </Box>

      {/* Delivery Fee */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Delivery Fee:</Typography>
        <Typography variant="body1" color={deliveryFee === 0 ? "green" : "black"}>
          {deliveryFee === 0 ? "Free" : `${formatToLKR(deliveryFee)}`}
        </Typography>
      </Box>

      {/* Handling Fee */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Handling Fee:</Typography>
        <Typography variant="body1">{formatToLKR(handlingFee)}</Typography>
      </Box>

      {/* Taxes */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="body1">Taxes (8%):</Typography>
        <Typography variant="body1">{formatToLKR(taxAmount)}</Typography>
      </Box>

      {/* Discount (if applied) */}
      {discount > 0 && (
        <Box display="flex" justifyContent="space-between" mb={1} color="green">
          <Typography variant="body1">Discount ({appliedCode}):</Typography>
          <Typography variant="body1">- {formatToLKR(discountedAmount)}</Typography>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="bold">Total:</Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">{formatToLKR(total)}</Typography>
      </Box>

      {/* Offer Code Input */}
      <Box mt={2} mb={4}>
        <Typography variant="body2" fontWeight="bold">Apply Promo Code:</Typography>
        <Grid container spacing={1} mt={1}>
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
        {appliedCode && (
          <Typography variant="body2" color="green" mt={1}>
            "{appliedCode}" applied! {discount}% discount added.
          </Typography>
        )}
      </Box>
    </>
  );
};

export default OrderSummary;
