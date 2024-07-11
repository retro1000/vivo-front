import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewStatsCard = ({ rating, reviewCount }) => {
  // Function to generate the stars with partial filling
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let fillPercentage = 0;

      if (rating >= i + 1) {
        fillPercentage = 100; // Fully filled star
      } else if (rating > i) {
        fillPercentage = (rating - i) * 100; // Partial fill
      }
      
      stars.push(
        <Box
          key={i}
          sx={{
            position: 'relative',
            display: 'inline-block',
            width: 24,
            height: 24,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              fill: 'url(#grad' + i + ')',
            }}
          >
            <defs>
              <linearGradient id={'grad' + i} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={fillPercentage + '%'} stopColor="gold" stopOpacity="1" />
                <stop offset={fillPercentage + '%'} stopColor="#d0d0d0" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <StarIcon
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              color: 'transparent',
            }}
          />
        </Box>
      );
    }
    return stars;
  };

  return (
    <Grid container alignItems="center" sx={{marginTop: '0.5em'}}>
      <Grid item>
        <Box display="flex" alignItems="center">
          {renderStars()}
        </Box>
      </Grid>
      <Grid item sx={{ marginLeft: 1 }}>
        <Typography variant="body2" color="textSecondary">
          {`${reviewCount!==undefined?reviewCount===1?reviewCount+' review':reviewCount+' reviews':'0 reviews'}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReviewStatsCard;
