import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Breadcrumb, SimpleCard, MuiTable} from "app/components";

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

function ProductList() {

    const [datatableData, setDataTableData] = useState([
      ['Joe James', 'Example Inc.', 'Yonkers', 'NY'],
      ['John Walsh', 'Example Inc.', 'Hartford', 'CT'],
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

    const [columns, setColumns] = useState(['Name', 'Company', 'City', 'State']);

    return (
        <Container>
        <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: "List" }]} />
        </Box>

        <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
            <MuiTable columns={columns} dataTableData={datatableData}/>
        </Stack>
        </Container>
    );
}

export default ProductList;
