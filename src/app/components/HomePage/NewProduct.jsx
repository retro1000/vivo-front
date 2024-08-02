import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: 346,
        marginTop: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: { xs: '40px 20px', md: '63px 80px 63px 21px' },
        backgroundImage: 'url(https://cdn.builder.io/api/v1/image/assets/TEMP/e477afba0e69bc61757769efeb03dba60902ae6de038d772f1a1f0e4f9ff16bb?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          color: '#000',
          fontWeight: 500,
          marginBottom: 4,
        }}
      >
        New Dulux SuperKote
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#333',
          maxWidth: 485,
          marginBottom: 4,
        }}
      >
        Dulux SuperKote Interior now not only has beautiful and brighter colours, with new added benefits also protect colour and paint of your home for longer
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ED005D',
          color: '#fff',
          textTransform: "none",
          '&:hover': {
                backgroundColor: '#d10454',
              },
          
          borderRadius: '5px',
          padding: '14px 25px',
          fontWeight: 600,
        }}
      >
        Learn More
      </Button>
    </Box>
  );
};

export default Banner;