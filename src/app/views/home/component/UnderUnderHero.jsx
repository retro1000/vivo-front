import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ColorOfTheYear = () => {
  return (
    <Box
      sx={{
        borderColor: 'rgba(159, 158, 158, 1)',
        backgroundColor: '#fff',
        marginTop: 6,
        padding: { xs: '40px 20px', md: '50px 55px' },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="assets/images/home1.jpg"
            alt="Dulux Visualizer App"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              aspectRatio: '1.19',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: 4 }}>
              Dulux Colour of the Year 2024 – Sweet Embrace™
            </Typography>
            <Typography variant="body1">
              Download the fast and free Dulux Visualizer app to see how Wild Wonder™ can transform your home.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ColorOfTheYear;
