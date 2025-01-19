const { Box } = require("@mui/material");
const { scrollBar } = require("app/utils/constant");
const { memo } = require("react");

const TabPanel = memo(({ children, value, index, ...other }) => {
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box 
            sx={{ 
              p: 1, 
              mt: 1,
              maxHeight: '76dvh', 
              height: '90dvh', 
              overflowY: 'auto', 
              background: '#191919',
              ...scrollBar
      }} >
            {children}
          </Box>
        )}
      </div>
    );
  })

  export default TabPanel