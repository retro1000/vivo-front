
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
      sx={{ width: "100%", maxWidth: maxWidth || 1360, display: 'flex', gap: 2, flexWrap: 'wrap', mt: '1em', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))'}}
    >
      {products.map((product) => (
          <ProductCardSlide removeWishList={removeWishList} key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
