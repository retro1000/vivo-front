
import React from "react";
import {
  Box,
  Grid
} from "@mui/material";
import ProductCardSlide from "./Card/ProductCardSlide";

const ProductGrid = ({ removeWishList, products, sx, responsiveCardProps }) => {
  return (
    <Grid
      container
      spacing={1}
      alignItems="stretch"
      sx={{
        width: "100%",
        margin: 0,
        // padding: 2,
      }}
    >
      {products.map((product) => (
          <ProductCardSlide removeWishList={removeWishList} key={product.id} product={product} responsiveCardProps={responsiveCardProps} />
      ))}
    </Grid>
  );
};

export default ProductGrid; 
