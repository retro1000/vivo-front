import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

const NumSliderFilter = ({ label, curr, heading, sx, min, max, range, setRange, minWidth }) => {
//   const [range, setrange] = useState([800, 156940]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  if (!range || range.length !== 2) {
    range = [min, max]; // Fallback to default range if `range` is not properly initialized
  }

  return (
    <Box sx={{ width: '100%', padding: 2, minWidth: minWidth || 250 }}>
      {
        heading && 
        <Typography fontSize={'1.1em'} gutterBottom>
          {heading}
        </Typography>
      }
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={sx}
        size='small'
      />
      <Typography variant='body2'>
        {`${label?label+':':''} ${curr} ${range && range.length!==0 && range[0] ? range[0].toLocaleString() : min} – ${curr} ${range && range.length!==0 && range[1] ? range[1].toLocaleString() : max}`}
      </Typography>
    </Box>
  );
};

export default NumSliderFilter;
