import React, { useState, useCallback } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { LocalShipping, CheckCircle } from '@mui/icons-material';
import { ReviewStatsCard } from '..';
import { useFormatter } from 'app/hooks/useFormatter';

// Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = React.memo(({ product }) => {
  const theme = useTheme();
  const { formatToLKR, formatSoldCount } = useFormatter();

  return (
    <Card
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        maxWidth: "200px", // Limit the maximum width
        position: 'relative',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
        <Stack direction="row" spacing={1}>
          <Box
            sx={{
              backgroundColor: theme.palette.custom.trendingRed, // #ef4444
              color: theme.palette.custom.white,
              fontSize: '12px',
              fontWeight: 'medium',
              px: 2,
              py: 0.5,
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 'max-content',
                height: 2,
                backgroundColor: theme.palette.custom.white,
                borderRadius: '50%',
                animation: 'pulse 1.5s infinite',
              }}
            />
            <span>Trending</span>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.custom.primaryBlue, // #2563eb
              color: theme.palette.custom.white,
              fontSize: '12px',
              fontWeight: 'medium',
              px: 2,
              py: 0.5,
              borderRadius: '9999px',
            }}
          >
            Hot Shoelaces
          </Box>
        </Stack>
      </Box>

      {/* Limited Time Offer Badge */}
      <Box sx={{ position: 'absolute', top: 48, left: 12, zIndex: 10 }}>
        <Box
          sx={{
            backgroundColor: theme.palette.custom.amberYellow, // #eab308
            color: theme.palette.custom.white,
            fontSize: '12px',
            fontWeight: 'medium',
            px: 2,
            py: 0.5,
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Limited Offer
        </Box>
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          width: '100%',
          // p: 3,
        }}
      >
        <Box sx={{ borderRadius: 2, overflow: 'hidden', backgroundColor: theme.palette.custom.white }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            loading="lazy"
            sx={{
              aspectRatio: "1 / 1",
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Product Info */}
      <CardContent sx={{ p: 0 }}>


        <Typography
          variant="body1"
          component="div"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal", // Allows text to wrap to multiple lines
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit the text to 2 lines
            fontSize: "13px",
            lineHeight: 1.2,
            mb: 0.2,
            mt: 0.5
          }}
        >
          {product.title}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" display={'flex'} gap={1} justifyContent={'flex-start'}>
          <ReviewStatsCard
            size={"small"}
            reviewCount={product.reviews}
            rating={product.rating}
            id={product.id}
            isSingleStar={true}
          ></ReviewStatsCard>
          <Box
            sx={{
              backgroundColor: theme.palette.custom.lightBlue, // #eff6ff
              color: theme.palette.custom.primaryBlue, // #2563eb
              fontSize: '12px',
              ml: -4,
              fontWeight: 'medium',
              px: 2,
              py: 0.5,
              borderRadius: '9999px',
            }}
          >
            {formatSoldCount(product.sold)}
          </Box>
        </Stack>

        {/* Price and Discount */}
        <Stack direction="row" alignItems="center" spacing={1} mt={1} >
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: "1rem", color: theme.palette.custom.trendingRed }}>
            {formatToLKR(isDiscounted ? product.price : product.originalPrice)}
          </Typography>
          {isDiscounted && (<><Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: "0.8rem", textDecoration: 'line-through' }}>
            {formatToLKR(product.originalPrice)}
          </Typography>
            <Box
              sx={{
                backgroundColor: theme.palette.custom.trendingRed, // #ef4444
                color: theme.palette.custom.white,
                fontSize: '12px',
                fontWeight: 'bold',
                px: 1,
                py: 0.5,
                borderRadius: '9999px',
                animation: 'pulse 1.5s infinite',
              }}
            >
              {`${product.discount}% OFF`}
            </Box></>)}
        </Stack>

        {/* Benefits */}
        {isFreehipping && (<Stack spacing={1}>
          <Stack direction="row" alignItems="center" sx={{ color: theme.palette.custom.shippingGreen, fontSize: '14px', fontWeight: 'medium' }}>
            <LocalShipping sx={{ fontSize: 16, mr: 1 }} />
            <Typography sx={{ fontSize: '14px' }}>Free Shipping</Typography>
          </Stack>
        </Stack>)}
      </CardContent>
      {/* CSS Keyframes for Pulse Animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Card>
  );
});

// Default export with sample product data
const ProductCardWrapper = () => {
  const product = {
    title: 'Original AF1 Shoelaces',
    price: 4500,
    originalPrice: 5900,
    discount: 58,
    rating: 4.3,
    reviews: 100,
    sold: 10000,
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    isFreehipping: false,
    isDiscounted: true
  };

  return <ProductCard product={product} />;
};

export default ProductCardWrapper;