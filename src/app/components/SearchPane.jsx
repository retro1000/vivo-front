import { Box, MenuItem, Select } from "@mui/material";
// import { Select } from "antd";
import React from "react";
import { SearchBarDefault, TButton, TIconButton } from ".";
import FilterIcon from '@mui/icons-material/FilterAlt'

const SearchPane = ({ selectedAction, menuActions, setSelectedAction, searchText, setSearchText, search, placeholder, children, setFilterToggle, showBox}) => {

    return(
        <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"0.4em"}
            sx={{ width: "100%", zIndex: '10' }}
        >
            <Select
                sx={{ width: "20%" }}
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
                // sx={{ width: "80%" }}
                value={searchText}
                setValue={setSearchText}
                placeholder={placeholder}
                search={search}
            ></SearchBarDefault>
            <TButton title='Search' label='Search' variant={'contained'} color={'primary'} ></TButton>
            {children?<TIconButton title='Filter' icon={FilterIcon} fun={setFilterToggle} color={showBox?'primary':'secondary'} sx={{opacity: '0.7'}}></TIconButton>:''}
        </Box>
    );
}

export default SearchPane;