import React from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const NumSliderFilter = ({ label, curr, heading, sx, min, max, range, setRange, minWidth, submitBtn, numFormatter }) => {
  const [tmpRange, setTmpRange] = useState([]);

  const handleChange = (event, newValue) => {
    if(submitBtn) setTmpRange(newValue)
    else setRange(newValue);
  };

  const handleSubmit = () => {
    submitBtn && setRange(tmpRange)
  };

  useEffect(() => {
    submitBtn && setTmpRange(range);
  }, [range]);
  
  return (
    <Box sx={{ width: '100%', padding: 2, minWidth: minWidth || 250 }}>
      {
        heading && 
        <Typography fontSize={'1.1em'} gutterBottom>
          {heading}
        </Typography>
      }
      <Slider
        value={range || tmpRange || [min, max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={sx}
        size='small'
      />
      <Typography variant='body2'>
        {`${label?label+':':''} ${range && range.length!==0 && range[0] ? (numFormatter ? numFormatter(range[0]) : range[0].toLocaleString()) : submitBtn && tmpRange && tmpRange.length!==0 && tmpRange[0] ? (numFormatter ? numFormatter(tmpRange[0]) : tmpRange[0]) : (numFormatter ? numFormatter(min) : min)} – ${range && range.length!==0 && range[1] ? (numFormatter ? numFormatter(range[1]) : range[1].toLocaleString()) : submitBtn && tmpRange && tmpRange.length!==0 && tmpRange[1] ? (numFormatter ? numFormatter(tmpRange[1]) : tmpRange[1]) : (numFormatter ? numFormatter(max) : max)}`}
      </Typography>
      {
        submitBtn && 
        <Button 
          sx={{mt: 1, ml: -0.2, mb: -2, width: '50px'}}
          size='small' 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={submitBtn && range===tmpRange}
        >
          Ok
        </Button>
      }
    </Box>
  );
};

export default NumSliderFilter;
