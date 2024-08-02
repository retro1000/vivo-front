import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const PaintStories = () => {
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
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography variant="h4" component="h2" sx={{ marginBottom: 4 }}>
              Paint your home with stories and memories of everyone you love.
            </Typography>
            <Typography variant="body1">
              Dulux SuperKote introduces Sri Lanka's Favourite Colours. Dulux SuperKote understands your culture and the nature you love with the importance of creating the desired atmosphere of a home. Be reassured of your right choice for quality and durability to last for years to come.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="assets/images/home2.jpg"
            alt="Paint Stories"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              aspectRatio: '1.19',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaintStories;