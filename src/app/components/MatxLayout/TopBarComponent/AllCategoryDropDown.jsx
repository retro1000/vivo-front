import { useTheme } from "@emotion/react";
import { Box, MenuList, Slide, useMediaQuery } from "@mui/material";
import { useAxios } from "app/hooks/useAxios";
import { scrollBar } from "app/utils/constant";
import { memo } from "react";
import { forwardRef } from "react";

const AllCategoryDropDown = memo(forwardRef(({ dropDownOn, allCategories, setAllCategories, loading, setLoading, menuPosition, getAllCategories }, ref) => {

    const { api } = useAxios();
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  
    if(!loading && (!allCategories || allCategories.length===0)){
      getAllCategories(setAllCategories, setLoading, api)
    }
  
    return (
      <div style={{display: {sx: 'none', md: 'flex'}}} ref={ref}>
        <Slide direction="down" in={dropDownOn} mountOnEnter unmountOnExit>
          <Box 
            sx={{
              display: {sx: 'none', md: 'flex'},
              zIndex: 99, 
              background: 'gray', 
              height: 'max-content',
              maxHeight: '500px',
              // minHeight: '300px',
              position: 'fixed',
              boxShadow: 8,
              borderRadius: 1,
              overflowY: 'auto',
              ...scrollBar,
              ...menuPosition
  
            }}
          >
            <MenuList menuItems={allCategories} bgcolor='gray' hoverColor='white'/>
          </Box>
        </Slide>
      </div>
    )
  }))

  export default AllCategoryDropDown