import React from 'react';
import { useState, useEffect } from 'react'
import { accordionActionsClasses, Box, Slide, Typography } from '@mui/material'
import { SearchPane, MuiTable, TButton } from '..';

import ViewIcon from '@mui/icons-material/RemoveRedEye'
import { useAxios } from 'app/hooks/useAxios';
import { useReducer } from 'react';

const initialState = {
  data: [],
  totalRecords: 0,
  selectedRows: [],
  page: 1,
  rowsPerPage: 10,
  searchOptions: {},
  selectedAction: '',
  searchText: '',
  columns: [],
  path: '',
  serverSide: true,
  loading: false
}

const reducer = (state, action) => {
  switch(action.type){
    case 'INIT': {
      const {table, data} = action.payload

      switch(table){
        case 'orders':
          return({
            ...state,
            data: data,
            path: '/order',
            selectedAction: 'STATUS',
            searchOptions: {
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
            },
            columns: [
              {name: 'Order Id', options: {display: 'exclude'}},
              {name:'orderNo', label:'Order No'},
              {name:'waybill', label:'Waybill'},
              {name:'customerName', label:'Customer Name'},
              {name:'address', label:'Address'},
              {name:'contactNos', label:'Contact Numbers'},
              {name:'status', label:'Status'},
              {
                name: "Actions",
                label: "Actions",
                options: {
                  sort: false,
                  buttonsConfig: [
                    {
                      type: "icon",
                      title: "View item",
                      icon: ViewIcon,
                      color: "primary",
                      size: "small",
                      onClick: (index) => {
                        window.location.href = `/order/view/${state.data[index][0]}`
                      },
                      onMouseDown: (index) => {
                        window.open(`/order/view/${state.data[index][0]}`, '_blank')
                      }, 
                    },
                  ]
                }
              }   
            ],
          })  
        case 'purchase-orders':
          return({
            ...state,
            data: data,
            path: '/purchase-order',
            selectedAction: 'STATUS',
            searchOptions: {
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
            },
            columns: [
              {name: 'Order Id', options: {display: 'exclude'}},
              {name:'orderNo', label:'Order No'},
              {name:'waybill', label:'Waybill'},
              {name:'customerName', label:'Customer Name'},
              {name:'address', label:'Address'},
              {name:'contactNos', label:'Contact Numbers'},
              {name:'status', label:'Status'},
              {
                name: "Actions",
                label: "Actions",
                options: {
                  sort: false,
                  buttonsConfig: [
                    {
                      type: "icon",
                      title: "View item",
                      icon: ViewIcon,
                      color: "primary",
                      size: "small",
                      onClick: (index) => {
                        window.location.href = `/purchase-order/view/${state.data[index][0]}`
                      },
                      onMouseDown: (index) => {
                        window.open(`/purchase-order/view/${state.data[index][0]}`, '_blank')
                      }, 
                    },
                  ]
                }
              }   
            ],
          })
        default:
          break;
      }
      break;
    }
    case 'FILTER': {

    }
    case 'SET_TABLE': {
      const {data, totalRecords} = action.payload

      return {...state, data: data, totalRecords: totalRecords, selectedRows: []}
    }
    case 'SEARCH': {
      const {searchText} = action.payload

      return {...state, searchText: searchText}
    }
    case 'SET_SEARCH_OPTIONS': {
      const {selectedAction} = action.payload

      return {...state, selectedAction: selectedAction}
    }
    case 'SORT': {

    }
    case 'SET_PAGE': {
      const {page} = action.payload

      return {...state, page: page, serverSide: true}
    }
    case 'SET_ROWS_PER_PAGE': {
      const {rowsPerPage} = action.payload

      return {...state, rowsPerPage: rowsPerPage, serverSide: true, page: 1}
    }
    case 'SET_SERVER_SIDE': {
      const {serverSide} = action.payload

      return {...state, serverSide: serverSide}
    }
    default: {}
  }
}

const FilterTable = ({ title, table, children, dataTableData, setDataTableData, selectableRows, filters, setFilters }) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const { api } = useAxios()

  const [showBox, setShowBox] = useState(false);

  const [serverSide, setServerSide] = useState(true) 

  const handleToggle = () => {
    setShowBox((prev) => !prev);
  };

  const setSelectedAction = (value) => {
    dispatch({ type: 'SET_SEARCH_OPTIONS', payload: {selectedAction: value}})
  }

  const setSearchText = (value) => {
    dispatch({ type: 'SEARCH', payload: {searchText: value}})
  }

  const options = {
    serverSide: state.serverSide,
    count: state.totalRecords,
    page: state.page,
    rowsPerPage: state.rowsPerPage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case 'changePage':
          dispatch({ tyep: 'SET_PAGE', payload: {page: tableState.page} })
          // setServerSide(true)
          // setPage(tableState.page);
          break;
        case 'changeRowsPerPage':
          dispatch({ tyep: 'SET_ROWS_PER_PAGE', payload: {rowsPerPage: tableState.rowsPerPage} })
          // setServerSide(true)
          // setRowsPerPage(tableState.rowsPerPage);
          // setPage(1); // Reset to the first page when changing rows per page
          break;
        case 'search':
        case 'filterChange':
        case 'sort':
          dispatch({type: 'SET_SERVER_SIDE', payload: {serverSide: false}}) // Switch to client-side processing
          break;
        default:
          break;
      }
    },
    selectableRows: selectableRows || false,
    // customToolbar: (props) => <CustomToolbar {...props} />,
  }

  useEffect(() => {
    dispatch({ type: 'INIT', payload: {table: table, data: dataTableData} })
  }, [])

  useEffect(() => {
    fetchData();
  }, [state.page, state.rowsPerPage]);

  const serachData = async () => {
    state.searchText && state.searchText!=='' && await api.get(`/${state.path}/search?option=${state.selectedAction}&value=${state.searchText}`)
      .then(response => {
        if(response.status===200){
          dispatch({  type: 'SET_TABLE', payload: {data: response.data.results, totalRecords: response.data.total}})
          // setData(response.data.results);
          // setTotalRecords(response.data.total);
        }
        if(response.status===204){
          dispatch({  type: 'SET_TABLE', payload: {data: [], totalRecords: 0}})
          // setData([]);
          // setTotalRecords(0);
        }
        setSearchText('')
      })
      .catch(error => {

      })
      .finally(() => {

      })
  }

  const fetchData = async () => {
    const filterUrl = `/${state.path}/filter?
        page=${state.page}
        &limit=${state.rowsPerPage}
        ${state.filters && Object.keys(state.filters).length>0 && '&'+Object.keys(state.filters).map(key => key+'='+(Array.isArray(state.filters[key])?state.filters[key].join(','):state.filters[key])).join('&')}`;
    window.history.pushState({}, '', filterUrl)
    await api.get(filterUrl)
      .then(response => {
        if(response.status===200){
          dispatch({  type: 'SET_TABLE', payload: {data: response.data.results, totalRecords: response.data.total}})
          // setData(response.data.results);
          // setTotalRecords(response.data.total);
        }
        if(response.status===204){
          dispatch({  type: 'SET_TABLE', payload: {data: [], totalRecords: 0}})
          // setData([]);
          // setTotalRecords(0);
        }
      })
      .catch(error => {

      })
      .finally(() => {

      })
  };

  return (
    <Box sx={{ width: "100%", top: "-3em" }}>
        <SearchPane
          {...state.searchOptions}
          selectedAction={state.selectedAction}
          setSelectedAction={setSelectedAction}
          searchText={state.searchText}
          setSearchText={setSearchText}
          setFilterToggle={handleToggle}
          showBox={showBox}
          fieldSearch={false}
          searchFunc={serachData}
        >
          {children?true:false}
        </SearchPane>
        <br></br>
        {
          children && (
            <Slide direction="up" in={showBox} mountOnEnter unmountOnExit>
              <Box display={'flex'} flexDirection={'column'} marginBottom={2} sx={{zIndex: '-1', padding: '0 5px'}}>
                <Typography variant='h6'>Filters</Typography>
                {children}
                <Box display={'flex'} gap={1} marginTop={3}>
                  <TButton title={'Reset'} label={'Reset'} color={'secondary'} variant={'outlined'} fun={()=>setFilters({})}></TButton>
                  <TButton title={'Filter'} label={'Filter'} color={'primary'} variant={'contained'}></TButton>
                </Box>
              </Box>
            </Slide>
          )
        }
        <MuiTable
          newOptions={options}
          columns={state.columns}
          dataTableData={state.data}
        >
        </MuiTable>
    </Box>    
  );
};

export default FilterTable;
