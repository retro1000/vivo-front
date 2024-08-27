import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

const SearchSelectAdd = ({ key, id, options, value, onChange, multi }) => {

  return (
    <Autocomplete
      key={key}
      id={id}  
      multiple={multi?multi:true}
      freeSolo
      options={options}
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
          label="Search and Select"
          placeholder="Type to add"
        />
      )}
    />
  );
};

export default SearchSelectAdd;
