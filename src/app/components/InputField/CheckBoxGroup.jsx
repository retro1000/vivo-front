import React from 'react';
import { Checkbox, FormGroup, FormControlLabel, Box, Typography } from '@mui/material';
import { useFormatter } from 'app/hooks/useFormatter';

const CheckBoxGroup = ({ options, selectedOptions, onChange, label }) => {

  const { DefaultWordFormat2 } = useFormatter()

  const handleCheckboxChange = (option) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(updatedOptions);
  };

  return (
    <>
        <Typography variant={'body1'}>{label}</Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
        {options.map((option) => (
            <FormControlLabel
            sx={{
                width: 'max-content'
            }}  
            key={option}
            control={
                <Checkbox
                checked={selectedOptions.includes(DefaultWordFormat2(option))}
                onChange={() => handleCheckboxChange(DefaultWordFormat2(option))}
                size='small'
                />
            }
            label={option}
            />
        ))}
        </Box>
    </>
  );
};

export default CheckBoxGroup;
