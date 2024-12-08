import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Box,
  IconButton,
  GlobalStyles,
  Tooltip,
} from "@mui/material";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';

import WichListIcon from "@mui/icons-material/FavoriteBorder";
import BinIcon from "@mui/icons-material/Delete";
import WichListIconActive from "@mui/icons-material/Favorite";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import { ReviewStatsCard } from "..";
import { themeColors } from "../MatxTheme/themeColors";

const ProductCardSlide = ({ product, removeWishList, key }) => {

    const navigate = useNavigate();

    const swiperRef = useRef(null)

    const handleMouseMove = (e) => {
        const swiperInstance = swiperRef.current?.swiper;
        if (!swiperInstance) return;
        
        swiperInstance.slideTo((e.clientX-e.currentTarget.getBoundingClientRect().left)/swiperInstance.width * swiperInstance.slides.length);
    }

    return (
        <>
            <GlobalStyles
                styles={{
                    ".swiper-pagination-bullet-active": {
                        backgroundColor: themeColors.red.palette.primary.main,
                    },
                }}
            />
            <Card
                sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    cursor: 'pointer', 
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    width: 250,
                    height: '374px' 
                    // maxWidth: 350
                }}
            >
                <Box 
                    sx={{ position: "relative", borderRadius: '8px' }}
                    onMouseMove={handleMouseMove}
                >
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={0.1}
                        centeredSlides={true}
                        // autoplay={{
                        //     delay: 2500,
                        //     disableOnInteraction: true,
                        //     pauseOnMouseEnter: true,
                        // }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {product.imgs.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <Box
                                    sx={{
                                    backgroundImage: "url(" + slide + ")",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: 250,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    width: '100%',
                                    // borderRadius: '8px',
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px'
                                    }}
                                >
                                </Box>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {product.isNew && (
                    <Typography
                        variant="caption"
                        sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            backgroundColor: "#00c950",
                            color: "#fafafa",
                            padding: "4px 12px",
                            borderRadius: 0.5,
                            zIndex: '10'
                        }}
                    >
                        NEW
                    </Typography>
                    )}
                    {product.isSale && (
                        <Typography
                        variant="caption"
                        sx={{
                            position: "absolute",
                            top: product.isNew?45:10,
                            left: 10,
                            backgroundColor: themeColors.red.palette.primary.main,
                            color: "#fafafa",
                            padding: "4px 12px",
                            borderRadius: 0.5,
                            zIndex: '10'
                        }}
                        >
                        SALE
                        </Typography>
                    )}   
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            zIndex: '10'
                        }}
                    >
                        {
                            removeWishList ? (
                                <IconButton
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                    }}
                                >
                                    <BinIcon />
                                </IconButton>
                            ) :
                                (!product.wishList ? (
                                    <IconButton
                                        sx={{
                                            backgroundColor: "rgba(255, 255, 255, 0.6)",
                                            "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                        }}
                                    >
                                        <WichListIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton
                                    sx={{
                                        backgroundColor: "rgba(255, 255, 255, 0.6)",
                                        "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                                    }}
                                    >
                                        <WichListIconActive sx={{ color: themeColors.red.palette.primary.main }} />
                                    </IconButton>
                                )
                            )
                        }
                        <IconButton
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.6)",
                                "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                            }}
                            onClick={() => navigate(`/product/view/${product.id}`)}
                        >
                            <ViewIcon />
                        </IconButton>
                    </Box>
                </Box>

                <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", padding: '0.5em 0.5em 0.2em 0.5em' }}
                >
                    <Tooltip title={product.name}>
                        <Typography 
                            variant="body1" 
                            component="div" 
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal', // Allows text to wrap to multiple lines
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,  // Limit the text to 2 lines
                                fontSize: '14px'
                            }}
                            >
                            {product.name}
                        </Typography>
                    </Tooltip>
                    <ReviewStatsCard size={'small'} reviewCount={product.reviews} rating={product.rating} id={product.id}></ReviewStatsCard>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            mt: 1,
                            gap: 1
                        }}
                    >
                        <Typography variant="subtitle2" color="error">
                            {product.price}
                        </Typography>
                        {
                            product.realPrice ?
                                <Typography variant="subtitle2" color="textSecondary" sx={{textDecoration: 'line-through'}}>
                                    {product.realPrice}
                                </Typography> : ''
                        }
                    </Box>
                </CardContent>
            </Card>
         </>
    );
};

export default ProductCardSlide;
