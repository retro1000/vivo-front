
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CategorySec from "./component/CategorySec";
import PopularProducts from "./component/PopularProducts";
import Banner from "./component/NewProduct";
import ColorOfTheYear from "./component/UnderUnderHero";
import PaintStories from "./component/UnderHero";
import LetsPaintHero from "./component/BottomHero";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Footer, ProductCard, SwiperSliderHeroAuto } from "app/components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductSlider from "app/components/SwiperSlider/ProductSlider";
import ProductCardSlide from "app/components/Card/ProductCardSlide";

const styles = {
  padding: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 10
};


const HomePage = () => {

  const navigate = useNavigate()

  const [showProducts, setShowProducts] = useState(
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
        isSale: true,
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

  const [popularProducts, setPopularProducts] = useState(
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
      <CssBaseline />
      <SwiperSliderHeroAuto slides={[{header: 'ELEVATE YOUR SPORTS PERFORMANCE', sub: "Get instant alerts for anyone who approaches, even they don't prsss the headphone.", act: 'Shop Now', fun: () => navigate('/product/filter-product'), img:'/assets/images/2099.jpg'}, {header: 'SHOP NOW', sub: '', act: 'Shop Now', fun: () => navigate('/product/filter-product'), img:'/assets/images/8735.jpg'}]}></SwiperSliderHeroAuto>
      <Box sx={( styles )}>
        <ProductSlider title={"Popular Products"}>
          {
            popularProducts.map((product, index) => (
              <ProductCard key={product.id} product={product}/>
            ))
          }
        </ProductSlider>
        <CategorySec />
        <Box display={'flex'} flexDirection={'column'} gap='1em' alignItems={'center'}>
          <Typography variant="h4">More to Love</Typography>
          <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'2em'} flexWrap={'wrap'} mt={4}>
              {showProducts.map((product, index) => (
                // <Grid item xs={12} sm={6} md={3} key={index}>
                  <ProductCardSlide product={product} />
                // </Grid>
              ))}
          </Grid>
        </Box>
        <Banner />
        <PaintStories/>
        <ColorOfTheYear/>
      </Box>
      <LetsPaintHero/>
      <Footer />
    </>
  );
};

export default HomePage;
