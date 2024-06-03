import React from 'react'

import { Grid, styled } from '@mui/material'
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
