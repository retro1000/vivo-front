import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";

import WichListIcon from "@mui/icons-material/FavoriteBorder";
import WichListIconActive from "@mui/icons-material/Favorite";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import { ReviewStatsCard } from "..";
import { themeColors } from "../MatxTheme/themeColors";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    return (
        
            <Card
                sx={{ 
                    display: "flex",
                    flexDirection: "column", 
                    cursor: 'pointer', 
                    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.2)', 
                    borderRadius: '8px', 
                    width: 250, 
                    // maxWidth: 280, 
                    transition: 'transform 0.1s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },}}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        image={product.imgs}
                        alt={product.name}
                        sx={{ height: 250, objectFit: "cover", borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}
                    />
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
                        }}
                    >
                        {
                        product.wishList ?
                        <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", "&:hover": {backgroundColor: "rgba(255, 255, 255, 1)"} }}>
                            <WichListIcon />
                        </IconButton> : 
                        <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", "&:hover": {backgroundColor: "rgba(255, 255, 255, 1)"} }}>
                            <WichListIconActive sx={{color: themeColors.red.palette.primary.main}}/>
                        </IconButton>
                        }
                        <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", "&:hover": {backgroundColor: "rgba(255, 255, 255, 1)"} }} onClick={()=>navigate(`/product/view/${product.id}`)}>
                            <ViewIcon />
                        </IconButton>
                    </Box>
                </Box>
                <CardContent
                    sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                    <Tooltip title={product.name}>
                        <Typography variant="h6" component="div" sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            {product.name}
                        </Typography>
                    </Tooltip>
                    <ReviewStatsCard size={'small'} reviewCount={product.reviews} rating={product.rating}></ReviewStatsCard>
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
            );
};

export default ProductCard;
