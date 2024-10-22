// FilterBar.jsx
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, Radio } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NumSliderFilter } from 'app/components';

const handleCheckChange = (e, filter, selectedFilters, setSelectedFilters) => {
  const { name, checked } = e.target;
  const category = filter.category.toLowerCase().replace(/ /g, '');

  // Extract the selected options for the category
  const selectedOptions = selectedFilters[category] || [];
console.log(selectedOptions)
  if (checked) {
    // Add the option to the selected array
    setSelectedFilters({
      ...selectedFilters,
      [category]: Array.isArray(selectedOptions) ? [...selectedOptions, name] : [name],
    });
  } else {
    // Remove the option from the selected array
    const updatedOptions = selectedOptions.filter((option) => option !== name);

    const newFilters = { ...selectedFilters };

    if (updatedOptions.length > 0) {
      newFilters[category] = updatedOptions;
    } else {
      delete newFilters[category];
    }

    setSelectedFilters(newFilters);
  }
};

const handleRadioChange = (e, filter, selectedFilters, setSelectedFilters) => {
  const { value } = e.target;
  const category = filter.category.toLowerCase().replace(/ /g, '');

  // Update the selected radio option for the category
  setSelectedFilters({
    ...selectedFilters,
    [category]: value,
  });
};

const handleNumSliderChange = (newRange, filter, selectedFilters, setSelectedFilters) => {
  const category = filter.category.toLowerCase().replace(/ /g, '');

  // Update the slider range in the selected filters
  setSelectedFilters({
    ...selectedFilters,
    [category]: newRange,
  });
};

const createFilterOption = (filter, filters, handleFilterChange) => {
  switch(filter.type){
    case 'check':
      return (
        <FormGroup>
          {filter.options.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    size="small"
                    checked={Array.isArray(filters[`${filter.category.toLowerCase().replace(/ /g, '')}`]) && filters[`${filter.category.toLowerCase().replace(/ /g, '')}`].includes(option.replace(/ /g, ''))}
                    onChange={(e) => handleCheckChange(e, filter, filters, handleFilterChange)}
                    name={option.replace(/ /g, '')}
                  />
                }
                label={option}
                sx={{
                  marginBottom: '-10px',
                  marginLeft: '1px',
                  '.MuiFormControlLabel-label': { fontSize: '14px' },
                }}
              />
          ))}
        </FormGroup>
      )
    case 'radio':
      return (
        <FormGroup>
          {filter.options.map((option, index) => (
            <FormControlLabel
              key={index}
              control={
                <Radio
                  size='small'
                  checked={filters[`${filter.category.toLowerCase().replace(/ /g, '')}`] === option}
                  onChange={(e) => handleRadioChange(e, filter, filters, handleFilterChange)}
                  value={option}
                  name={filter.category.toLowerCase().replace(/ /g, '')} // Ensure name is the same for grouping
                />
              }
              label={option}
              sx={{
                marginLeft: '1px',
                marginBottom: '-10px',
                '.MuiFormControlLabel-label': { // Targeting the label
                  fontSize: '14px',
                },
              }}
            />
          ))}
        </FormGroup>
      )
    case 'num_slider':
      return (
        <NumSliderFilter 
          range={filters[`${filter.category.toLowerCase().replace(/ /g, '')}`]} 
          curr={'LKR'} 
          setRange={(newRange) => handleNumSliderChange(newRange, filter, filters, handleFilterChange)}
          min={10} 
          max={30000} 
          {...filter.config}
          minWidth={100}
          submitBtn={true}
        />
      )
    default: return ''
  }
}

const FilterList = ({ key, filter, handleFilterChange, selectedFilters }) => (
  <Accordion defaultExpanded key={key} sx={{ boxShadow: 'none', border: 'none', borderBottom: '1px solid silver', margin: '1px !important'}}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="body1">{filter.category}</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{mt: -2, pb: 1}}>
      {createFilterOption(filter, selectedFilters, handleFilterChange)}
      <br></br>
    </AccordionDetails>
  </Accordion>
);

const FilterBar = ({ filters, handleFilterChange, selectedFilters }) => {
  return (
    <>
      {filters.map((filter, index) => (
        <FilterList key={index} filter={filter} handleFilterChange={handleFilterChange} selectedFilters={selectedFilters} />
      ))}
    </>
  );
};

export default FilterBar;
