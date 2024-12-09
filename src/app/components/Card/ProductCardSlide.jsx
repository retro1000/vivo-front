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
  Grid,
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

    const cardRef = useRef(null)

    const swiperRef = useRef(null)

    const handleMouseMove = (e) => {
        const swiperInstance = swiperRef.current?.swiper;
        if (!swiperInstance) return;
        
        swiperInstance.slideTo((e.clientX-e.currentTarget.getBoundingClientRect().left)/swiperInstance.width * swiperInstance.slides.length);
    }

    return (
        <Grid
            item
            xs={12} // Full-width on extra-small screens
            sm={6}  // 2 cards per row on small screens
            md={4}  // 3 cards per row on medium screens
            lg={3}  // 4 cards per row on large screens
            key={product.id}
        >
            <GlobalStyles
                styles={{
                    ".swiper-pagination-bullet-active": {
                        backgroundColor: themeColors.red.palette.primary.main,
                    },
                }}
            />
            <Card
                ref={cardRef}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                    width: "100%", // Fill the width of the parent container
                    aspectRatio: "3 / 4", // Maintain consistent aspect ratio
                    boxSizing: "border-box",
                    overflow: "hidden",
                    // minWidth: "210px", // Ensure the card doesn’t shrink too much
                    maxWidth: "280px", // Limit the maximum width
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
                                    aspectRatio: "1 / 1",
                                    // height: 250,
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
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column", padding: '0em 0.5em 0em 0.5em', paddingBottom: '0px !important', minHeight: '90.81px !important' }}
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
                            alignItems: "center",
                            flexWrap: 'wrap',
                            // mt: 0.1,
                            // gap: 1
                        }}
                    >
                        <Typography variant="subtitle1" color="error" mt={0.1} mr={1}>
                            {product.price}
                        </Typography>
                        {
                            product.realPrice ?
                                <Typography variant="subtitle2" color="textSecondary" sx={{textDecoration: 'line-through', fontSize: '0.8rem'}} mt={0.1}>
                                    {product.realPrice}
                                </Typography> : ''
                        }
                    </Box>
                </CardContent>
            </Card>
         </Grid>
    );
};

export default ProductCardSlide;
