
import React from "react";
import {
  Grid
} from "@mui/material";
import ProductCardSlide from "app/components/Card/ProductCardSlide";

const ProductGrid = ({ removeWishList, products, maxWidth }) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: '100%', display: 'flex', gap: 2, flexWrap: 'wrap', mt: '1em'}}
    >
      {products.map((product) => (
          <ProductCardSlide removeWishList={removeWishList} key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
