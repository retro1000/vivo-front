
import React from "react";
import {
  Grid
} from "@mui/material";
import ProductCardSlide from "./Card/ProductCardSlide";

const ProductGrid = ({ removeWishList, products, sx }) => {
  return (
    <Grid
      // container
      spacing={4.5}
      sx={{ width: "100%", maxWidth: 1360, display: 'flex', gap: 4.5, flexWrap: 'wrap', mt: '1em', ...sx}}
    >
      {products.map((product) => (
          <ProductCardSlide removeWishList={removeWishList} key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
