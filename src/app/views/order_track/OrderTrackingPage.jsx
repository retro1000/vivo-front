import React, { useState } from "react";
import { Box, Typography, Grid, Container, TextField, Button, Card, CardContent } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  
  // Simulated tracking data for different order IDs
  const mockTrackingData = {
    "12345": {
      status: "Shipped",
      estimatedDelivery: "October 28, 2024",
      currentLocation: "Warehouse - New York, NY",
      history: [
        { date: "October 20, 2024", description: "Order Placed" },
        { date: "October 22, 2024", description: "Order Processed" },
        { date: "October 23, 2024", description: "Shipped from New York, NY" },
      ]
    },
    "67890": {
      status: "Delivered",
      estimatedDelivery: "Delivered on October 18, 2024",
      currentLocation: "Delivered to Chicago, IL",
      history: [
        { date: "October 10, 2024", description: "Order Placed" },
        { date: "October 12, 2024", description: "Order Processed" },
        { date: "October 15, 2024", description: "Shipped from Los Angeles, CA" },
        { date: "October 18, 2024", description: "Delivered to Chicago, IL" }
      ]
    }
  };

  const handleTrackOrder = () => {
    if (orderId && mockTrackingData[orderId]) {
      setTrackingInfo(mockTrackingData[orderId]);
    } else {
      setTrackingInfo(null);
    }
  };

  return (
    <Box>
      <Container maxWidth="lg">
        {/* <Grid container spacing={3}> */}
          <Grid item xs={12} md={7}>
            <br />
            <Header title={"Order Tracking"} subTitle={"Track your order"} />
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              Enter your order number or tracking number with one of your contact numbers that you used to place the order to get real-time status updates on your order. Stay informed about its current location and estimated delivery time.
              <br />
              <br />
              If you have any issues, feel free to contact our support team for assistance.
            </Typography>
            <TextField
              fullWidth
              label="Order number / Tracking Number"
              variant="outlined"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              sx={{ mt: 3 }}
            />
            <TextField
              fullWidth
              label="Contact number"
              variant="outlined"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              sx={{ mt: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleTrackOrder}
            >
              Track Order
            </Button>
            
            {trackingInfo ? (
              <Box sx={{ mt: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Order Status: {trackingInfo.status}</Typography>
                    <Typography variant="body1">
                      Estimated Delivery: {trackingInfo.estimatedDelivery}
                    </Typography>
                    <Typography variant="body1">
                      Current Location: {trackingInfo.currentLocation}
                    </Typography>

                    <Typography variant="h6" sx={{ mt: 2 }}>Tracking History</Typography>
                    <ul>
                      {trackingInfo.history.map((event, index) => (
                        <li key={index}>
                          <Typography variant="body2">
                            <strong>{event.date}:</strong> {event.description}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Box>
            ) : orderId ? (
              <Typography variant="body1" color="error" sx={{ mt: 4 }}>
                No tracking information found for order ID: {orderId}
              </Typography>
            ) : null}
          </Grid>
          {/* <Grid item xs={12} md={5}>
            <br />
            <Box
              component="img"
              src="/assets/images/2148943302.jpg"
              alt="Order Tracking"
              sx={{ width: "100%", height: "auto", borderRadius: '10px' }}
            />
          </Grid> */}
        {/* </Grid> */}
      </Container>
      <br></br>
      <Footer />
    </Box>
  );
};

export default OrderTrackingPage;
