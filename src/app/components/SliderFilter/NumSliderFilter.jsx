import React from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const NumSliderFilter = ({ label, curr, heading, sx, min, max, range, setRange, minWidth, submitBtn }) => {
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
        {`${label?label+':':''} ${curr} ${range && range.length!==0 && range[0] ? range[0].toLocaleString() : submitBtn && tmpRange && tmpRange.length!==0 && tmpRange[0] ? tmpRange[0] : min} – ${curr} ${range && range.length!==0 && range[1] ? range[1].toLocaleString() : submitBtn && tmpRange && tmpRange.length!==0 && tmpRange[1] ? tmpRange[1] : max}`}
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
