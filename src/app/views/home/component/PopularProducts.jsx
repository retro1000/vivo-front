import React from "react";
import {
  Grid,
  Typography,
  Box,
} from "@mui/material";

import { ProductCard, TButton } from "../../../components"; 
import ProductCardSlide from "app/components/Card/ProductCardSlide";

const products = [
  // {
  //   id: 1,
  //   name: "Dummy Paint",
  //   price: "$360",
  //   rating: 4.5,
  //   reviews: 95,
  //   image: "assets/images/paint1.jpg",
  //   wishList: true
  // },
  // {
  //   id: 2,
  //   name: "Dummy Paint",
  //   price: "$700",
  //   rating: 4.8,
  //   reviews: 325,
  //   image: "assets/images/paint1.jpg",
  //   wishList: false

  // },
  {
    id: 3,
    name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
    price: "LKR 5990.00",
    rating: 4.7,
    reviews: 145,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: true,
    isNew: true,
    realPrice: 'LKR 6990.00'

  },
  // {
  //   id: 4,
  //   name: "dummy paint",
  //   price: "$1160",
  //   rating: 4.0,
  //   reviews: 35,
  //   image: "assets/images/paint1.jpg",
  //   wishList: false

  // },
];

const ProductGrid = ({Title}) => {
  return (
    <>
      <Typography variant="h4">{Title}</Typography>
      <Grid
        container
        spacing={2.5}
        sx={{ width: "100%", maxWidth: 1500, mt: 3 }}
      >
        {
          products.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              {/* <ProductCard
                product={product}
              ></ProductCard> */}
              <ProductCardSlide
                product={product}
              ></ProductCardSlide>
            </Grid>
          ))
        }
      </Grid>
      <br></br>
      <Box 
          width={"100%"} 
          sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
        >
          <TButton 
            label={"View All Products"} 
            variant="contained" 
            title={"View All Products"}
            sx={{
              width: "180px", 
              height: "50px",
              backgroundColor: '#ED005D',
              color: '#fff',
              textTransform: "none",
              '&:hover': {
                backgroundColor: '#d10454',
              }
            }}
          >
          </TButton>
</Box>

    </>
  );
};

export default ProductGrid;
