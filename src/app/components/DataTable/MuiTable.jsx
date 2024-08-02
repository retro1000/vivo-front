import React from 'react'
import { useState, useEffect } from 'react';

import { Tooltip, Grid, Select, MenuItem, styled, Button, IconButton, Chip } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TButton, TIconButton } from '..';

import MUIDataTable from 'mui-datatables'
// import { makeStyles } from '@mui/styles';

// const CustomMuiTable = styled(MUIDataTable)({
//   '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.css-1idn90j-MuiGrid-root': {
//       padding: '0'
//   },
//   '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.tss-11quiee-MUIDataTable-paper.tss-1x5mjc5-MUIDataTable-root.custom_styles_footer.custom_styles_shadow.css-12kyv6a-MuiPaper-root': {
//       boxShadow: 'none'
//   }
// });

// const useStyles = makeStyles((theme) => ({
//   oddRow: {
//       backgroundColor: '#f0f0f0',
//       '&:hover': {
//           backgroundColor: theme.palette.action.hover,
//       },
//   },
//   evenRow: {
//       backgroundColor: '#ffffff',
//       '&:hover': {
//           backgroundColor: theme.palette.action.hover,
//       },
//   },
//   tableCell: {
//       padding: '16px', // Adjust this value to make rows taller
//   },
// }));

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


const renderButtons = (buttonsConfig, rowIndex) => {
  return buttonsConfig.map((buttonConfig, index) => {
    const { title, type, label, color, size, icon, onClick } = buttonConfig;
    
    if (type === 'icon') {
      return (
        <TIconButton
          key={index}
          title={title}
          color={color}
          size={size}
          fun={() => onClick(rowIndex)}
          icon={icon}
        ></TIconButton>
      );
    } else {
      return (
        <TButton
          title={title}
          sx={{textTransform: 'none'}}
          key={index}
          variant="outlined"
          color={color}
          size={size}
          onClick={() => onClick(rowIndex)}
          style={{ marginLeft: 8 }}
          label={label}
        ></TButton>
      );
    }
  });
};

const renderStatusChip = (status) => {
  let color;
  switch (status) {
    case 'Active':
    case 'Available':
      color = '#4caf50';
      break;
    case 'Inactive':
      color = '#ffbc00';
      break;
    case 'Pending':
      color = 'blue';
      break;
    case 'Banned':
    case 'Canceled':
    case 'Blocked':
    case 'Failed':
      color = 'red';
      break;
    default:
      color = 'gray';
  }
  return <Chip label={status} sx={{background: color, color: 'white', height: '2em', border: 'none'}} variant="outlined" />;
};

const renderUserRoleChip = (role) => {
  let color;
  switch (role) {
    case 'User':
      color = '#4caf50';
      break;
    case 'Cashier':
    case 'Back Office Staff':
      color = '#ffbc00';
      break;
    case 'Inventory Manager':
    case 'Sales Manager':
      color = 'blue';
      break;
    case 'Admin':
      color = 'red';
      break;
    default:
      color = 'gray';
  }
  return <Chip label={role} sx={{background: color, color: 'white', height: '2em', border: 'none'}} variant="outlined" />;
};

export default function MuiTable({ rowsPerPage=true, pagination=true, filter, cols, search, download, print, dataTableData, columns, filterType, selectableRows, title }){

  // const classes = useStyles();

  const [updatedCols, setUpdatedCols] = useState([])

  useEffect(() => {
    const newCols = columns.filter(val=>val.name!=='Actions'&&val.name!=='Status'&&val.name!=='Role')
    const option = columns.find(val=>val.name==='Actions')
    const statusOption = columns.find(val=>val.name==='Status')
    const roleOption = columns.find(val=>val.name==='Role')
    if(statusOption){
      newCols.push({
        name: 'Status',
        label: 'Status',
        options: {
          customBodyRender: (value) => renderStatusChip(value)
        }
      })
    }
    if(roleOption){
      newCols.push({
        name: 'Role',
        label: 'Role',
        options: {
          customBodyRender: (value) => renderUserRoleChip(value)
        }
      })
    }
    if(option){
      newCols.push({
        name: 'Actions',
        label: 'Actions',
        options: {
          customBodyRender: (value, tableMeta) => {
            const rowIndex = tableMeta.rowIndex;
            return <Grid sx={{display: 'flex', gap: '0.3em'}}>{renderButtons(option.options.buttonsConfig, rowIndex)}</Grid>;
          }
        }
      })
    }
    setUpdatedCols(newCols)
  }, [columns])

  return (
      <Grid container sx={{width: '100%'}}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
                <MUIDataTable
                    title={title}
                    data={dataTableData}
                    columns={updatedCols}
                    options={{
                      selectableRows: selectableRows,
                      // customRowRender: (data, dataIndex, rowIndex) => {
                      //   const rowColor = rowIndex % 2 === 0 ? '#f0f0f0' : '#ffffff'; // Alternating colors
                      //   return (
                      //     <tr style={{ backgroundColor: rowColor }}>
                      //       {data.map((value, columnIndex) => (
                      //         <td key={columnIndex}>{value}</td>
                      //       ))}
                      //     </tr>
                      //   );
                      // },
                      // setRowProps: (row, dataIndex, rowIndex) => {
                      //   return {
                      //       className: rowIndex % 2 === 0 ? 'evenRow' : 'oddRow',
                      //   };
                      // },
                      sort: true,
                      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
                        <CustomToolbarSelect 
                          selectedRows={selectedRows} 
                          displayData={displayData} 
                          onRowsDelete={() => setSelectedRows([])} // Custom delete action
                        />
                      ),
                      print: print,
                      download: download,
                      search: search,
                      filter: filter,
                      viewColumns: cols,
                      filterType: filterType,
                      pagination: pagination,
                      rowsPerPage: rowsPerPage,
                      responsive: 'simple'
                    }}
                    // classes={{
                    //   row: classes.tableRow,
                    // }}
                    // className='custom_styles_footer custom_styles_shadow'
                />
          </ThemeProvider>
        </Grid>
      </Grid>
  )
}
