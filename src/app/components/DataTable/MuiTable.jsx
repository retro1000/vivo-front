import React from 'react'
import { useState, useEffect } from 'react';

import { Tooltip, Chip, Grid, Button, IconButton } from '@mui/material'
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


const renderButtons = (buttonsConfig, rowIndex) => {
  return buttonsConfig.map((buttonConfig, index) => {
    const { title, type, label, color, size, icon, onClick, onMouseDown } = buttonConfig;
    
    if (type === 'icon') {
      return (
        <TIconButton
          key={index}
          title={title}
          color={color}
          size={size}
          fun={() => onClick(rowIndex)}
          fun2={() => onMouseDown(rowIndex)}
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
          fun={() => onClick(rowIndex)}
          fun2={() => onMouseDown(rowIndex)}
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


const options = {
  selectableRows: false,
  sort: true,
  print: true,
  download: true,
  search: true,
  filter: true,
  viewColumns: true,
  filterType: true,
  pagination: true,
  // rowsPerPage: true,
  responsive: 'simple'
}

export default function MuiTable({ newOptions, dataTableData, columns, title }){

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
                    options={
                      newOptions?{...options, ...newOptions}:options
                      // selectableRows: selectableRows,
                      // // customRowRender: (data, dataIndex, rowIndex) => {
                      // //   const rowColor = rowIndex % 2 === 0 ? '#f0f0f0' : '#ffffff'; // Alternating colors
                      // //   return (
                      // //     <tr style={{ backgroundColor: rowColor }}>
                      // //       {data.map((value, columnIndex) => (
                      // //         <td key={columnIndex}>{value}</td>
                      // //       ))}
                      // //     </tr>
                      // //   );
                      // // },
                      // // setRowProps: (row, dataIndex, rowIndex) => {
                      // //   return {
                      // //       className: rowIndex % 2 === 0 ? 'evenRow' : 'oddRow',
                      // //   };
                      // // },
                      // sort: true,
                      // print: print,
                      // download: download,
                      // search: search,
                      // filter: filter,
                      // viewColumns: cols,
                      // filterType: filterType,
                      // pagination: pagination,
                      // rowsPerPage: rowsPerPage,
                      // responsive: 'simple'
                    }
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
