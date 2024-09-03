
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const Breadcrumb = () => {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
      <Typography color="text.primary">My Account</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;
