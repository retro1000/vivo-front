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
} from "@mui/material";

import WichListIcon from "@mui/icons-material/FavoriteBorder";
import WichListIconActive from "@mui/icons-material/Favorite";
import ViewIcon from "@mui/icons-material/RemoveRedEye";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    const [mouseOver, setMouseOver] = useState(false)

    return (
        
            <Card
                onMouseEnter={()=>setMouseOver(true)}
                onMouseLeave={()=>setMouseOver(false)}
                sx={{ display: "flex", flexDirection: "column", cursor: 'pointer' }}
            >
                <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    image={product.image}
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
                    }}
                    >
                    NEW
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
                        <WichListIconActive sx={{color: '#ED005D'}}/>
                    </IconButton>
                    }
                    <IconButton sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", "&:hover": {backgroundColor: "rgba(255, 255, 255, 1)"} }} onClick={()=>navigate(`/product/view/${product.id}`)}>
                        <ViewIcon />
                    </IconButton>
                </Box>
                {
                    mouseOver?
                        <Box
                            sx={{background: 'rgba(0, 0, 0, 0.7)', width: '100%', height: '45px', position: 'absolute', bottom: '0', cursor: 'pointer', textAlign: 'center', alignContent: 'center', borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px'}}
                        >
                            <Typography sx={{color: 'white'}}>Add to cart</Typography>    
                        </Box> : ''
                }
                </Box>
                <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {product.name}
                </Typography>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                    }}
                >
                    <Typography variant="subtitle1" color="error">
                    {product.price}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                        ({product.reviews})
                    </Typography>
                    </Box>
                </Box>
                </CardContent>
            </Card>
            );
};

export default ProductCard;
