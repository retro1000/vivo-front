import React from 'react';
import { Typography, Stack } from '@mui/material';

const DataField = ({ label, children, sx }) => {
  
  return (
    <Stack mb={1} sx={sx}>
        <Typography variant="body2" mb={'0.1em'} color={'#9c9c9c'}>{label}</Typography>
        {children}
    </Stack>
  );
};

export default DataField;
