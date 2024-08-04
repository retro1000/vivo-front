
import React from "react";
import {
  Grid
} from "@mui/material";
import ProductCardSlide from "app/components/Card/ProductCardSlide";

const products = [
  {
    id: 1,
    name: "Dummy Paint",
    price: "$360",
    rating: 4.5,
    reviews: 95,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: true
  },
  {
    id: 2,
    name: "Dummy Paint",
    price: "$700",
    rating: 4.8,
    reviews: 325,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
  {
    id: 3,
    name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
    price: "LKR 5990.00",
    rating: 4.7,
    reviews: 145,
    imgs: ['/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: true,
    isNew: true,
    realPrice: 'LKR 6990.00'

  },
  {
    id: 4,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
  {
    id: 5,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 6,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 7,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 8,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 9,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 10,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  }, {
    id: 11,
    name: "dummy paint",
    price: "$1160",
    rating: 4.0,
    reviews: 35,
    imgs: ['/assets/images/2099.jpg', '/assets/images/8735.jpg', '/assets/images/amazon-2.png', '/assets/images/demo_home_two.jpg'],
    wishList: false

  },
];

const ProductGrid = () => {
  return (
    <Grid
      container
      spacing={4.5}
      sx={{ width: "100%", maxWidth: 1360, display: 'flex', gap: 4.5, flexWrap: 'wrap', mt: '1em'}}
    >
      {products.map((product) => (
          <ProductCardSlide key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductGrid;
