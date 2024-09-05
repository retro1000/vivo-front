
import React from "react";
import { Box, Typography, Container } from "@mui/material";
// import LogoSlider from "./Slider";

const BrandCars = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5779f835c2c11105dac7aed3c1853c667864e12fa20973630a3a65a33d9c4181?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
          alt="Divider"
          sx={{ flex: 1 }}
        />
        <Typography variant="h6" sx={{ whiteSpace: "nowrap" }}>
          Our Brands
        </Typography>
        <Box
          component="img"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5779f835c2c11105dac7aed3c1853c667864e12fa20973630a3a65a33d9c4181?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d"
          alt="Divider"
          sx={{ flex: 1 }}
        />
      </Box>
      {/* <LogoSlider/> */}
    </Container>
  );
};

export default BrandCars;
