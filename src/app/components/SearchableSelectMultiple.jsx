import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const SearchableSelectMultiple = ({ label, options, selectedValues, setSelectedValues, multiple, sx, CustomTextField }) => {
    return (
    <Autocomplete
      sx={sx}
      options={options}
      multiple={multiple}
      getOptionLabel={(option) => option.label}
      value={selectedValues===null ? null : selectedValues}
      onChange={(event, newValue) => {
        setSelectedValues(newValue);
      }}
      filterSelectedOptions
      renderInput={(params) => CustomTextField!==undefined?<CustomTextField {...params} label={label} variant="outlined" />:<TextField {...params} label={label} variant="outlined" />}
    />
  );
};

export default SearchableSelectMultiple;
