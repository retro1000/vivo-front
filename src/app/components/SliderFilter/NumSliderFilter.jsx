import React from 'react';
import { Box, Slider, Typography } from '@mui/material';

const NumSliderFilter = ({ label, curr, heading, sx, min, max, range, setRange }) => {
//   const [range, setrange] = useState([800, 156940]);

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  return (
    <Box sx={{ width: 250, padding: 2 }}>
      <Typography fontSize={'1.1em'} gutterBottom>
        {heading}
      </Typography>
      <Slider
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={sx}
        size='small'
      />
      <Typography>
        {`${label}: ${curr} ${range[0].toLocaleString()} – ${curr} ${range[1].toLocaleString()}`}
      </Typography>
    </Box>
  );
};

export default NumSliderFilter;
