
import React from "react";
import { Container, Typography, Grid, Button, Divider,Breadcrumbs,Link,Box } from "@mui/material";
import { Breadcrumb, Footer, Header, ProductCard, ProductGrid } from "app/components";
import useAuth from "app/hooks/useAuth";
import ProductSlider from "app/components/SwiperSlider/ProductSlider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const WishListPage = () => {

  const {user} = useAuth()

  const navigate = useNavigate()

  const [wishListCount, setWishListCount] = useState(4)

  const [wishListItem, setWishListItem] = useState(
    [
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
    ]
  )

  const [relatedProducts, setRelatedProducts] = useState(
    [
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: true
      },
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: true
      },
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: true
      },
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: true
      },
      {
        id: 1,
        name: "Dummy Paint",
        price: "$360",
        rating: 4.5,
        reviews: 95,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: true
      },
      {
        id: 2,
        name: "Dummy Paint",
        price: "$700",
        rating: 4.8,
        reviews: 325,
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: false
    
      },
      {
        id: 3,
        name: "Dummy Paint Dummy Paint Dummy Paint Dummy Paint",
        price: "LKR 5990.00",
        rating: 4.7,
        reviews: 145,
        imgs: '/assets/images/demo_home_two.jpg',
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
        imgs: '/assets/images/demo_home_two.jpg',
        wishList: false
      },
    ]
  )

  return (
    <>
    <Container maxWidth="lg">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Box sx={{pt:2, width: '100%'}} display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap'} gap={'0.4em'}>
          <Typography>{`Wishlist(${wishListCount})`}</Typography>
          <Button color="secondary" variant="outlined">Move All To Bag</Button>
        </Box>
        <br></br>
        <ProductGrid removeWishList={true} products={wishListItem}/>
        <br></br>
        <br></br>
        <Box sx={{pt:2, width: '100%'}} display={'flex'} justifyContent={'space-between'} alignContent={'center'} flexWrap={'wrap'}>
          <Typography>Just For You</Typography>
          <Button color="secondary" variant="outlined" onClick={() => navigate('/product/filter-product')}>See All</Button>
        </Box>
        <ProductSlider>
          {
            relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product}/>
            ))
          }
        </ProductSlider>
      </Box>
    </Container>
    <Footer />
    </>
  );
};

export default WishListPage;
