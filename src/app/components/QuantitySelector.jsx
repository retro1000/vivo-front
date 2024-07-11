import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelector = ({count, setCount, limit}) => {

  useEffect(() => {
    if(limit===0) setCount(0)
  }, [])

  const handleIncrease = () => {
    if(limit===-1 || count < limit){
        setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton sx={{cursor: 'pointer'}} onClick={handleDecrease} disabled={count <= 1} aria-label="reduce">
        <RemoveIcon sx={{fontSize: '15px'}}/>
      </IconButton>
      <Typography sx={{ margin: '0 1rem', fontSize: '15px' }}>
        {count}
      </Typography>
      <IconButton sx={{cursor: 'pointer'}} onClick={handleIncrease} disabled={limit!==-1 && count >= limit} aria-label="increase">
        <AddIcon sx={{fontSize: '15px'}}/>
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
