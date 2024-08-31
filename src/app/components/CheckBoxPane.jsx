import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";


const CheckBoxPane = ({ title, keyVal, values, filters, setFilters }) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'0.3em'} justifyContent={'flex-start'} alignItems={'flex-start'} maxWidth={'600px'}>
      <Typography variant="label" fontSize={'18px'}>{title}</Typography>
      <Box display={'flex'} gap={'0.1em'} flexWrap={'wrap'} justifyContent={'flex-start'} alignItems={'flex-start'}>
        {
            values && values.length>0 && values.map(val => {
                const checked = filters!==undefined && filters[keyVal]!==undefined && filters[keyVal].length>0 && filters[keyVal].find(fil=>fil===val)!==undefined
                return (
                    <FormControlLabel 
                        key={val}
                        control={<Checkbox checked={checked} size="small"/>} 
                        label={
                          <Typography fontSize={'14px'} variant="body2">{val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}</Typography>
                        }  
                        onChange={(event) => {
                            const newList = {...filters}
                            if(event.target.checked && !checked){
                                newList[keyVal] = newList[keyVal] ? [...newList[keyVal], val] : [val]
                            }else if(!event.target.checked && checked){
                                newList[keyVal] = newList[keyVal].filter(fil=>fil!==val)
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
