import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Grid,
  Badge,
  Stack,
  useTheme,
} from '@mui/material';
import {
  AccessTime,
  ShoppingCart,
  ChevronRight,
  Favorite,
  Star,
  LocalShipping,
  FlashOn,
  CalendarToday,
  Store,
  ContentCut,
} from '@mui/icons-material';
import { ProductCardWrapper, TodaysDealsCard } from 'app/components';
import { useTimer } from 'app/hooks/useTimer';
import { themeColors } from 'app/components/MatxTheme/themeColors';

// Static product data outside the component to prevent re-creation
const bundleDealsData = [
  {
    id: 'b1',
    title: 'Original AF1 Shoelaces Combination White',
    price: 'US $1.39',
    originalPrice: 'US $3.38',
    rating: '4.9',
    sold: '10,000+ sold',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    freeShipping: true,
    label: 'Trending',
  },
  {
    id: 'b2',
    title: '2024 New Ultra Thin Hard Shell Laptop Case',
    price: 'US $8.09',
    originalPrice: 'US $17.05',
    rating: '4.7',
    sold: '3,000+ sold',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    freeShipping: true,
  },
];

const superDealsData = [
  {
    id: 's1',
    title: 'Original Xiaomi 14 Ultra Cona Skin Case',
    price: 'US $29.51',
    originalPrice: 'US $114.69',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-74%',
    label: 'Hot',
  },
  {
    id: 's2',
    title: "Men's Classic Tactical Backpack Travel Sport",
    price: 'US $6.41',
    originalPrice: 'US $7.35',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-12%',
    freeShipping: true,
  },
];

const bigSaveData = [
  {
    id: 'bs1',
    title: 'QCY AilyBuds Clear Wireless Earphones',
    price: 'US $20.03',
    originalPrice: 'US $42.77',
    savings: 'You save US $22.74',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    label: 'Best Seller',
  },
  {
    id: 'bs2',
    title: "BANGE Expandable Men's Backpack Business Travel",
    price: 'US $52.25',
    originalPrice: 'US $114.68',
    savings: 'You save US $62.43',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    freeShipping: true,
  },
];

const flashSalesData = [
  {
    id: 'fs1',
    title: 'Smart Watch Series 7 Heart Rate Monitor',
    price: 'US $15.99',
    originalPrice: 'US $49.99',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-68%',
    label: 'Lightning',
  },
  {
    id: 'fs2',
    title: 'Wireless Bluetooth Earbuds Noise Cancelling',
    price: 'US $9.99',
    originalPrice: 'US $29.99',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-67%',
    freeShipping: true,
  },
];

const seasonalSalesData = [
  {
    id: 'ss1',
    title: 'Winter Thermal Fleece Jacket Waterproof',
    price: 'US $23.50',
    originalPrice: 'US $58.75',
    savings: 'You save US $35.25',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    label: 'Seasonal',
  },
  {
    id: 'ss2',
    title: 'Outdoor Camping Tent Waterproof 4-Person',
    price: 'US $42.99',
    originalPrice: 'US $89.99',
    savings: 'You save US $47.00',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    freeShipping: true,
  },
];

const storeWideSalesData = [
  {
    id: 'sw1',
    title: 'Official Store Bluetooth 5.0 Gaming Headset',
    price: 'US $25.75',
    originalPrice: 'US $69.99',
    rating: '4.8',
    sold: '5,000+ sold',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-63%',
  },
  {
    id: 'sw2',
    title: 'Premium Leather Wallet Card Holder RFID',
    price: 'US $11.99',
    originalPrice: 'US $29.99',
    rating: '4.9',
    sold: '8,500+ sold',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    freeShipping: true,
  },
];

const couponSalesData = [
  {
    id: 'cs1',
    title: 'Kitchen Multi-Function Food Processor',
    price: 'US $34.50',
    originalPrice: 'US $89.99',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-62%',
    label: 'Extra -$5',
  },
  {
    id: 'cs2',
    title: 'Portable USB Power Bank Fast Charging 20000mAh',
    price: 'US $18.99',
    originalPrice: 'US $45.99',
    image: 'https://ae01.alicdn.com/kf/Sd6500c9aaf3b4c1e82ded8560810a46dR.jpg',
    discount: '-59%',
    label: 'Extra -$3',
  },
];

// Timer component to isolate timer state updates
const Timer = React.memo(({ initialTime, onTimeUpdate, sx, color, isPaused = false }) => {
  const timer = useTimer(initialTime, onTimeUpdate, isPaused);

  const formatTime = useCallback((time) => String(time).padStart(2, '0'), []);

  return (
    <Button
      sx={{
        background: 'white',
        color,
        borderRadius: 'full',
        px: { xs: 1.5, sm: 2 },
        py: 0.5,
        fontSize: { xs: '0.75rem', sm: '0.875rem' },
        fontWeight: 'medium',
        textTransform: 'none',
        ...sx,
      }}
      endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
    >
      {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
    </Button>
  );
});

// Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = memo(({ product, category, wishlist, toggleWishlist, activeHover, setActiveHover }) => {
  const theme = useTheme();
  const isWishlisted = wishlist.some((item) => item.id === product.id);
  const isHovered = activeHover === product.id;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '8px',
        transition: 'all 300ms',
        boxShadow: theme.shadows[2],
        '&:hover': { boxShadow: theme.shadows[10] },
        background: 'white',
      }}
      onMouseEnter={() => setActiveHover(product.id)}
      onMouseLeave={() => setActiveHover(null)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          loading="lazy" // Lazy load images
          sx={{
            width: '100%',
            height: 'auto',
            aspectRatio: '1 / 1', // Maintain square aspect ratio
            objectFit: 'cover',
            transition: 'transform 500ms ease-in-out',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {product.discount && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              background: 'red.500',
              color: 'white',
              fontWeight: 'bold',
              px: 1,
              py: 0.5,
              borderBottomRightRadius: '8px',
            }}
          >
            {product.discount}
          </Box>
        )}
        {product.label && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              background: 'orange.500',
              color: 'white',
              fontSize: { xs: '10px', sm: '12px' }, // Responsive font size
              px: 1,
              py: 0.5,
              borderRadius: '8px',
            }}
          >
            {product.label}
          </Box>
        )}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            p: 1,
            borderRadius: '50%',
            background: isWishlisted ? 'red.100' : 'gray.100',
            color: isWishlisted ? 'red.500' : 'gray.500',
            '&:hover': { background: 'red.100', color: 'red.500' },
          }}
        >
          <Favorite sx={{ fontSize: { xs: 16, sm: 18 }, fill: isWishlisted ? 'currentColor' : 'none' }} />
        </IconButton>
      </Box>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Typography
          sx={{
            fontSize: { xs: '12px', sm: '14px' },
            fontWeight: 'medium',
            color: 'gray.800',
            height: { xs: '36px', sm: '40px' },
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.title}
        </Typography>
        <Stack direction="row" alignItems="baseline" spacing={1} sx={{ mt: 1 }}>
          <Typography sx={{ fontSize: { xs: '16px', sm: '18px' }, fontWeight: 'bold', color: 'red.500' }}>
            {product.price}
          </Typography>
          <Typography sx={{ fontSize: { xs: '10px', sm: '12px' }, color: 'gray.500', textDecoration: 'line-through' }}>
            {product.originalPrice}
          </Typography>
        </Stack>
        {product.savings && (
          <Typography sx={{ fontSize: { xs: '10px', sm: '12px' }, color: 'red.500', fontWeight: 'medium', mt: 0.5 }}>
            {product.savings}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
          {product.rating && (
            <Stack direction="row" alignItems="center" sx={{ color: 'yellow.500', mr: 1 }}>
              <Star sx={{ fontSize: { xs: 12, sm: 14 }, fill: 'currentColor' }} />
              <Typography sx={{ ml: 0.5, fontSize: { xs: '10px', sm: '12px' } }}>{product.rating}</Typography>
            </Stack>
          )}
          {product.sold && (
            <Typography sx={{ fontSize: { xs: '10px', sm: '12px' }, color: 'gray.500' }}>{product.sold}</Typography>
          )}
        </Stack>
        {product.freeShipping && (
          <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'green.600' }}>
            <LocalShipping sx={{ fontSize: { xs: 10, sm: 12 }, mr: 0.5 }} />
            <Typography sx={{ fontSize: { xs: '10px', sm: '12px' } }}>Free Shipping</Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
});

// Memoized CartBadge component
const CartBadge = memo(({ cart, addToCart, theme }) => {
  if (cart.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, sm: 24 },
        right: { xs: 16, sm: 24 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 1,
        zIndex: 1300,
      }}
    >
      <Badge
        badgeContent={cart.length}
        sx={{
          '& .MuiBadge-badge': {
            background: 'red.500',
            color: 'white',
            fontSize: '12px',
            width: 24,
            height: 24,
            borderRadius: '50%',
            fontWeight: 'bold',
          },
        }}
      >
        <IconButton
          sx={{
            background: 'white',
            p: { xs: 1, sm: 1.5 },
            borderRadius: '50%',
            boxShadow: theme.shadows[4],
            border: '1px solid',
            borderColor: 'orange.500',
            '&:hover': { background: 'grey.50' },
          }}
          onClick={() => addToCart(cart[cart.length - 1])}
        >
          <ShoppingCart sx={{ fontSize: { xs: 20, sm: 24 }, color: 'orange.500' }} />
        </IconButton>
      </Badge>
      <Card
        sx={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: theme.shadows[4],
          p: { xs: 1.5, sm: 2 },
          maxWidth: { xs: 250, sm: 300 },
          animation: 'slideIn 0.3s ease-out',
        }}
      >
        <Typography sx={{ fontSize: { xs: '12px', sm: '14px' }, fontWeight: 'bold', mb: 1 }}>
          Recent additions:
        </Typography>
        {cart.slice(-2).map((item, i) => (
          <Box
            key={i}
            sx={{
              py: 0.5,
              borderBottom: i < cart.slice(-2).length - 1 ? '1px solid' : 'none',
              borderColor: 'grey.100',
            }}
          >
            <Typography sx={{ fontSize: { xs: '10px', sm: '12px' } }}>
              {item.title.substring(0, 20)}... - {item.price}
            </Typography>
          </Box>
        ))}
        <Button
          sx={{
            width: '100%',
            mt: 1,
            py: 1,
            background: 'orange.500',
            color: 'white',
            borderRadius: '8px',
            fontSize: { xs: '12px', sm: '14px' },
            fontWeight: 'medium',
            textTransform: 'none',
            '&:hover': { background: 'orange.600' },
          }}
        >
          View Cart
        </Button>
      </Card>
    </Box>
  );
});

// Memoized WishlistBadge component
const WishlistBadge = memo(({ wishlist, theme }) => {
  return (
    <Badge
      badgeContent={wishlist.length}
      sx={{
        '& .MuiBadge-badge': {
          background: 'red.500',
          color: 'white',
          fontSize: '12px',
          width: 24,
          height: 24,
          borderRadius: '50%',
          fontWeight: 'bold',
          display: wishlist.length > 0 ? 'flex' : 'none',
        },
      }}
    >
      <IconButton
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          background: 'white',
          p: { xs: 1, sm: 1.5 },
          borderRadius: '50%',
          boxShadow: theme.shadows[4],
          border: '1px solid',
          borderColor: 'red.500',
          '&:hover': { background: 'grey.50' },
        }}
      >
        <Favorite sx={{ fontSize: { xs: 20, sm: 24 }, color: 'red.500', fill: wishlist.length > 0 ? 'currentColor' : 'none' }} />
      </IconButton>
    </Badge>
  );
});

// Main component
const TodaysDeals = () => {
  const theme = useTheme();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [timers, setTimers] = useState({
    superDeals: { hours: 10, minutes: 35, seconds: 40 },
    flashSales: { hours: 5, minutes: 35, seconds: 40 },
  });
  const [activeHover, setActiveHover] = useState(null);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  }, []);

  const handleTimeUpdate = useCallback((timerKey, newTime) => {
    setTimers((prevTimers) => ({
      ...prevTimers,
      [timerKey]: newTime,
    }));
  }, []);

  // Memoize coupon sales data to prevent re-computation
  const couponSalesExtended = useMemo(() => [...couponSalesData, ...couponSalesData], []);

  const [animationState, setAnimationState] = useState(0);

  useEffect(() => {
    setAnimationState(0);
    const timer = setTimeout(() => setAnimationState(1), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        width: '100%', // Responsive width
        // maxWidth: 1200,
        mx: 'auto',
        px: { xs: 1, sm: 2, md: 3 }, // Responsive padding
        py: { xs: .5, sm: 1 },
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: .2,
        }}
      >
        Today's Deals
      </Typography>
      <Typography
        variant="body2" 
        sx={{
          textAlign: 'center',
          // color: 'gray.500',
          mb: { xs: 2, sm: 4 },
        }}
      >
        Limited-time offers on top products
      </Typography> */}

      <Box sx={{ textAlign: 'center', mb: 1.4, position: 'relative', py: .3 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2rem' },
            fontWeight: 'bold',
            color: theme.palette.custom.titleGray,
            mb: .5,
            position: 'relative',
            height: 'max-content',
          }}
        >
          {("Today's Deals").split('').map((letter, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: 'inline-block',
                transition: 'all 0.3s ease',
                transform:
                  animationState >= 1 ? 'translateY(0)' : 'translateY(32px)',
                opacity: animationState >= 1 ? 1 : 0,
                transitionDelay: `${100 + index * 60}ms`,
              }}
            >
              {letter}
            </Box>
          ))}
          {/* <Badge
                animationState={animationState}
                sx={{
                  background: current.colors.badgeStyle.backgroundColor,
                  color: current.colors.badgeStyle.color,
                }}
                rotate
              >
                {current.colors.badge}
              </Badge> */}
        </Typography>

        <Box sx={{ position: 'relative', height: 'max-content', mb: 1 }}>
          <Box
            sx={{
              height: 4,
              background: theme.palette.custom.trendingRed,
              borderRadius: '9999px',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              transition: 'all 0.7s ease',
              transitionDelay: '300ms',
              width: animationState >= 1 ? 96 : 0,
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: '.9rem',
            color: theme.palette.custom.darkGray,
            transform:
              animationState >= 1 ? 'translateY(0)' : 'translateY(32px)',
            opacity: animationState >= 1 ? 1 : 0,
            transition: 'all 0.7s ease',
            transitionDelay: '500ms',
          }}
        >
          Limited-time offers on top products
        </Typography>

        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Box
            sx={{
              position: 'absolute',
              left: '25%',
              top: 0,
              color: theme.palette.custom.trendingRed,
              fontSize: '2.25rem',
              transition: 'all 1s ease',
              opacity: animationState >= 1 ? 0.2 : 0,
              animation: animationState >= 1 ? 'float1 6s ease-in-out infinite' : 'none',
            }}
          >
            ★
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: '25%',
              bottom: 16,
              color: theme.palette.custom.lightOrange,
              fontSize: '1.875rem',
              transition: 'all 1s ease',
              opacity: animationState >= 1 ? 0.2 : 0,
              animation: animationState >= 1 ? 'float2 7s ease-in-out infinite' : 'none',
            }}
          >
            ★
          </Box>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ mb: { xs: 2, sm: 3 } }} display={'flex'} justifyContent={'center'} alignItems={'flex-start'}>
        {/* Bundle Deals Card */}
        <TodaysDealsCard />
        {/* <Grid item>
          <Card sx={{ borderRadius: '8px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #f97316, #fb923c)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Star sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                Bundle deals
              </Typography>
              <Button
                sx={{
                  background: 'white',
                  color: 'orange.500',
                  borderRadius: '9999px',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { background: 'orange.50' },
                }}
                endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              >
                3 from US $2.99
              </Button>
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {bundleDealsData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid> */}

        {/* SuperDeals Card */}
        <Grid item>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #ef4444, #f87171)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccessTime sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                SuperDeals
              </Typography>
              <Timer
                initialTime={timers.superDeals}
                onTimeUpdate={(newTime) => handleTimeUpdate('superDeals', newTime)}
                color="red.500"
              />
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {superDealsData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Big Save Card */}
        <Grid item>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #8b5cf6, #a78bfa)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: { xs: '18px', sm: '20px' }, fontWeight: 'bold', color: 'white' }}>
                Big <Typography component="span" sx={{ color: 'yellow.300' }}>S</Typography>ave
              </Typography>
              <Button
                sx={{
                  background: 'white',
                  color: 'purple.500',
                  borderRadius: '9999px',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { background: 'purple.50' },
                }}
                endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              >
                500+ Brands
              </Button>
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {bigSaveData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Flash Sales Card */}
        <Grid item>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #eab308, #facc15)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FlashOn sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                Flash Sales
              </Typography>
              <Timer
                initialTime={timers.flashSales}
                onTimeUpdate={(newTime) => handleTimeUpdate('flashSales', newTime)}
                color="yellow.600"
              />
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {flashSalesData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Seasonal Sales Card */}
        <Grid item>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #22c55e, #4ade80)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CalendarToday sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                Seasonal Sales
              </Typography>
              <Button
                sx={{
                  background: 'white',
                  color: 'green.600',
                  borderRadius: '9999px',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { background: 'green.50' },
                }}
                endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              >
                Spring Collection
              </Button>
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {seasonalSalesData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        {/* Store-Wide Sales Card */}
        <Grid item>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Store sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                Store-Wide Sales
              </Typography>
              <Button
                sx={{
                  background: 'white',
                  color: 'blue.600',
                  borderRadius: '9999px',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { background: 'blue.50' },
                }}
                endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              >
                Top Stores
              </Button>
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {storeWideSalesData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        {/* Coupon Sales Card */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: theme.shadows[4], background: 'white' }}>
            <Box
              sx={{
                background: 'linear-gradient(to right, #ec4899, #f472b6)',
                px: { xs: 1.5, sm: 2 },
                py: { xs: 1.5, sm: 2 },
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '18px', sm: '20px' },
                  fontWeight: 'bold',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ContentCut sx={{ fontSize: { xs: 18, sm: 20 }, mr: 1 }} />
                Coupon Sales
              </Typography>
              <Button
                sx={{
                  background: 'white',
                  color: 'pink.600',
                  borderRadius: '9999px',
                  px: { xs: 1.5, sm: 2 },
                  py: 0.5,
                  fontSize: { xs: '12px', sm: '14px' },
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { background: 'pink.50' },
                }}
                endIcon={<ChevronRight sx={{ fontSize: { xs: 14, sm: 16 } }} />}
              >
                Extra $3-$20 OFF
              </Button>
            </Box>
            <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ p: { xs: 1.5, sm: 2 } }}>
              {couponSalesExtended.map((product, index) => (
                <Grid item lg={3} key={`${product.id}-${index}`}>
                  <ProductCardWrapper />
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TodaysDeals;