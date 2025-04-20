import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Fade,
} from '@mui/material';
import {
  ChevronRight,
  Star,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
} from '@mui/icons-material';
import throttle from 'lodash/throttle';
import FeaturedCategoriesHeading from './FeaturedCategoriesHeading';

// Shared styles
const cardStyles = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 2,
  boxShadow: 3,
  transition: 'box-shadow 300ms',
  willChange: 'transform, box-shadow',
  '&:hover': {
    boxShadow: 6,
  },
};

const backgroundAccentStyles = {
  position: 'absolute',
  right: -48,
  top: -48,
  width: 96,
  height: 96,
  borderRadius: '50%',
  opacity: 0.7,
  animation: 'pulseAccent 3s infinite',
  transition: 'all 500ms',
  zIndex: 0,
  willChange: 'transform, opacity',
  '&:hover': { transform: 'scale(2)', opacity: 0.5 },
};

const imageStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 500ms, filter 500ms, opacity 300ms',
  willChange: 'transform, filter, opacity',
};

// Separate CategoryCard component with memoization
const CategoryCard = React.memo(({ card, index, cardState, setCardState }) => {
  const isHovered = cardState.hovered === card.id;
  const tilt = cardState.tilt[card.id] || { x: 0, y: 0 };
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card
        sx={{
          ...cardStyles,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          animation: `growIn ${700 + index * 200}ms cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards`,
        }}
        onMouseEnter={() => setCardState((prev) => ({ ...prev, hovered: card.id }))}
        onMouseLeave={() => setCardState((prev) => ({ ...prev, hovered: null, tilt: { ...prev.tilt, [card.id]: { x: 0, y: 0 } } }))}
        onFocus={() => setCardState((prev) => ({ ...prev, hovered: card.id }))}
        onBlur={() => setCardState((prev) => ({ ...prev, hovered: null, tilt: { ...prev.tilt, [card.id]: { x: 0, y: 0 } } }))}
        tabIndex={0}
      >
        <Box sx={{ ...backgroundAccentStyles, background: card.color }} />

        <Box sx={{ position: 'relative', height: 300, overflow: 'hidden', zIndex: 1 }}>
          <CardMedia
            component="img"
            image={card.image}
            alt={card.name}
            sx={{
              ...imageStyles,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
              opacity: isImageLoaded ? 1 : 0,
            }}
            onLoad={() => setIsImageLoaded(true)}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent)',
              opacity: 0.8,
              transition: 'opacity 400ms',
              '&:hover': { opacity: 0.9 },
            }}
          />

          {isHovered && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                '&:before, &:after': {
                  content: '""',
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: 0,
                  animation: 'sparkle 1s infinite',
                },
                '&:before': {
                  top: '20%',
                  left: '30%',
                },
                '&:after': {
                  top: '70%',
                  left: '60%',
                  animationDelay: '0.3s',
                },
              }}
            />
          )}

          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 400ms',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'rotate(0) translateY(0) scale(1)' : 'rotate(12deg) translateY(8px) scale(0.8)',
              animation: isHovered ? 'bounceIn 0.5s' : 'none',
            }}
          >
            <ShoppingBag sx={{ width: 20, height: 20, color: '#fff' }} />
          </Box>
        </Box>

        <CardContent sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, color: '#fff', zIndex: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: -4,
                  left: -8,
                  right: -8,
                  bottom: -4,
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: 1,
                  backdropFilter: 'blur(4px)',
                  zIndex: -1,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  background: 'linear-gradient(90deg, #ffffff, #d1d5db)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    transform: 'translateX(-100%)',
                    animation: 'wipe 1.5s forwards',
                  },
                  // Fallback for unsupported browsers
                  '@supports not (-webkit-background-clip: text)': {
                    background: 'none',
                    WebkitTextFillColor: 'inherit',
                    color: '#fff',
                  },
                }}
              >
                {card.name}
              </Typography>
            </Box>
            {card.trending && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#dc2626',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  transition: 'transform 400ms',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <TrendingUp
                  sx={{
                    mr: 0.5,
                    width: 12,
                    height: 12,
                    animation: 'pulse 2s infinite',
                  }}
                />
                Trending
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ fontSize: '0.875rem', opacity: 0.9 }}>
              {card.items} items
            </Typography>
            {card.featured && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, color: '#fde047' }}>
                <Star sx={{ width: 12, height: 12, mr: 0.5, fill: '#fde047', stroke: '#fde047' }} />
                <Typography sx={{ fontSize: '0.75rem' }}>Featured</Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              mt: 2,
              overflow: 'hidden',
              transition: 'all 400ms',
              maxHeight: isHovered ? 96 : 0,
              opacity: isHovered ? 1 : 0,
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', color: '#e5e7eb', mb: 2, transition: 'all 400ms 100ms' }}>
              {card.description}
            </Typography>
            <Button
              variant="contained"
              sx={{
                background: '#fff',
                color: '#dc2626',
                textTransform: 'none',
                fontWeight: 'medium',
                px: 2,
                py: 1,
                borderRadius: 1,
                '&:hover': { background: '#dc2626', color: '#fff' },
              }}
              endIcon={<ArrowRight sx={{ width: 16, height: 16, transition: 'transform 300ms', '&:hover': { transform: 'translateX(4px)' } }} />}
            >
              Shop Now
            </Button>
          </Box>
        </CardContent>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            border: '2px solid transparent',
            borderRadius: 2,
            transition: 'border 500ms, box-shadow 500ms',
            '&:hover': {
              border: '2px solid transparent',
              background: 'linear-gradient(45deg, #ff6f61, #ffd700)',
              backgroundClip: 'border-box',
              WebkitBackgroundClip: 'border-box',
              boxShadow: '0 0 15px rgba(255,215,0,0.5)',
            },
          }}
        />
      </Card>
    </Grid>
  );
});

const FeaturedCategory = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardState, setCardState] = useState({
    hovered: null,
    tilt: {},
  });

  const categories = [
    {
      id: 1,
      name: 'Mobile Phone Accessories',
      description: 'Enhance your phone with the latest accessories.',
      image: 'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 248,
      trending: true,
      color: '#3b82f6', // blue-500
    },
    {
      id: 2,
      name: "Men's Shoes",
      description: 'Stylish and comfortable shoes for men.',
      image: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 156,
      trending: true,
      color: '#ef4444', // red-500
    },
    {
      id: 3,
      name: "Women's Shoes",
      description: 'Elegant footwear for every occasion.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 187,
      trending: false,
      color: '#8b5cf6', // purple-500
    },
    {
      id: 4,
      name: 'Clothing & Apparel',
      description: 'Trendy outfits for all seasons.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 324,
      trending: true,
      color: '#f59e0b', // amber-500
    },
    {
      id: 5,
      name: 'Gift Items',
      description: 'Perfect presents for any celebration.',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 98,
      trending: false,
      color: '#10b981', // emerald-500
    },
  ];

  // Throttled mouse move handler
  const handleMouseMove = useCallback(
    throttle((e, cardId) => {
      if (cardState.hovered !== cardId) return;
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = Math.min(Math.max((centerY - y) / centerY, -1), 1) * 8; // Limit tilt to ±8 degrees
      const tiltY = Math.min(Math.max((x - centerX) / centerX, -1), 1) * 8;
      setCardState((prev) => ({
        ...prev,
        tilt: { ...prev.tilt, [cardId]: { x: tiltX, y: tiltY } },
      }));
    }, 50),
    [cardState.hovered]
  );

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Box sx={{ py: 5, background: '#fff' }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto', my: 'auto', height: 'max-content' }}>
        {/* <Fade in={isVisible} timeout={700}>
          <Box
            sx={{
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '100ms',
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  background: '#f44336',
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 'medium',
                  mr: 2,
                  textTransform: 'uppercase',
                }}
              >
                Featured
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color: '#1f2937', position: 'relative' }}
              >
                {Array.from('New Arrival').map((letter, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{
                      display: 'inline-block',
                      transition: 'all 0.3s ease',
                      transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
                      opacity: isVisible ? 1 : 0,
                      transitionDelay: `${100 + index * 60}ms`,
                      minWidth: letter === ' ' ? '0.5em' : 'auto',
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </Box>
                ))}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#4b5563', mt: 1 }}>
                Discover our curated selection of trending products
              </Typography>
              <Button
                variant="text"
                sx={{
                  color: '#dc2626',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  '&:hover': { color: '#b91c1c' },
                }}
                endIcon={<ChevronRight sx={{ transition: 'transform 300ms', '&:hover': { transform: 'translateX(4px)' } }} />}
              >
                View All Categories
              </Button>
            </Box>
          </Box>
        </Fade> */}

        <FeaturedCategoriesHeading isLoaded={true} />
        {/* <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -24,
              left: -24,
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: '#fef2f2',
              opacity: 0.7,
              animation: 'pulse 2s infinite',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 128,
              right: -24,
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#eff6ff',
              opacity: 0.7,
              animation: 'ping 2s infinite',
            }}
          />
        </Box> */}

        <Grid container spacing={2}>
          {categories.map((card, index) => (
            <CategoryCard
              key={card.id}
              card={card}
              index={index}
              cardState={cardState}
              setCardState={setCardState}
              onMouseMove={(e) => handleMouseMove(e, card.id)}
            />
          ))}
        </Grid>

        {/* <Box sx={{ width: '100%', height: 64, position: 'relative', mt: 6, overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 128,
              background: '#fef2f2',
              borderRadius: '50%',
              top: 0,
              transform: 'translateY(40px)',
              transition: 'transform 700ms',
              '&:hover': { transform: 'translateY(24px)' },
            }}
          />
        </Box> */}
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.7; }
          75% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes pulseAccent {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.3); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.7; }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        @keyframes wipe {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes growIn {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
});

export default FeaturedCategory;