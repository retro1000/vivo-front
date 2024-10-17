import React from 'react';
import { styled } from '@mui/material/styles';
import SearchBar from '@mkyy/mui-search-bar';
import { themeColors } from '../MatxTheme/themeColors';
import { forwardRef } from 'react';
import { Box } from '@mui/material';

const CustomSearchBar = styled(SearchBar)(({ theme }) => ({
    '& .MuiInputBase-root': {
      borderRadius: 4,
      border: '1px solid #ced4da',
      padding: '10px 40px',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      '&:hover': {
        borderColor: 'black',
      },
      '&.Mui-focused': {
        borderColor: themeColors.red.palette.primary.main,
        borderWidth: '2px',
        // boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

const SearchBarDefault = forwardRef(({ style, sx, value, setValue, search, placeholder }, ref) => {
    return (
      <Box ref={ref} display={"flex"} flex={1}>
        <CustomSearchBar
            style={style}
            sx={sx}
            value={value}
            onChange={newValue => setValue(newValue)}
            onSearch={search}
            placeholder={placeholder?placeholder:'Search...'}
            onCancelResearch={() => setValue('')}
        />
      </Box>
    );
})

export default SearchBarDefault