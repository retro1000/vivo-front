import React from 'react'

import { Grid, styled, Select, MenuItem, Button, IconButton, Chip } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MUIDataTable from 'mui-datatables'

// const CustomMuiTable = styled(MUIDataTable)({
//   '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.css-1idn90j-MuiGrid-root': {
//       padding: '0'
//   },
//   '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.tss-11quiee-MUIDataTable-paper.tss-1x5mjc5-MUIDataTable-root.custom_styles_footer.custom_styles_shadow.css-12kyv6a-MuiPaper-root': {
//       boxShadow: 'none'
//   }
// });

const theme = () => createTheme({
  components: {
    MuiGrid: {
      styleOverrides:{
        root: {
          paddingLeft: '0'
        }
      }
    },
    MUIDataTable: {
      styleOverrides:{
        root: {
          boxShadow: 'none', // Remove box shadow
        },
        // paper: {
        //   boxShadow: 'none', // Remove box shadow from paper (optional, depending on your use case)
        // },
        // tableCell: {
        //   paddingLeft: '0px', // Remove left padding
        // },
      }
    },
  }
})

const CustomToolbarSelect = ({ selectedRows, displayData, onRowsDelete }) => {
  const handleCustomAction = () => {
    const selectedData = selectedRows.data.map(row => displayData[row.index]);
    console.log('Custom action on selected rows:', selectedData);
    // Perform your custom action here
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Chip label={`Selected Rows: ${selectedRows.data.length}`} color="primary" />
      </Grid>
      <Grid item>
        <Select defaultValue="" displayEmpty>
          <MenuItem value="" disabled>
            Action
          </MenuItem>
          <MenuItem value="action1">Action 1</MenuItem>
          <MenuItem value="action2">Action 2</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleCustomAction}>
          Apply
        </Button>
      </Grid>
      <Grid item>
        <IconButton onClick={() => onRowsDelete(selectedRows)}>
          {/* <DeleteIcon /> */}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default function MuiTable({dataTableData, columns}) {
  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
                <MUIDataTable
                    // title="Employee List"
                    data={dataTableData}
                    columns={columns}
                    options={{
                      sort: true,
                      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                        <CustomToolbarSelect 
                          selectedRows={selectedRows} 
                          displayData={displayData} 
                          onRowsDelete={() => setSelectedRows([])} // Custom delete action
                        />
                      ),
                    filterType: 'checkbox',
                    responsive: 'simple'
                    }}
                    // className='custom_styles_footer custom_styles_shadow'
                />
          </ThemeProvider>
        </Grid>
      </Grid>
    </>
  )
}
