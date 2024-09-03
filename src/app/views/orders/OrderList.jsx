import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, Slide } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Breadcrumb, SimpleCard, MuiTable, FilterTable, SearchableSelectMultiple, NumSliderFilter, CheckBoxPane} from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

function OrderList() {

    const [datatableData, setDataTableData] = useState([
      [1, 'Joe James', 'Example Inc.', 'Yonkers', 'NY'],
      [2, 'John Walsh', 'Example Inc.', 'Hartford', 'CT'],
      ['Bob Herm', 'Example Inc.', 'Tampa', 'FL'],
      ['James Houston', 'Example Inc.', 'Dallas', 'TX'],
      ['Prabhakar Linwood', 'Example Inc.', 'Hartford', 'CT'],
      ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
      ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
      ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
      ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
      ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
      ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
      ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
      ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
      ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
      ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
      ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
      ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
    ]);


    const [filters, setFilters] = useState({})

    return (
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "orders", path: "/order/list" }]} />
        </Box>

        <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
            {/* <MuiTable columns={columns} dataTableData={datatableData}/> */}
            <FilterTable table='orders' dataTableData={datatableData} selectableRows={true} title={'Orders'} filters={filters} setFilters={setFilters}>

                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  sx={{ marginTop: "1em" }}
                  gap={2}
                >
                  {/* <Box
                    width={"100%"}
                    display={"flex"}
                    flexWrap={"wrap"}
                    flexDirection={"column"}
                  >
                    <NumSliderFilter
                      heading={"Selling Price"}
                      label={"Price"}
                      curr={"LKR"}
                      // range={sellPriceRange}
                      // min={sellPriceMin}
                      // max={sellPriceMax}
                      // setRange={setSellPriceRange}
                    />
                    <NumSliderFilter
                      heading={"Stock Available"}
                      label={"Quantity"}
                      curr={""}
                      // range={qtyRange}
                      // min={qtyMin}
                      // max={qtyMax}
                      // setRange={setQtyRange}
                    />
                  </Box> */}
                  
                  <CheckBoxPane title={'Order Status'} keyVal={'status'} values={['confirmed', 'canceled', 'stock available', 'need to import', 'pending']} filters={filters} setFilters={setFilters}></CheckBoxPane>
                  <CheckBoxPane title={'District'} keyVal={'district'} values={['colombo', 'gampaha', 'kandy', 'galle', 'kaluthara']} filters={filters} setFilters={setFilters}></CheckBoxPane>
                  <CheckBoxPane title={'City'} keyVal='city' values={['colombo', 'gampaha', 'kandy', 'galle', 'kaluthara']} filters={filters} setFilters={setFilters}></CheckBoxPane>
                </Box>
            </FilterTable>
        </Stack>
        </Container>
    );
}

export default OrderList;
