import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewStatsCard = ({ specOff, size, rating, reviewCount, id }) => {

  const sizing = size==='small'?{width: 17, height: 17}:{width: 24, height: 24}
  // Function to generate the stars with partial filling
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      let fillPercentage = 0;

      if (rating >= i + 1) {
        fillPercentage = 100; // Fully filled star
      } else if(rating-i > 0) {
        fillPercentage = Math.ceil((rating - i) * 100).toFixed(2); // Partial fill
      } else {
        fillPercentage = 0
      }
  
      stars.push(
        <Box
          key={i}
          sx={{
            position: 'relative',
            display: 'inline-block',
            ...sizing
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              fill: 'url(#grad' + i + id +')',
            }}
          >
            <defs>
              <linearGradient id={'grad' + i + id} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#faaf00" stopOpacity="1" />  {/* Always start with gold */}
                <stop offset={fillPercentage + '%'} stopColor="#faaf00" stopOpacity="1" />
                <stop offset={fillPercentage + '%'} stopColor="#d0d0d0" stopOpacity="1" />  {/* Gray starts at fillPercentage */}
                <stop offset="100%" stopColor="#d0d0d0" stopOpacity="1" /> {/* Ensure the gradient ends with gray */}
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
    console.log(id)
    return stars;
  };

  return (
    <Grid container alignItems="center" sx={{mt: size==='samll'?'0.5em':'0em'}}>
      <Grid item>
        <Box display="flex" alignItems="center">
          {renderStars()}
        </Box>
      </Grid>
      <Grid item sx={{ ml: 1 }}>
        <Typography variant="body2" color="textSecondary">
          {
            specOff ? 
              `${reviewCount!==undefined?reviewCount===1?reviewCount+' review':reviewCount+' reviews':'0 reviews'}` : 
              reviewCount!==undefined?`(${reviewCount})`:''
          }
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReviewStatsCard;
