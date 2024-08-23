import React from 'react';
import { useState, useEffect } from 'react'
import { Box, Slide, Typography } from '@mui/material'
import { SearchPane, MuiTable } from '..';

import ViewIcon from '@mui/icons-material/RemoveRedEye'
import { useRef } from 'react';

const FilterTable = ({ title, table, children, dataTableData, setDataTableData, selectedRows, selectableRows }) => {

  const [data, setData] = useState([]);

  const [totalRecords, setTotalRecords] = useState(0);

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchOptions, setSearchOptions] = useState({})

  const [selectedAction, setSelectedAction] = useState('')

  const [searchText, setSearchText] = useState('')

  const [columns, setColumns] = useState([])

  const [showBox, setShowBox] = useState(false);

  const childRef = useRef(null);

  const [path, setPath] = useState('') 

  const handleToggle = () => {
    setShowBox((prev) => !prev);
  };

  const options = {
    serverSide: true,
    count: totalRecords,
    page: page,
    rowsPerPage: rowsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          setRowsPerPage(tableState.rowsPerPage);
          setPage(1); // Reset to the first page when changing rows per page
          break;
        default:
          break;
      }
    },
    selectableRows: selectableRows || false,
    // customToolbar: (props) => <CustomToolbar {...props} />,
  }

  useEffect(() => {
    console.log(table)
    switch(table){
      case 'orders':
        setPath('/order')
        setSelectedAction('STATUS')
        setSearchOptions({
          menuActions: [
            {value:'STATUS', label: 'Seach by order status'},
            {value:'WAYBILL', label: 'Seach by order waybill'},
            {value:'ORDER_NO', label: 'Seach by order number'},
            {value:'ORDER_ID', label: 'Seach by order id'},
            {value:'CUSTOMER_NAME', label: 'Seach by customer name'},
            {value:'ALL', label: 'Seach by anything'},
          ], 
          // search: , 
          placeholder: 'Search orders'
        })
        setColumns([
          {name: 'Order Id', options: {display: 'exclude'}},
          {name:'Order No', label:'Order No'},
          {name:'Waybill', label:'Waybill'},
          {name:'Customer Name', label:'Customer Name'},
          {name:'Address', label:'Address'},
          {name:'Status', label:'Status'},
          {
            name: "Actions",
            label: "Actions",
            options: {
              buttonsConfig: [
                {
                  type: "icon",
                  title: "View item",
                  icon: ViewIcon,
                  color: "primary",
                  size: "small",
                  onClick: (index) => {
                    window.location.href = `/order/view/${dataTableData[index][0]}`
                  },
                  onMouseDown: (index) => {
                    window.open(`/order/view/${dataTableData[index][0]}`, '_blank')
                  }, 
                },
              ]
            }
          }   
        ])
        break;
      default:
        console.log(searchOptions)
        break;
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);

  const fetchData = async () => {
    // const offset = page * rowsPerPage;
    try {
      const response = await fetch(
        `${path}/filter?page=${page}&limit=${rowsPerPage}`
      );
      const result = await response.json();
      setData(result.data); // Assuming the API returns { data: [], total: number }
      setTotalRecords(result.total);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <Box sx={{ width: "100%", top: "-3em" }}>
        <SearchPane
          {...searchOptions}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          searchText={searchText}
          setSearchText={setSearchText}
          setFilterToggle={handleToggle}
          showBox={showBox}
        >
          {children?true:false}
        </SearchPane>
        <br></br>
        <Box ref={childRef}></Box>
        {
          children && (
            <Slide direction="up" in={showBox} mountOnEnter unmountOnExit container={childRef.current}>
              <Box display={'flex'} flexDirection={'column'} marginTop={1} marginBottom={4}>
                <Typography variant='h6'>Filters</Typography>
                {children}
              </Box>
            </Slide>
          )
        }
        <MuiTable
          newOptions={options}
          columns={columns}
          dataTableData={dataTableData}
        >
        </MuiTable>
    </Box>    
  );
};

export default FilterTable;
