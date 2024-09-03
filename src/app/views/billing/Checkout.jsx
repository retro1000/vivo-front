
import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import BillingForm from "./component/BillingForm";
import BillingDetailsHeader from "./component/BillingDetailsHeader";
import OrderSummary from "./component/OrderSummary";
import { Footer } from "app/components";
import { useState } from "react";


const Checkout = () => {

  const [orderList, setOrderList] = useState([
    {
      name: 'Lcd',
      img: '/assets/images/2099.jpg',
      amount: 1290
    },
    {
      name: 'Lcd',
      img: '/assets/images/2099.jpg',
      amount: 1290
    },
    {
      name: 'Lcd',
      img: '/assets/images/2099.jpg',
      amount: 1290
    }
  ])

  const [shipping, setShipping] = useState(400)

  const [subTotal, setSubTotal] = useState(3600)

  return (
    <>
    <Container maxWidth="lg">
      <BillingDetailsHeader />
      <br></br>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* <Paper style={{ padding: "20px" }}> */}
            <BillingForm />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* <Paper style={{ padding: "20px" }}> */}
            <OrderSummary orderList={orderList} shipping={shipping} subTotal={subTotal}/>
          {/* </Paper> */}
        </Grid>
      </Grid>
      
    </Container>
    <br></br>
    <Footer/>
    </>
  );
};

export default Checkout;
