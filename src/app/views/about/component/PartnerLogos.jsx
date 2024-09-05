
import React from "react";
import { Box, Container, Grid } from "@mui/material";

const logos = [
  "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?apiKey=6f06a6b4e70e4dde93ec8099db2adb9d&&apiKey=6f06a6b4e70e4dde93ec8099db2adb9d",
  ];

const PartnerLogos = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {logos.map((logo, index) => (
          <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
            <Box
              component="img"
              src={logo}
              alt={`Partner logo ${index + 1}`}
              sx={{
                width: "100%",
                maxWidth: 128,
                height: "auto",
                display: "block",
                margin: "auto",
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PartnerLogos;
