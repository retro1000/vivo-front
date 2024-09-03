import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LetsPaintHero = () => {

  const navigate = useNavigate()

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
        src="/assets/images/2148288216.jpg"
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
          backgroundColor: '#dd3333',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: '53px 20px 40px', md: '53px 80px 40px' },
          marginTop: '30px',
        }}
      >
        <Typography
          variant="subtitle1"
          // sx={{
          //   fontFamily: 'Inter, sans-serif',
          //   fontSize: '14px',
          //   textAlign: 'center',
          // }}
        >
          Explore Our Collection
        </Typography>
        <Typography
          variant="h3"
          sx={{
            // fontFamily: 'Inter, sans-serif',
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
            // fontFamily: 'Inter, sans-serif',
            textAlign: 'center',
            lineHeight: '24px',
            marginTop: '10px',
          }}
        >
          Our products not only enhance your style but also elevate your everyday experience.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/product/filter-product')}
          sx={{
            // fontFamily: 'Poppins, sans-serif',
            borderRadius: '4px',
            backgroundColor: 'white',
            marginTop: '38px',
            width: '270px',
            maxWidth: '100%',
            color: '#000',
            fontWeight: 500,
            lineHeight: '150%',
            padding: '16px 48px',
            fontSize: '22px',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            },
          }}
        >
          Show Now
        </Button>
      </Container>
    </Box>
  );
};

export default LetsPaintHero;