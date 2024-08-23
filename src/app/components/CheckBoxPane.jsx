import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";


const CheckBoxPane = ({ title, key, values, filters, setFilters }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'0.3em'} justifyContent={'flex-start'} alignItems={'flex-start'} maxWidth={'500px'}>
      <Typography variant="label" fontSize={'18px'}>{title}</Typography>
      <Box display={'flex'} gap={'0.1em'} flexWrap={'wrap'} justifyContent={'flex-start'} alignItems={'flex-start'}>
        {
            values && values.length>0 && values.map(val => {
                const checked = filters && filters[key] && filters[key].length>0 && filters[key].find(fil=>fil===val)!==undefined
                return (
                    <FormControlLabel 
                        key={val}
                        control={<Checkbox checked={checked} size="small"/>} 
                        label={val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()} 
                        onChange={(event) => {
                            const newList = {...filters}
                            if(event.target.checked && !checked){
                                newList[key] = newList[key] ? [...newList[key], val] : [val]
                            }else if(!event.target.checked && checked){
                                newList[key] = newList[key].filter(fil=>fil!==val)
                            }
                            setFilters(newList)
                        }}
                    />
                )
            })
        }
      </Box>
    </Box>
  );
};

export default CheckBoxPane;
