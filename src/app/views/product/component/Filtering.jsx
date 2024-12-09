// FilterBar.jsx
import React from 'react';
import { Typography, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, Radio, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NumSliderFilter } from 'app/components';
import { forwardRef } from 'react';
import { useFormatter } from 'app/hooks/useFormatter';
import { scrollBarThin } from 'app/utils/constant';

const handleCheckChange = (e, filter, selectedFilters, setSelectedFilters) => {
  const { name, checked } = e.target;
  const category = filter.category;

  // Extract the selected options for the category
  const selectedOptions = selectedFilters[category] || [];

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
  const category = filter.category;

  // Update the selected radio option for the category
  setSelectedFilters({
    ...selectedFilters,
    [category]: value,
  });
};

const handleNumSliderChange = (newRange, filter, selectedFilters, setSelectedFilters) => {
  const category = filter.category;

  // Update the slider range in the selected filters
  setSelectedFilters({
    ...selectedFilters,
    [category]: newRange,
  });
};

const createFilterOption = (filter, filters, handleFilterChange, DefaultWordFormat) => {

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
                    checked={Array.isArray(filters[`${filter.category}`]) && filters[`${filter.category}`].includes(option)}
                    onChange={(e) => handleCheckChange(e, filter, filters, handleFilterChange)}
                    name={option}
                  />
                }
                label={DefaultWordFormat(option)}
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
                  checked={filters[`${filter.category}`] === option}
                  onChange={(e) => handleRadioChange(e, filter, filters, handleFilterChange)}
                  value={option}
                  name={filter.category} // Ensure name is the same for grouping
                />
              }
              label={DefaultWordFormat(option)}
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
          range={filters[`${filter.category}`]} 
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

const FilterList = ({ key, filter, handleFilterChange, selectedFilters }) => {

  const { CamelCaseWordFormat, DefaultWordFormat } = useFormatter()

  return (
    <Accordion defaultExpanded key={key} sx={{ boxShadow: 'none', border: 'none', borderBottom: '1px solid silver', margin: '1px !important'}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body1">{CamelCaseWordFormat(filter.category)}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{mt: -2, pb: 1}}>
        {createFilterOption(filter, selectedFilters, handleFilterChange, DefaultWordFormat)}
        <br></br>
      </AccordionDetails>
    </Accordion>
  )
};

const FilterBar = forwardRef(({ filters, handleFilterChange, selectedFilters, maxHeight }, ref) => {

  return (
    <Box ref={ref} sx={{overflowY: 'auto', maxHeight: maxHeight, ...scrollBarThin}}>
      {filters.map((filter, index) => (
        <FilterList key={index} filter={filter} handleFilterChange={handleFilterChange} selectedFilters={selectedFilters} />
      ))}
    </Box>
  );
});

export default FilterBar;
