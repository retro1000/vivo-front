
import React from "react";
import { Typography, Breadcrumbs, Link, Box } from "@mui/material";

const BillingDetailsHeader = () => {
  return (
    <>
    <Box
    sx={{
      margin : 3
    }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Account
        </Link>
        <Link color="inherit" href="/my-account">
          My Account
        </Link>
        <Link color="inherit" href="/product">
          Product
        </Link>
        <Link color="inherit" href="/view-cart">
          View Cart
        </Link>
        <Typography color="textPrimary">CheckOut</Typography>
      </Breadcrumbs>
      </Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Billing Details
      </Typography>
  
    </>
  );
};

export default BillingDetailsHeader;
