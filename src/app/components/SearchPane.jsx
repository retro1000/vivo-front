import { Box, MenuItem, Select } from "@mui/material";
// import { Select } from "antd";
import React from "react";
import { SearchBarDefault, TButton, TIconButton } from ".";
import FilterIcon from '@mui/icons-material/FilterAlt'
import { forwardRef } from "react";

const SearchPane = forwardRef(({ selectedAction, menuActions, setSelectedAction, searchText, setSearchText, search, placeholder, children, setFilterToggle, showBox, fieldSearch }, ref) => {

    return(
        <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"0.4em"}
            sx={{ width: "100%", zIndex: '10' }}
        >
            <Select
                sx={{ width: 'max-content' }}
                value={selectedAction}
                size="small"
                onChange={(event) => setSelectedAction(event.target.value)}
            >
                {
                    menuActions && menuActions && menuActions.map((action, index) => (
                        <MenuItem key={index} value={action.value}>{action.label}</MenuItem>
                    ))
                }
            </Select>
            <SearchBarDefault
                style={{flex: 1}}
                sx={{ minWidth: "200px" }}
                value={searchText}
                setValue={setSearchText}
                placeholder={placeholder}
                search={search}
                ref={ref}
            ></SearchBarDefault>
            {!fieldSearch && <TButton title='Search' label='Search' variant={'contained'} color={'primary'}></TButton>}
            {children?<TIconButton title='Filter' icon={FilterIcon} fun={setFilterToggle} color={showBox?'primary':'secondary'} sx={{opacity: '0.7'}}></TIconButton>:''}
        </Box>
    );
})

export default SearchPane;