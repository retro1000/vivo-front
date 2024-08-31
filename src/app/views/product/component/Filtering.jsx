// FilterBar.jsx
import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Checkbox, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const filtersConfig = [
  {
    category: 'Position',
    options: ['Exterior', 'Interior', 'Interior and Exterior'],
  },
  {
    category: 'Product type',
    options: ['Cleaner', 'Paint', 'Undercoat', 'Varnish', 'Waterproofing'],
  },
  {
    category: 'Room types',
    options: [
      'Bathroom',
      'Bedroom',
      "Children's Room",
      'Dining Room',
      'Hallway',
      'Home Office',
      'Kitchen',
      'Living Room',
    ],
  },
  {
    category: 'Surface',
    options: ['Bluestone', 'Doors', 'Furniture', 'Metal', 'Walls', 'Windows', 'Wood'],
  },
  {
    category: 'Finish',
    options: ['Gloss', 'Gloss, Semi Gloss Matt', 'High Gloss', 'Low Sheen', 'Matt', 'Mid Sheen', 'NA', 'Semi Gloss'],
  },
];

const FilterList = ({ filter, filters, handleFilterChange }) => (
  <Accordion sx={{ boxShadow: 'none', border: 'none' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography variant="h6">{filter.category}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <FormGroup>
        {filter.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={filters[`${filter.category.toLowerCase().replace(/ /g, '')}${option.replace(/ /g, '')}`] || false}
                onChange={handleFilterChange}
                name={`${filter.category.toLowerCase().replace(/ /g, '')}${option.replace(/ /g, '')}`}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </AccordionDetails>
  </Accordion>
);

const FilterBar = ({ filters, handleFilterChange, handleClearAll }) => {
  return (
    <>
      {filtersConfig.map((filter, index) => (
        <FilterList key={index} filter={filter} filters={filters} handleFilterChange={handleFilterChange} />
      ))}
    </>
  );
};

export default FilterBar;
