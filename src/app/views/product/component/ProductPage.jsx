
import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import ProductGrid from "./ProductGrid";

const ProductPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          mt: 14,
          width: "100%",
          maxWidth: 1170,
          gap: 2.5,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", p: 2.5 }}>
          <Box sx={{ display: "flex", width: 142, maxWidth: "100%", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#ed005d",
                  height: 40,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ color: "#ed005d", my: "auto", fontWeight: 600 }}
            >
              Our Products
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "#000",
              letterSpacing: 1.44,
              mt: 2.5,
              fontWeight: 600,
            }}
          >
            Explore Our Products
          </Typography>
        </Box>
        <Box
          sx={{
            alignSelf: "flex-end",
            display: "flex",
            mt: 7.375,
            gap: 2.5,
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 1.5,
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: 0.5,
              backgroundColor: "#fff",
              color: "#000",
              p: "7px 12px 7px 20px",
            }}
          >
            Sort by popularity
          </Button>
          <Box
            sx={{
              justifyContent: "center",
              borderRadius: 0.5,
              backgroundColor: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
              color: "#000",
              p: "7px 12px 7px 20px",
            }}
          >
            <Box sx={{ justifyContent: "center", display: "flex", gap: 2.5 }}>
              <Typography
                sx={{ fontFamily: "Poppins, sans-serif", my: "auto" }}
              >
                What are you looking for?
              </Typography>
              <img
                loading="lazy"
                src="http://b.io/ext_23-"
                alt="Search"
                style={{ width: 24, height: 24 }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ProductGrid />
      <Button
        variant="contained"
        sx={{
          borderRadius: 0.5,
          backgroundColor: "#ed005d",
          mt: 7.5,
          color: "#fafafa",
          p: "16px 48px",
          fontWeight: 500,
        }}
      >
        View All Products
      </Button>
      <Footer />
    </Box>
  );
};

export default ProductPage;
