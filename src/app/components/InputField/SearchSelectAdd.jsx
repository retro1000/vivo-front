import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const SearchSelectAdd = ({ key, id, options, value, onChange, multi, placeholder }) => {

    const filteredOptions = options.filter(option => !value.includes(option));

    return (
        <Autocomplete
        key={key}
        id={id}  
        multiple={multi!==undefined?multi:true}
        freeSolo
        options={filteredOptions}
        value={value}
        onChange={onChange}
        renderTags={(value, getTagProps) =>
            value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
            ))
        }
        renderInput={(params) => (
            <TextField
            {...params}
            variant="outlined"
            //   label={placeholder || "Search and Select"}
            placeholder="Type to add"
            />
        )}
        />
    );
};

export default SearchSelectAdd;
