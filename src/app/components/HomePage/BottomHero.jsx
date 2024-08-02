import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const LetsPaintHero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '583px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '0 20px', md: '80px 60px' },
        color: 'white',
        fontWeight: 600,
      }}
    >
      <Box
        component="img"
        src="assets/images/2099.jpg"
        alt="Background"
        sx={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          borderRadius: '0px 60px 0px 60px',
          backgroundColor: 'rgba(237, 0, 93, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: '53px 20px 40px', md: '53px 80px 40px' },
          marginTop: '30px',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            textAlign: 'center',
          }}
        >
          Let's Colour
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '41px',
            lineHeight: '46px',
            textAlign: 'center',
            alignSelf: 'stretch',
            marginTop: '10px',
          }}
        >
          Adding Colour to People's Lives
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            lineHeight: '24px',
            marginTop: '10px',
          }}
        >
          Our paint not only transforms walls, but also improves the lives of millions around the world.
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '4px',
            backgroundColor: 'white',
            marginTop: '38px',
            width: '270px',
            maxWidth: '100%',
            color: '#000',
            fontWeight: 500,
            lineHeight: '150%',
            padding: '16px 48px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Contact Us
        </Button>
      </Container>
    </Box>
  );
};

export default LetsPaintHero;