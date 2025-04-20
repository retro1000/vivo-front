import { useState, useEffect, useRef } from 'react';
import { styled, keyframes } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { 
  Star,
  LocalFireDepartment 
} from '@mui/icons-material';

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0) scale(0.4); }
  100% { transform: translateY(-20px) scale(0.6); }
`;

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

// Styled components for common elements
const HeadingContainer = styled(Box)(({ theme, isLoaded, isInView }) => ({
  position: 'relative',
  padding: theme.spacing(3, 2),
  transition: 'all 1s',
  transform: isLoaded && isInView ? 'translateY(0)' : 'translateY(40px)',
  opacity: isLoaded && isInView ? 1 : 0,
}));

const IconContainer = styled(Box)(({ theme, color, isHovered }) => ({
  position: 'relative',
  marginRight: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: '50%',
  backgroundColor: isHovered ? theme.palette[color].lighter : theme.palette[color].lightest,
  transition: 'all 0.5s',
  boxShadow: isHovered ? `0 10px 15px -3px ${theme.palette[color].lighter}40` : 'none',
}));

const HeadingText = styled(Typography)(({ theme, isHovered }) => ({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  transition: 'all 0.5s',
  letterSpacing: isHovered ? '0.05em' : 'normal',
}));

const TaglineContainer = styled(Box)({
  height: '24px',
  overflow: 'hidden',
  marginTop: '4px',
});

const TaglineText = styled(Typography)(({ isHovered }) => ({
  fontSize: '0.875rem',
  color: 'text.secondary',
  transition: 'all 0.5s',
  transform: isHovered ? 'translateY(0)' : 'translateY(32px)',
  opacity: isHovered ? 1 : 0,
}));

const CountBadge = styled(Box)(({ theme, color, isHovered }) => ({
  marginLeft: 'auto',
  backgroundColor: isHovered ? theme.palette[color].lighter : theme.palette[color].lightest,
  borderRadius: '24px',
  padding: theme.spacing(0.5, 1.5),
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.5s',
  boxShadow: isHovered ? `0 4px 6px -1px ${theme.palette[color].lighter}30` : 'none',
}));

// Popular Products Section Heading with star/trending theme
const PopularProductsHeading = ({ isLoaded }) => {
  const [isHovered, setIsHovered] = useState(false);
  const headingRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
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

  // Create stars with different animations
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Box 
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${(i * 20) + Math.random() * 10}%`,
            transform: `scale(${0.5 + Math.random() * 0.5})`,
            transition: 'all 1s',
            transitionDelay: `${i * 100}ms`,
            animation: isHovered ? `${float} ${2 + Math.random() * 2}s ease-in-out infinite alternate` : 'none',
            opacity: isHovered ? 1 : 0,
            color: 'warning.main',
          }}
        >
          <Star fill="currentColor" />
        </Box>
      );
    }
    return stars;
  };

  return (
    <HeadingContainer
      ref={headingRef}
      isLoaded={isLoaded}
      isInView={isInView}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated stars background */}
      {renderStars()}
      
      {/* Rising popularity graph lines */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '32px',
          overflow: 'hidden',
          opacity: 0.7,
          '& > div': {
            height: '64px',
            width: '100%',
            transition: 'all 0.7s',
            opacity: isHovered ? 0.7 : 0.3,
            background: 'linear-gradient(0deg, rgba(255,167,38,0.3) 0%, rgba(255,167,38,0) 100%)',
            clipPath: isHovered 
              ? 'polygon(0% 100%, 15% 60%, 30% 80%, 45% 40%, 60% 50%, 75% 20%, 90% 30%, 100% 10%, 100% 100%)' 
              : 'polygon(0% 100%, 15% 80%, 30% 85%, 45% 75%, 60% 80%, 75% 70%, 90% 75%, 100% 70%, 100% 100%)'
          }
        }}
      >
        <Box />
      </Box>

      <Stack direction="row" alignItems="center">
        {/* Trending icon with pulse effect */}
        <IconContainer color="warning" isHovered={isHovered}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: 'warning.main',
              animation: isHovered ? `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite` : 'none',
              opacity: isHovered ? 0.2 : 0,
              transform: isHovered ? 'scale(1.5)' : 'scale(0)',
            }}
          />
          <LocalFireDepartment 
            size={24} 
            style={{
              color: '#ED6C02', // warning.main
              transition: 'transform 0.5s',
              transform: isHovered ? 'scale(1.1) rotate(12deg)' : 'scale(1)',
            }}
          />
        </IconContainer>
        
        <Box sx={{ flex: 1 }}>
          {/* Title with animated underline */}
          <HeadingText isHovered={isHovered}>
            Popular Products
          </HeadingText>
          
          {/* Animated tagline */}
          <TaglineContainer>
            <TaglineText isHovered={isHovered} variant="body2" color="text.secondary">
              Trending items loved by our community
            </TaglineText>
          </TaglineContainer>
          
          {/* Animated underline */}
          <Box 
            sx={{
              position: 'relative',
              height: '4px',
              width: '100%',
              mt: 1,
              overflow: 'hidden',
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: 'linear-gradient(to right, #FFB74D, #FFA726)',
                transition: 'all 0.7s ease-out',
                width: isHovered ? '100%' : '25%',
              }}
            />
          </Box>
        </Box>
        
        {/* Count bubble with animation */}
        <CountBadge color="warning" isHovered={isHovered}>
          <Typography 
            sx={{ 
              color: 'warning.dark',
              fontWeight: 500,
            }}
          >
            24
          </Typography>
          <Typography 
            sx={{
              color: 'warning.dark',
              overflow: 'hidden',
              transition: 'all 0.5s',
              maxWidth: isHovered ? '100px' : '0',
              opacity: isHovered ? 1 : 0,
              ml: isHovered ? 0.5 : 0,
            }}
          >
            items
          </Typography>
        </CountBadge>
      </Stack>
    </HeadingContainer>
  );
};

export default PopularProductsHeading;