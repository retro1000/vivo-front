
import React from "react";
import { Container, Typography, Grid, Button, Divider,Box } from "@mui/material";
import { Footer } from "app/components";
import CartItem from "./component/CartItem";
import CouponForm from "./component/CouponForm";
import CartTotal from "./component/CartTotal";

import { themeColors } from "app/components/MatxTheme/themeColors";
import { useNavigate } from "react-router-dom";


const CartPage = () => {

  const navigate = useNavigate()

  return (
    <>
    <Container maxWidth="lg">
      <Box
        sx={{
        }}>
      </Box>
      <Typography variant="h5" gutterBottom>
        Cart
      </Typography>
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CartItem
            image="/assets/images/microphone.jpg"
            name="Item 1"
            price="$650"
            quantity={1}
            subtotal="$650"
          />
        </Grid>
        <Grid item xs={12}>
          <CartItem
            image="/assets/images/microphone.jpg"
            name="Item 2"
            price="$550"
            quantity={2}
            subtotal="$1100"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "20px" }}>
        <Grid item xs={12} sm={6}>
        <Button
          variant="outlined"
          sx={{
            color: themeColors.red.palette.primary.main,
            borderColor: themeColors.red.palette.primary.main,
          }}
          onClick={()=>navigate('/product/filter-product')}
        >
            Return To Shop
          </Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={3} style={{ marginTop: "40px", display:'flex', justifyContent:'space-between' }}>
        <Grid item xs={12} md={5}>
          <CouponForm />
        </Grid>
        <Grid item xs={12} md={5}>
          <CartTotal subtotal="$1750" shipping="Free" total="$1750" />
        </Grid>
      </Grid>
      <Divider style={{ margin: "40px 0" }} />
    </Container>
    <Footer/>
    </>
  );
};

export default CartPage;
