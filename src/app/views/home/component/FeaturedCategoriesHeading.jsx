import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg) scale(0); }
  to { transform: rotate(45deg) scale(1); }
`;

// Styled components using MUI system
const CategoryBox = styled(Box)(({ theme, delay, isActive }) => ({
  position: 'absolute',
  transition: 'all 500ms ease',
  height: '12px',
  width: '12px',
  borderRadius: '3px',
  opacity: isActive ? 1 : 0,
  transform: isActive ? 'rotate(45deg) scale(1)' : 'rotate(0deg) scale(0)',
  transitionDelay: `${delay}ms`,
  boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.15)' : 'none',
}));

const IconContainer = styled(Paper)(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: 8,
  backgroundColor: isActive ? theme.palette.custom.yellowOrange : theme.palette.custom.lightGrayBackground,
  transition: 'all 500ms ease',
  boxShadow: isActive ? `0 4px 8px rgba(${hexToRgb(theme.palette.custom.purpleLight)}, 0.3)` : 'none',
}));

const CategoryIndicator = styled(Box)(({ theme, delay, isActive, opacity, index }) => ({
  height: '6px',
  borderRadius: '4px',
  backgroundColor: isActive ? 
    index === 0 ? theme.palette.custom.purpleLight : 
    index === 1 ? theme.palette.custom.yellowOrange : 
    index === 2 ? theme.palette.custom.purpleMedium : 
    theme.palette.custom.secondaryMainOrange : 
    theme.palette.custom.purpleLight,
  margin: '0 2px',
  transition: 'all 700ms ease',
  transitionDelay: `${delay}ms`,
  width: isActive ? '48px' : '8px',
  opacity: isActive ? opacity : 0.3,
  '&:first-of-type': {
    marginLeft: 0,
  },
}));

const CategoryCountBox = styled(Paper)(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  backgroundColor: isActive ? theme.palette.custom.yellowOrange : theme.palette.custom.lightGrayBackground,
  borderRadius: 8,
  padding: theme.spacing(0.5, 1.5),
  transition: 'all 500ms ease',
  boxShadow: isActive ? `0 2px 8px rgba(${hexToRgb(theme.palette.custom.yellowOrange)}, 0.3)` : 'none',
}));

// Utility function to convert hex to RGB
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

const FeaturedCategoriesHeading = () => {
  const [isActive, setIsActive] = useState(false);
  const headingRef = useRef(null);
  const theme = useTheme();

  const systemColors = theme.palette.custom;

  // Colors for category boxes
  const categoryColors = [
    systemColors.purpleLight,
    systemColors.yellowOrange,
    systemColors.purpleMedium,
    systemColors.secondaryMainOrange,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  // Create category boxes with staggered animation
  const renderCategoryBoxes = () => {
    const boxes = [];
    
    for (let i = 0; i < 4; i++) {
      boxes.push(
        <CategoryBox
          key={i}
          delay={i * 100}
          isActive={isActive}
          sx={{
            right: `${5 + (i * 20)}px`,
            bottom: `${5 + (i * 5)}px`,
            backgroundColor: categoryColors[i],
          }}
        />
      );
    }
    return boxes;
  };

  return (
    <Box
      ref={headingRef}
      sx={{
        position: 'relative',
        py: 3,
        px: 2,
        mb: 3,
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 1000ms ease',
        animation: isActive ? `${fadeIn} 1s ease-out` : 'none',
        borderRadius: 2,
        // backgroundColor: isActive ? systemColors.palePurple : systemColors.white,
        transition: 'background-color 500ms ease, opacity 1000ms ease, transform 1000ms ease',
      }}
    >
      {/* Background grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: isActive ? 0.1 : 0.05,
          transition: 'opacity 500ms ease',
          backgroundImage: `
            linear-gradient(to right, ${systemColors.purpleLight} 1px, transparent 1px),
            linear-gradient(to bottom, ${systemColors.purpleLight} 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          borderRadius: 2,
        }}
      />
      
      {/* Animated category boxes */}
      {renderCategoryBoxes()}

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Category icon with animation */}
        <IconContainer isActive={isActive} elevation={isActive ? 4 : 0}>
          <ShoppingBag
            sx={{
              color: isActive ? systemColors.purpleMedium : systemColors.purpleLight,
              fontSize: 28,
              transition: 'transform 500ms ease, color 500ms ease',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </IconContainer>
        
        <Box>
          {/* Title with animated border */}
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: systemColors.titleGray,
                position: 'relative',
                zIndex: 10,
                transition: 'all 500ms ease',
                letterSpacing: isActive ? '0.5px' : 'normal',
                ...(isActive && {
                  background: `linear-gradient(90deg, ${systemColors.purpleLight}, ${systemColors.yellowOrange})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent',
                }),
              }}
            >
              Featured Categories
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 4,
                height: 12,
                backgroundColor: systemColors.lightPurple,
                transition: 'all 500ms ease',
                width: isActive ? '100%' : '25%',
                zIndex: 1,
                opacity: 0.4,
              }}
            />
          </Box>
          
          {/* Animated tagline */}
          <Box sx={{ height: 24, overflow: 'hidden', mt: 0.5 }}>
            <Typography
              variant="body2"
              sx={{
                color: systemColors.mutedGray,
                transition: 'all 500ms ease',
                transform: isActive ? 'translateY(0)' : 'translateY(32px)',
                opacity: isActive ? 1 : 0,
              }}
            >
              Browse our top product collections
            </Typography>
          </Box>
          
          {/* Animated category indicators */}
          <Box sx={{ display: 'flex', mt: 1, alignItems: 'center', height: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <CategoryIndicator
                key={i}
                index={i}
                delay={i * 100}
                isActive={isActive}
                opacity={0.9 - (i * 0.15)}
              />
            ))}
          </Box>
        </Box>
        
        {/* Categories count */}
        <CategoryCountBox isActive={isActive}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2px',
              transition: 'all 500ms ease',
              opacity: isActive ? 1 : 0.7,
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <Box
                key={i}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '1px',
                  backgroundColor: isActive ? systemColors.purpleMedium : systemColors.purpleLight,
                  transitionDelay: `${i * 50}ms`,
                  transform: isActive ? 'rotate(45deg) scale(1.2)' : 'rotate(0) scale(1)',
                  transition: 'transform 500ms ease, background-color 500ms ease',
                }}
              />
            ))}
          </Box>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              transition: 'all 500ms ease',
              maxWidth: isActive ? '120px' : '0',
              opacity: isActive ? 1 : 0,
              marginLeft: isActive ? 1 : 0,
              fontWeight: 600,
              color: systemColors.titleGray,
              whiteSpace: 'nowrap',
            }}
          >
            8 categories
          </Typography>
        </CategoryCountBox>
      </Box>
    </Box>
  );
};

export default FeaturedCategoriesHeading;   