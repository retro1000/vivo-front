
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  IconButton,
} from "@mui/material";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: 250, objectFit: "cover" }}
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
          <IconButton sx={{ backgroundColor: "white" }}>
            <img
              src="http://b.io/ext_28-"
              alt="Wishlist"
              style={{ width: 24, height: 24 }}
            />
          </IconButton>
          <IconButton sx={{ backgroundColor: "white" }}>
            <img
              src="http://b.io/ext_29-"
              alt="Compare"
              style={{ width: 24, height: 24 }}
            />
          </IconButton>
        </Box>
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
