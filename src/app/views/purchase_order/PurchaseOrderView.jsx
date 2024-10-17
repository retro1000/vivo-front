import { useState } from "react";

import { Stack, Box, styled } from "@mui/material";

import { Breadcrumb } from "app/components";

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

function PurchaseOrderView() {

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Purchase Orders", path: "/purchase-orders" }, { name: "Purchase Order Details" }]} />
            </Box>

            <Stack alignItems={'center'} justifyContent={'center'} spacing={3}>
                
            </Stack>
        </Container>
    );
}

export default PurchaseOrderView;
