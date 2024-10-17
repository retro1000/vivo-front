import React from 'react';
import { Typography, Stack } from '@mui/material';

const InputField = ({ label, children, sx, req }) => {
  
  return (
    <Stack
        display="flex"
        gap="0.7em"
        sx={sx || { maxWidth: "350px", minWidth: "200px", width: "30%" }}
    >
        <div style={{ display: "flex", gap: "0.2em" }}>
            <Typography variant="body2" color="#363636">{label}</Typography>
            {req ? <Typography color="red">*</Typography> : ""}
        </div>
        {children}
    </Stack>
  );
};

export default InputField;
