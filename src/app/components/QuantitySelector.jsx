import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { themeColors } from './MatxTheme/themeColors';

const QuantitySelector = ({ count, setCount, limit, blockUpdate, lowLimit }) => {

  useEffect(() => {
    if(limit===0) setCount(0)
  }, [])

  const handleIncrease = () => {
    if(limit===-1 || count < limit){
        setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1 && count > lowLimit) {
      setCount(count - 1);
    }
  };

  return (
    <Box sx={{ width: 'max-content', display: 'flex', alignItems: 'center', borderRadius: '0.4em', border: '0.1em solid #ddd', padding: '0.2em' }}>
      <IconButton sx={{cursor: 'pointer'}} onClick={handleDecrease} disabled={count <= 1 || count <= lowLimit || blockUpdate} aria-label="reduce">
        <RemoveIcon sx={{fontSize: '15px'}}/>
      </IconButton>
      <Typography sx={{ margin: '0 1rem', fontSize: '15px' }}>
        {count}
      </Typography>
      <IconButton sx={{cursor: 'pointer'}} onClick={handleIncrease} disabled={(limit!==-1 && count >= limit) || blockUpdate} aria-label="increase">
        <AddIcon sx={{fontSize: '15px'}}/>
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
