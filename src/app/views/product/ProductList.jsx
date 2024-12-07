import { useState } from "react";

import { Stack, Box, styled } from "@mui/material";

import { Breadcrumb, MuiTable, CheckBoxGroup} from "app/components";

// import { useNotistack } from 'app/hooks/useNotistack';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
// import AddIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { useAxios } from "app/hooks/useAxios";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const searchOptions = [
  { label: "Search by product name", value: "NAME" },
]

function ProductList() {

    const navigate = useNavigate()

    const {api} = useAxios()

    // const [datatableData, setDataTableData] = useState([
    //   ['Joe James', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Bob Herm', 'Example Inc.', 'Tampa', 'FL'],
    //   ['James Houston', 'Example Inc.', 'Dallas', 'TX'],
    //   ['Prabhakar Linwood', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
    //   ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
    //   ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
    //   ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
    //   ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
    // ]);

    const columns = [
      {
        name: "productId",
        label: "Product Id",
        options: {
          filter: false,
          display: false,
          sort: false
        }
  
      },
      {
        name: "productNo",
        label: "Product Number",
        options: {
          filter: false,
        }
      },
      {
        name: "productTitle",
        label: "Product Name",
        options: {
          filter: false,
        }
      },
      {
        name: "productImage",
        label: "Product Image",
        type: "Image",
        options: {
          filter: false,
          sort: false
        }
      },
      {
        name: "unitPrice",
        type: "Price",
        label: "Selling Price (LKR)",
        options: {
          filter: false
        }
      },
      {
        name: "Stocks",
        label: "Stock",
        options: {
          filter: false
        }
      },
      {
        name: "productStatus",
        type: "Status",
        label: "Status",
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            logic: (value, filters) => {
              // Custom logic to determine if a row is displayed
              return filters.length > 0 && !filters.includes(value);
            },
            display: (filterList, onChange, index, column) => (
                <div style={{ padding: '16px' }}>
                  <CheckBoxGroup
                      label="Status"
                      options={["Available", "Unavailable"]}
                      selectedOptions={filterList[index] || []}
                      onChange={(selected) => {
                        filterList[index] = selected;
                        onChange(filterList[index], index, column);
                      }}
                  />
                </div>
            ),
          },
          customFilterListRender: (value) => {
            // Render custom filter values in the filter chip
            if (value.length) {
              return `Status: ${value.join(", ")}`;
            }
            return false;
          },
        },
      },
      {
        name: "Actions",
        label: "Actions",
        type: "Actions",
        options: {
          sort: false,
          filter: false,
          buttonsConfig: [
            {
              title: "View item",
              type: "icon",
              icon: ViewIcon,
              color: "primary",
              size: "small",
              onClick: (id, upadteDataTable) => {
                navigate('/productDetails/'+id)
              },
            },
            {
              title: "Edit item",
              type: "icon",
              icon: EditIcon,
              color: "primary",
              size: "small",
              onClick: (id, upadteDataTable) => {
                navigate('/product/update/'+id)
              },
            },
            {
              title: "Remove item",
              type: "icon",
              icon: DeleteIcon,
              color: "error",
              size: "small",
              onClick: (id, upadteDataTable) => {
                // console.log(data)
                api.delete("product/delete/"+id)
                  .then(response => {
                    if(response.status===200){
                      // triggerNotification([{text: "Product deleted successfully.", variant: 'success'}])
                      upadteDataTable(id);
                    }
                  })
                  .catch(error => {
  
                  })
              },
            },
          ],
        },
      },
    ];

    return (
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: "List" }]} />
        </Box>

        <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
            <MuiTable 
              searchOptions={searchOptions}
              columns={columns}
              path={'products'}
              columnOrder={["productNo", "productName", "productImage", "productStatus"]}
              updateDataTable={(rowIndex, updatedData) => console.log("Update row", rowIndex, updatedData)}
            />
        </Stack>
        </Container>
    );
}

export default ProductList;
