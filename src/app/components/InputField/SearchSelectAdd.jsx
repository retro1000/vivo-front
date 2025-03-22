import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";

const SearchSelectAdd = ({
  key,
  id,
  options,
  value,
  onChange,
  multi,
  placeholder = "Type and tap ↵ to add value",
  required,
  label = "Search and Select",
  name,
  fullWidth,
  error,
  helperText,
  onBlur
}) => {
  const filteredOptions = options.filter((option) => !value.includes(option));

  const handleChange = (e, val) => {
    onChange(e, val)
  }

  return (
    <Autocomplete
      key={key}
      fullWidth={fullWidth}
      name={name}
      id={id}
      multiple={multi !== undefined ? multi : true}
      freeSolo
      options={filteredOptions}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            name={name}
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth={fullWidth}
          name={name}
          label={label ? label : ''}
          placeholder={placeholder ? placeholder : ""}
          required={required}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default SearchSelectAdd;
