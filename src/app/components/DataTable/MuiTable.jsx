import React from "react";
import { useState, useEffect } from "react";

import {
  Tooltip,
  Chip,
  Grid,
  Box,
  Skeleton,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SearchPane, TButton, TIconButton } from "..";

import MUIDataTable from "mui-datatables";
import { useReducer } from "react";
import { useFormatter } from "app/hooks/useFormatter";
import { useAxios } from "app/hooks/useAxios";
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

const theme = () =>
  createTheme({
    components: {
      MuiGrid: {
        styleOverrides: {
          root: {
            paddingLeft: "0",
          },
        },
      },
      MUIDataTable: {
        styleOverrides: {
          root: {
            boxShadow: "none", // Remove box shadow
          },
          // paper: {
          //   boxShadow: 'none', // Remove box shadow from paper (optional, depending on your use case)
          // },
          // tableCell: {
          //   paddingLeft: '0px', // Remove left padding
          // },
        },
      },
    },
  });

const renderButtons = (buttonsConfig, rowIndex, rowData, updateDataTable) => {
  return buttonsConfig.map((buttonConfig, index) => {
    const { title, type, label, color, size, icon, onClick, onMouseDown } =
      buttonConfig;

    if (type === "icon") {
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
          sx={{ textTransform: "none" }}
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
    case "Active":
    case "Available":
      color = "#4caf50";
      break;
    case "Inactive":
      color = "#ffbc00";
      break;
    case "Pending":
      color = "blue";
      break;
    case "Banned":
    case "Canceled":
    case "Blocked":
    case "Failed":
      color = "red";
      break;
    default:
      color = "gray";
  }
  return (
    <Chip
      label={status}
      sx={{ background: color, color: "white", height: "2em", border: "none" }}
      variant="outlined"
    />
  );
};

const renderUserRoleChip = (role) => {
  let color;
  switch (role) {
    case "User":
      color = "#4caf50";
      break;
    case "Cashier":
    case "Back Office Staff":
      color = "#ffbc00";
      break;
    case "Inventory Manager":
    case "Sales Manager":
      color = "blue";
      break;
    case "Admin":
      color = "red";
      break;
    default:
      color = "gray";
  }
  return (
    <Chip
      label={role}
      sx={{ background: color, color: "white", height: "2em", border: "none" }}
      variant="outlined"
    />
  );
};

const renderImage = (img) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 50,
        height: 50,
        border: "1px solid #ddd",
        borderRadius: "5px",
        overflow: "hidden",
        // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Tooltip
        title={
          <img
            loading="lazy"
            src={img || 'https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024'}
            alt="Item"
            style={{ width: 200, height: 200, objectFit: "cover", padding: 0, margin: 0, borderRadius: 5 }}
          />
        }
        PopperProps={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10], // Position the tooltip 10px below the image
              },
            },
          ],
        }}
        sx={{
          cursor: "pointer",
        }}
      >
        <img
          loading="lazy"
          src={img || "https://z-p3-scontent.fcmb7-1.fna.fbcdn.net/v/t39.30808-6/288710953_175349728213986_5909586314590188913_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHkm1zN0neGzrTTbOViyzRObFppJaY45aZsWmklpjjlptTazpaJSWN2601Yt37b-SLr4bpg5pYdzEeEwkhrW_lC&_nc_ohc=15Wx0LpCJgwQ7kNvgE8KfIi&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb7-1.fna&_nc_gid=A-yvgNA3mcxjPmLAU6fJh3Z&oh=00_AYAsc-_sxQJDzlzagsYWbn9qO46xujR0NM87FE2hj5VzIg&oe=67590024"}
          alt="Item"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Tooltip>
    </Box>
  );
};

const renderPrice = (price, formatToLKR) => {
  return <Typography>{formatToLKR(price)}</Typography>;
};

const renderSkeleton = () => {
  return <Skeleton animation="wave" width="80%" />;
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
  search: false,
  filter: true,
  viewColumns: true,
  filterType: true,
  pagination: true,
  rowsPerPage: [100, 500, 1000],
  serverSide: true,
  responsive: "simple",
};

const initialTableState = {
  dataTableData: [],
  page: 0,
  rowsPerPage: 10,
  totalElements: 100,
  filters: {},
  sortOrder: "",
  sortCol: "",
  searchType: "",
  searchVal: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TABLE_DATA": {
      const { dataTableData, totalElements } = action.payload;
      console.log(dataTableData)
      return {
        ...state,
        dataTableData: dataTableData,
        totalElements: totalElements || state.totalElements,
      };
    }
    case "CHANGE_PAGE": {
      const { page } = action.payload;
      return { ...state, page: page };
    }
    case "CHANGE_ROWS_PER_PAGE": {
      const { rowsPerPage } = action.payload;
      return { ...state, rowsPerPage: rowsPerPage, page: 0 };
    }
    case "FILTER": {
      const { CamelCaseWordFormat2, tableState } = action.payload;

      if(!tableState || !tableState.filterList) return { ...state, page: 0, filters: Object.keys(state.filters).length===0 ? state.filters : {} };

      const newFilter = {};
      tableState.filterList.forEach((value, index) => {
        if (value.length > 0)
          newFilter[CamelCaseWordFormat2(tableState.columns[index].name)] = value;
      });

      return { ...state, page: 0, filters: newFilter };
    }
    case "SORT": {
      const { sortOrder } = action.payload;
      console.log(sortOrder)
      return {
        ...state,
        sortOrder: sortOrder.direction,
        sortCol: sortOrder.name,
        page: 0,
      };
    }
    case "CHNAGE_CUSTOM_SEARCH_TYPE": {
      const { searchType } = action.payload;
      return { ...state, searchType: searchType, searchVal: "" };
    }
    case "CHANGE_CUSTOM_SEARCH": {
      const { searchVal } = action.payload;
      return { ...state, searchVal: searchVal, page: 0 };
    }
    default: {
      return state;
    }
  }
};

export default function MuiTable({
  columnOrder,
  path,
  updateDataTable,
  newOptions,
  columns,
  title,
  searchOptions
}) {
  const { CamelCaseWordFormat2, formatToLKR } = useFormatter();

  const { api } = useAxios();

  const [tableState, dispatch] = useReducer(reducer, initialTableState);

  const [updatedCols, setUpdatedCols] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        page,
        rowsPerPage,
        searchVal,
        filters,
        sortOrder,
        sortCol,
        searchType,
        totalElements,
      } = tableState;

      setLoading(true);
      dispatch({
        type: "UPDATE_TABLE_DATA",
        payload: { dataTableData: Array(10).fill(updatedCols.map(col => ""))},
      });

      // totalElements > page + 1 * rowsPerPage &&
        (await api
          .get(
            `/${path}?page=${page}&limit=${rowsPerPage}${
              searchVal && searchVal !== "" && "&search=" + searchVal
            }${searchType && searchType !== "" && "&searchCol=" + searchType}${
              filters && Object.keys(filters).length > 0
                ? "&" +
                  Object.keys(filters)
                    .map(
                      (key) =>
                        key +
                        "=" +
                        (Array.isArray(filters[key])
                          ? filters[key].join(",")
                          : filters[key])
                    )
                    .join("&")
                : ""
            }${
              sortCol && sortOrder
                ? "&sortCol=" +
                  CamelCaseWordFormat2(sortCol) +
                  "&sortOrder=" +
                  sortOrder.toUpperCase()
                : ""
            }`
          )
          .then((response) => {
            if (response.status === 200 && response.data) {
              // setDataTableData(response.data.content.map(i => columnOrder.map(key => i[key])));
              // setTotalCount(response.data.totalElements);
              dispatch({
                type: "UPDATE_TABLE_DATA",
                payload: {
                  dataTableData: response.data.content.map((i) =>
                    columnOrder.map((key) => i[key])
                  ),
                  totalElements: response.data.totalElements,
                },
              });
            }
            if (response.status === 204) {
              dispatch({
                type: "UPDATE_TABLE_DATA",
                payload: { dataTableData: [], totalElements: 0 },
              });
            }
            if(!response.data || !response.status){
              dispatch({
                type: "UPDATE_TABLE_DATA",
                payload: { dataTableData: []},
              });
            }
          })
          .catch((error) => {
            // dispatch({
            //   type: "UPDATE_TABLE_DATA",
            //   payload: { dataTableData: []},
            // });
          })
          .finally(() => {setTimeout(() => setLoading(false), 10000)}));
      // Update your data table with the fetched data
      // For pagination
    };

    fetchData();
  }, [
    tableState.page,
    tableState.rowsPerPage,
    tableState.filters,
    tableState.searchVal,
    tableState.sortCol,
    tableState.sortOrder,
    tableState.SortOrder,
  ]);

  useEffect(() => {
    dispatch({
      type: "UPDATE_TABLE_DATA",
      payload: { dataTableData: Array(10).fill(updatedCols.map(col => ""))},
    });
    const cols = columns.map((col) => {
      switch (col.type) {
        case "Actions":
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value, tableMeta) => {
                if (loading || !value) return renderSkeleton();
                const rowIndex = tableMeta.rowIndex;
                const rowData = tableMeta.rowData;
                return (
                  <Grid sx={{ display: "flex", gap: "0.3em" }}>
                    {renderButtons(
                      col.options.buttonsConfig,
                      rowIndex,
                      rowData,
                      updateDataTable
                    )}
                  </Grid>
                );
              },
            },
          };
        case "Status":
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value) =>
                loading || !value ? renderSkeleton() : renderStatusChip(value),
            },
          };
        case "Role":
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value) =>
                loading || !value ? renderSkeleton() : renderUserRoleChip(value),
            },
          };
        case "Price":
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value) =>
                loading || !value ? renderSkeleton() : renderPrice(value, formatToLKR),
            },
          };
        case "Image":
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value) =>
                loading || !value ? renderSkeleton() : renderImage(value),
            },
          };
        default:
          return {
            ...col,
            options: {
              ...col.options,
              customBodyRender: (value) => (loading || !value ? renderSkeleton() : value),
            },
          };
      }
    });

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
    setUpdatedCols(cols);
  }, []);

  const setSearchText = (val) => {
    dispatch({
      type: 'CHANGE_CUSTOM_SEARCH',
      payload: {
        searchVal: val,
      }
    })
  }

  const setSelectedAction = (val) => {
    dispatch({
      type: 'CHANGE_CUSTOM_SEARCH_TYPE',
      payload: {
        searchType: val,
      }
    })
  }

  return (
    <Grid container sx={{ width: "100%" }}>
      <Grid item xs={12}>
        <SearchPane
          menuActions={searchOptions}
          selectedAction={tableState.searchType}
          setSelectedAction={setSelectedAction}
          searchText={tableState.searchVal}
          setSearchText={setSearchText}
          showBox={false}
          fieldSearch={true}
        >
          {false}
        </SearchPane>
        <br></br>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={title}
            data={tableState.dataTableData}
            columns={updatedCols}
            options={{
              ...(newOptions ? { ...options, ...newOptions } : options),
              onTableChange: (action, tableState) => {
                switch (action) {
                  case "changePage":
                    dispatch({
                      type: "CHANGE_PAGE",
                      payload: { page: tableState.page },
                    });
                    break;
                  case "changeRowsPerPage":
                    dispatch({
                      type: "CHANGE_ROWS_PER_PAGE",
                      payload: { rowsPerPage: tableState.rowsPerPage },
                    });
                    break;
                  // case 'search':
                  //   setTableOptions((prev) => ({ ...prev, search: tableState.searchText || '' }));
                  // break;
                  case "filterChange":
                    dispatch({
                      type: "FILTER",
                      payload: {
                        tableState: tableState,
                        CamelCaseWordFormat2: CamelCaseWordFormat2,
                      },
                    });
                    break;
                  case "sort":
                    dispatch({
                      type: "SORT",
                      payload: { sortOrder: tableState.sortOrder },
                    });
                    break;
                  default:
                }
              },
              // customToolbar: () => (
              //   <Button
              //     onClick={() => {
              //       dispatch({
              //         type: "FILTER",
              //         payload: {
              //           tableState: {}
              //         },
              //       });
              //     }}
              //     style={{ padding: "5px 10px", cursor: "pointer" }}
              //   >
              //     Reset Filters
              //   </Button>
              // ),
              page: tableState.page,
              rowsPerPage: tableState.rowsPerPage,
              // searchText: initialTableState.search,
              count: tableState.totalElements,
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
  );
}
