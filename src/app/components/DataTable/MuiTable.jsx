import React from 'react'
import { useState, useEffect } from 'react';

import { Tooltip, Chip, Grid, Button, IconButton, Box } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QuantitySelector, TButton, TIconButton } from '..';

import MUIDataTable from 'mui-datatables'
import { useReducer } from 'react';
import { useFormatter } from 'app/hooks/useFormatter';
import { useAxios } from 'app/hooks/useAxios';
// import { makeStyles } from '@mui/styles';
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


const renderButtons = (buttonsConfig, rowIndex, rowData, updateDataTable) => {
  return buttonsConfig.map((buttonConfig, index) => {
    const { title, type, label, color, size, icon, onClick, onMouseDown } = buttonConfig;
    
    if (type === 'icon') {
      return (
        <TIconButton
          key={index}
          title={title}
          color={color}
          size={size}
          fun={() => onClick(rowData, updateDataTable)}
          fun2={() => onMouseDown(rowData, updateDataTable)}
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
          fun={() => onClick(rowData, updateDataTable)}
          fun2={() => onMouseDown(rowData, updateDataTable)}
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

// const renderQuantitySelector = (value, options, rowIdex) => {
//   return (
//     <QuantitySelector 
//       count={value.quantity} 
//       setCount={
//         (val) => {
//           const newList = [...items]
//           const newQty = updateQty
//           items[tableMeta.rowIndex].quantity = val
//           setItems(newList)
//         }
//       }
//       limit={value.limit}
//     />
//   )
// }


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
  rowsPerPage: true,
  serverSide: true,
  responsive: 'simple'
}


const initialTableState = {
  dataTableData: [],
  page: 0,
  rowsPerPage: 10,
  totalElements: 0,
  filters: {},
  sortOrder: '',
  sortCol: '',
  searchType: '',
  searchVal: '' 
}

const reducer = (state, action) => {
  switch(action.type){
    case 'UPDATE_TABLE_DATA': {
      const { dataTableData, totalElements } = action.payload
      return {...state, dataTableData: dataTableData, totalElements: totalElements}
    }
    case 'CHANGE_PAGE': {
      const { page } = action.payload
      return {...state, page: page}
    }
    case 'CHANGE_ROWS_PER_PAGE': {
      const { rowsPerPage } = action.payload
      return {...state, rowsPerPage: rowsPerPage, page: 0}
    }
    case 'FILTER': {
      const { CamelCaseWordFormat2, tableState } = action.payload
      const newFilter={}
      tableState.filterList.forEach((value, index) => {
        if (value.length > 0) newFilter[CamelCaseWordFormat2(tableState.columns[index].name)] = value;  
      });
      return {...state, page: 0, filters: newFilter}
    }
    case 'SORT': {
      const { sortOrder } = action.payload
      return {...state, sortOrder: sortOrder.direction, sortCol: sortOrder.name, page: 0}
    }
    case 'CHNAGE_CUSTOM_SEARCH_TYPE': {
      const { searchType } = action.payload
      return {...state, searchType: searchType, searchVal: ''}
    }
    case 'CHANGE_CUSTOM_SEARCH': {
      const { searchVal } = action.payload
      return {...state, searchVal: searchVal, page: 0}
    }
    default: {

    }
  }
}

export default function MuiTable({ columnOrder, path, updateDataTable, newOptions, columns, title }){

  const { CamelCaseWordFormat2 } = useFormatter()

  const { api } = useAxios()

  const [state, dispatch] = useReducer(reducer, initialTableState)

  const [updatedCols, setUpdatedCols] = useState([])

  const [loading, setLoading] = useState(false) 

  useEffect(() => {

    const fetchData = async () => {
      const { page, rowsPerPage, searchVal, filters, sortOrder, sortCol, searchCol, totalElements } = state;
      setLoading(true)
      // Example API call
      totalElements > page+1*rowsPerPage && await api.get(
        `/${path}?page=${page}&limit=${rowsPerPage}${searchVal && searchVal!=='' && '&searchVal='+searchVal}${searchCol && searchCol!=='' && '&searchCol='+searchCol}${
        filters && Object.keys(filters).length>0 ? '&'+Object.keys(filters).map(key => key+'='+(Array.isArray(filters[key]) ? filters[key].join(',') : filters[key])).join('&') : ''}${
        sortCol && sortOrder ? '&sortCol='+CamelCaseWordFormat2(sortCol)+'&sortOrder='+sortOrder.toUpperCase() : ''}`
      )
        .then(response => {
          if(response.status===200 && response.data){
            // setDataTableData(response.data.content.map(i => columnOrder.map(key => i[key])));
            // setTotalCount(response.data.totalElements);
            dispatch(
              { 
                type: 'CHANGE_TABLE_DATA', 
                payload: {
                  dataTableData: response.data.content.map(i => columnOrder.map(key => i[key])), 
                  totalElements: response.data.totalElements
                } 
              }
            )  
          }
          if(response.status===204){
            dispatch({ type: 'CHANGE_TABLE_DATA', payload: {dataTableData: [], totalElements: 0} })  
          }
        })
        .catch(error => {})
        .finally(() => {})
  
      // Update your data table with the fetched data
       // For pagination
    };
  
    fetchData();
  }, [state.rowsPerPage, state.page, state.filters, state.searchVal, state.sortCol, state.SortOrder]);

  useEffect(() => {
    const newCols = columns.filter(val=>val.name!=='Actions'&&val.name!=='Status'&&val.name!=='Role')
    const option = columns.find(val=>val.name==='Actions')
    const statusOption = columns.find(val=>val.name==='Status')
    const roleOption = columns.find(val=>val.name==='Role')
    const quantitySelectorOption = columns.find(val=>val.name==='quantitySelector')

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
          sort: option.options.sort===undefined || option.options.sort,
          customBodyRender: (value, tableMeta) => {
            const rowIndex = tableMeta.rowIndex;
            const rowData = tableMeta.rowData;
            return (
              <Grid sx={{display: 'flex', gap: '0.3em'}}>
                {renderButtons(option.options.buttonsConfig, rowIndex, rowData, updateDataTable)}
              </Grid>
            );
          }
        }
      })
    }
    // if(quantitySelectorOption){
    //   newCols.push({
    //     name: 'Quantity',
    //     label: 'Quantity',
    //     options: {
    //       customBodyRender: (value, tableMeta) => {
    //         const rowIndex = tableMeta.rowIndex;
    //         return <Box>{renderQuantitySelector(value, option.options.buttonsConfig, rowIndex)}</Box>;
    //       }
    //     }
    //   })
    // }
    setUpdatedCols(newCols)
  }, [columns])

  return (
      <Grid container sx={{width: '100%'}}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
                <MUIDataTable
                    title={title}
                    data={state.dataTableData}
                    columns={updatedCols}
                    options={{
                      ...(newOptions?{...options, ...newOptions} : options),
                      onTableChange: (action, tableState) => {
                        switch (action) {
                          case 'changePage':
                            dispatch({ type: 'CHANGE_PAGE', payload: {page: tableState.page} })
                            break;
                          case 'changeRowsPerPage':
                            dispatch({ type: 'CHANGE_ROWS_PER_PAGE', payload: {rowsPerPage: tableState.rowsPerPage} })
                            break;
                          // case 'search':
                          //   setTableOptions((prev) => ({ ...prev, search: tableState.searchText || '' }));
                            // break;
                          case 'filterChange':
                            const newFilter = {};
                            tableState.filterList.forEach((value, index) => {
                              if (value.length > 0) newFilter[CamelCaseWordFormat2(tableState.columns[index].name)] = value;  
                            });
                            dispatch({ type: 'FILTER', payload: {tableState: tableState, CamelCaseWordFormat2: CamelCaseWordFormat2} })
                            break;
                          case 'sort':
                            dispatch({ type: 'SORT', payload: {sort: tableState.sortOrder} })
                            break;
                          default:
                            break;
                        }
                      },
                      page: state.page,
                      rowsPerPage: state.rowsPerPage,
                      // searchText: initialTableState.search,
                      count: state.totalElements,
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
