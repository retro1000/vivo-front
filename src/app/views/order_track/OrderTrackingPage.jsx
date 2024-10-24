import React, { useState } from "react";
import { Box, Typography, Grid, Container, TextField, Button, Card, CardContent, CircularProgress, Stepper, Step, StepLabel } from "@mui/material";
import Header from "app/components/Header";
import Footer from "app/components/Footer";
import { useAxios } from "app/hooks/useAxios";
import { LoadingButton } from "@mui/lab";
import { useNotistack } from "app/hooks/useNotistack";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styled from "@emotion/styled";
import { themeColors } from "app/components/MatxTheme/themeColors";
import { DataField, SimpleCard2 } from "app/components";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useFormatter } from "app/hooks/useFormatter";

const OrderTrackingPage = () => {
  const [orderId, setOrderId] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);

  const { apiNonAuth } = useAxios()

  const { triggerCommonErrors, triggerNotifications } = useNotistack()

  const { TitleCaseWordFormat, DefaultWordFormat, DefaultDateFormat } = useFormatter()

  const [loading, setLoading] = useState(false)

  const steps = ['Order confirmed', 'Picked by courier', 'On the way', 'Delivered'];
  
  // Simulated tracking data for different order IDs
  const mockTrackingData = {
    "OD453453454535": {
      orderNo: 'OD453453454535',
      estimatedDelivery: '29 Nov 2019',
      shippingBy: 'BLUEDART',
      contact: '+1598675986',
      status: 'picked_by the courier',
      trackingNumber: 'BD045903594059',
      steps: 2
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

  const handleTrackOrder = async () => {
    if(!orderId || !contactNo || loading) return

    setLoading(true)
    await apiNonAuth.get(`/order/track-order?orderId=${orderId}&contactNo=${contactNo}`)
      .then(response => {
        if(response.status===200){
          setTrackingInfo(response.data)
        }
        if(response.status===204){
          setTrackingInfo(null)
          triggerNotifications([{text: 'No order found to match given details.', variant: 'warning'}])
        }
      })
      .catch(error => {
        triggerCommonErrors(error)
      })
      .finally(() => {
        setLoading(false)
        setOrderId('')
        setContactNo('')
        setTrackingInfo(mockTrackingData['OD453453454535'])
      })
    // if (orderId && mockTrackingData[orderId]) {
    //   setTrackingInfo(mockTrackingData[orderId]);
    // } else {
    //   setTrackingInfo(null);
    // }
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 9,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      background: `linear-gradient(to right, ${theme.palette.primary.main} 50%, #eaeaf0 50%)`, // Half primary color, half gray
      borderTopWidth: 5,
      borderRadius: 1,
      ...theme.applyStyles('dark', {
        borderColor: `linear-gradient(to right, ${theme.palette.primary.main} 50%, #eaeaf0 50%)`,
      }),
    },
  }));
  
  const StepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: theme.palette.primary.main, // active background
      boxShadow: '0 4px 10px 0 rgba(0, 0, 0, 0.25)',
    }),
    ...(ownerState.completed && {
      backgroundColor: theme.palette.primary.main, // completed background
    }),
  }));
  
  const icons = {
    1: <CheckCircleIcon />,
    2: <AddShoppingCartIcon />,
    3: <LocalShippingIcon />,
    4: <CheckCircleIcon />,
  };
  
  function StepIcon(props) {
    const { active, completed, icon } = props;
  
    return (
      <StepIconRoot ownerState={{ completed, active }}>
        {icons[String(icon)]}
      </StepIconRoot>
    );
  }
  

  return (
    <Box>
      <Container 
        maxWidth="1300px" 
        sx={{
          pr: { xs: 2, sm: 4, md: 6 },
          pl: { xs: 2, sm: 4, md: 6 },
          minHeight: '80dvh'
        }}
      >
          <Header title={"Order Tracking"} subTitle={"Track your order"} />
          <Grid item xs={12} md={7}>
            <Typography variant="body1" sx={{ mt: 4, color: "text.secondary" }}>
              Enter your order number or tracking number or waybill with one of your contact numbers that you used to place the order to get real-time status updates on your order. Stay informed about its current location and estimated delivery time.
              <br />
              <br />
              If you have any issues, feel free to contact our support team for assistance.
            </Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, mt: 3}}>
              <TextField
                fullWidth
                label="Order number/Tracking number/Waybill *"
                variant="outlined"
                disabled={loading}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                sx={{ maxWidth: 330 }}
              />
              <TextField
                fullWidth
                label="Contact number *"
                variant="outlined"
                disabled={loading}
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                sx={{ maxWidth: 330 }}
              />
            </Box>
            <LoadingButton
              variant="contained"
              loading={loading}
              color="primary"
              onClick={handleTrackOrder}
              loadingPosition="start"
              startIcon={loading ? <CircularProgress size={20} /> : null}
              sx={{ 
                mt: 1.8,
                // '& .MuiLoadingButton-loadingIndicator': {
                //   marginRight: '10px', // Add space between spinner and text
                // }, 
              }}
              disabled={!contactNo || !orderId}
            >
              Track Order
            </LoadingButton>
            
            {trackingInfo ? (
              <SimpleCard2 
                sx={{
                  mt: 4, 
                  borderRadius: "8px", 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'flex-start', 
                  alignItems: 'flex-start', 
                  width: '100%'
                }}
                // title={`Order number : ${trackingInfo.orderNo}`}
                title={'Order Tracking Details'}
                cardFullSize={true}
              >
                {/* <br></br>
                <br></br>
                <Typography variant="h6">Order number: {trackingInfo.orderNo}</Typography> */}
                
                <Grid spacing={2} display={'flex'} flexWrap={'wrap'} gap={1}>
                  <DataField label={'Order number'} sx={{mr: 8}}>
                    <Typography variant="body2">{trackingInfo.orderNo}</Typography>
                  </DataField>
                  <DataField label={'Estimated Delivery time'} sx={{mr: 8}}>
                    <Typography variant="body2">{DefaultDateFormat(new Date(trackingInfo.estimatedDelivery))}</Typography>
                  </DataField>
                  <DataField label={'Shipping by'} sx={{mr: 8}}>
                    <Typography><a href={`tel:${trackingInfo.shippingBy}`} color={themeColors.red.palette.primary.main}>{trackingInfo.shippingBy}</a></Typography>
                  </DataField>
                  <DataField label={'Status'} sx={{mr: 8}}>
                    <Typography variant="body2">{TitleCaseWordFormat(DefaultWordFormat(trackingInfo.status))}</Typography>
                  </DataField>
                  <DataField label={'Tracking number/Waybill'} sx={{mr: 8}}>
                    <Typography variant="body2">{trackingInfo.trackingNumber}</Typography>
                  </DataField>
                  
                </Grid>
        
                {/* Stepper for progress */}
                <Box sx={{ mt: 3.5 }}>
                  <Stepper alternativeLabel activeStep={trackingInfo.steps} connector={<ColorlibConnector sx={{marginTop: '10px', borderTopWidth: '3px'}} />} sx={{maxWidth: '800px'}}>
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={StepIcon}
                          sx={{
                            '& .MuiStepLabel-label': {
                              fontWeight: 'bold', // Make step label bold
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '12px', mt: -1 }}>{label}</Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
            </SimpleCard2>
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
