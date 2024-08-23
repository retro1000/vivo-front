import { useState } from "react";

import { Stack, Box, styled, Tabs, Tab, Typography, Select, Button, Grid, IconButton, Icon, Slide } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import { Breadcrumb, SimpleCard, MuiTable, FilterTable, SearchableSelectMultiple, NumSliderFilter} from "app/components";

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

function OrderView() {

    
}

export default OrderView;
