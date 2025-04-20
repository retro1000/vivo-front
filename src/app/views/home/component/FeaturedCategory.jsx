import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Fade,
  Grow,
} from '@mui/material';
import {
  ChevronRight,
  Star,
  TrendingUp,
  ShoppingBag,
  ArrowRight,
} from '@mui/icons-material';
import Masonry from 'react-masonry-css';
import { useInView } from 'react-intersection-observer';

export default function FeaturedCategory({ featuredCategories }) {
  const [hoverCategory, setHoverCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    {
      id: 1,
      name: 'Mobile Phone Accessories',
      image:
        'https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 248,
      trending: true,
      color: '#3b82f6', // blue-500
      height: 320, // Vary card heights for dynamic layout
    },
    {
      id: 2,
      name: "Men's Shoes",
      image:
        'https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 156,
      trending: true,
      color: '#ef4444', // red-500
      height: 280,
    },
    {
      id: 3,
      name: "Women's Shoes",
      image:
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 187,
      trending: false,
      color: '#8b5cf6', // purple-500
      height: 300,
    },
    {
      id: 4,
      name: 'Clothing & Apparel',
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 324,
      trending: true,
      color: '#f59e0b', // amber-500
      height: 340,
    },
    {
      id: 5,
      name: 'Gift Items',
      image:
        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      featured: true,
      items: 98,
      trending: false,
      color: '#10b981', // emerald-500
      height: 260,
    },
  ];

  // Trigger header animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Breakpoints for masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  // Category card component with in-view animation
  const CategoryCard = ({ category }) => {
    const { ref, inView } = useInView({
    //   triggerOnce: true,
    //   threshold: 0.1,
    });

    return (
      <Grow in={inView} timeout={700} style={{background: 'transparent'}}>
        <Card
          ref={ref}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: 3,
            transition: 'transform 300ms, box-shadow 300ms',
            '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
          }}
          onMouseEnter={() => setHoverCategory(category.id)}
          onMouseLeave={() => setHoverCategory(null)}
        >
          {/* Animated Background Accent */}
          <Box
            sx={{
              position: 'absolute',
              right: -48,
              top: -48,
              width: 96,
              height: 96,
              borderRadius: '50%',
              bgcolor: category.color,
              opacity: 0.7,
              transition: 'all 500ms',
              zIndex: 0,
              '&:hover': { transform: 'scale(1.5)', opacity: 0.3 },
            }}
          />

          {/* Animated Image with Overlay */}
          <Box sx={{ position: 'relative', height: category.height, overflow: 'hidden', zIndex: 1 }}>
            <CardMedia
              component="img"
              image={category.image}
              alt={category.name}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 500ms, filter 500ms',
                '&:hover': { transform: 'scale(1.1)', filter: 'brightness(1.1)' },
              }}
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

            {/* Animated Icon Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 400ms',
                opacity: hoverCategory === category.id ? 1 : 0,
                transform:
                  hoverCategory === category.id
                    ? 'rotate(0) translateY(0)'
                    : 'rotate(12deg) translateY(8px)',
              }}
            >
              <ShoppingBag sx={{ width: 20, height: 20, color: '#fff' }} />
            </Box>
          </Box>

          {/* Category Info with Animation */}
          <CardContent
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 3,
              color: '#fff',
              zIndex: 2,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  transition: 'transform 400ms',
                  transform: hoverCategory === category.id ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                {category.name}
              </Typography>
              {category.trending && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#dc2626',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 'medium',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    transition: 'transform 400ms',
                    transform: hoverCategory === category.id ? 'scale(1.1)' : 'scale(1)',
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
                {category.items} items
              </Typography>
              {category.featured && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, color: '#fde047' }}>
                  <Star
                    sx={{ width: 12, height: 12, mr: 0.5, fill: '#fde047', stroke: '#fde047' }}
                  />
                  <Typography sx={{ fontSize: '0.75rem' }}>Featured</Typography>
                </Box>
              )}
            </Box>

            {/* Expanding Details with Animation */}
            <Box
              sx={{
                mt: 2,
                overflow: 'hidden',
                transition: 'all 400ms',
                maxHeight: hoverCategory === category.id ? 96 : 0,
                opacity: hoverCategory === category.id ? 1 : 0,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#e5e7eb',
                  mb: 2,
                  transition: 'all 400ms 100ms',
                }}
              >
                Explore our latest collection of high-quality products.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#fff',
                  color: '#dc2626',
                  textTransform: 'none',
                  fontWeight: 'medium',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  '&:hover': { bgcolor: '#dc2626', color: '#fff' },
                }}
                endIcon={
                  <ArrowRight
                    sx={{
                      width: 16,
                      height: 16,
                      transition: 'transform 300ms',
                      '&:hover': { transform: 'translateX(4px)' },
                    }}
                  />
                }
              >
                Shop Now
              </Button>
            </Box>
          </CardContent>

          {/* Interactive Border Animation */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              border: '2px solid transparent',
              borderRadius: 3,
              transition: 'border 500ms',
              '&:hover': { borderColor: 'rgba(255,255,255,0.1)' },
            }}
          />
        </Card>
      </Grow>
    );
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        bgcolor: '#f5f5f5',
        transition: 'opacity 700ms',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        {/* Header Section with Animation */}
        <Fade in={isVisible} timeout={700}>
          <Box
            sx={{
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: isVisible ? 1 : 0,
              transition: 'transform 700ms, opacity 700ms',
              transitionDelay: '100ms',
              mb: 4,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', color: '#1f2937', position: 'relative' }}
                >
                  {Array.from('Shop By Category').map((letter, index) => (
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
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: 64,
                      height: 4,
                      bgcolor: '#dc2626',
                      transition: 'width 500ms',
                      '&:hover': { width: '100%' },
                    }}
                  />
                </Typography>
                <Typography sx={{ color: '#4b5563', mt: 1 }}>
                  Discover our curated selection of trending products
                </Typography>
              </Box>
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
        </Fade>

        {/* Floating Decorative Elements */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              top: -24,
              left: -24,
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: '#fef2f2',
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
              bgcolor: '#eff6ff',
              opacity: 0.7,
              animation: 'ping 2s infinite',
            }}
          />
        </Box>

        {/* Masonry Layout */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </Masonry>

        {/* Curved Decorative Element */}
        <Box sx={{ width: '100%', height: 64, position: 'relative', mt: 6, overflow: 'hidden' }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: 128,
              bgcolor: '#fef2f2',
              borderRadius: '50%',
              top: 0,
              transform: 'translateY(40px)',
              transition: 'transform 700ms',
              '&:hover': { transform: 'translateY(24px)' },
            }}
          />
        </Box>
      </Box>

      {/* Inline CSS for Masonry and Animations */}
      <style jsx>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -16px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 16px;
          background-clip: padding-box;
        }
        .my-masonry-grid_column > div {
          margin-bottom: 16px;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          75% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
        }
      `}</style>
    </Box>
  );
}