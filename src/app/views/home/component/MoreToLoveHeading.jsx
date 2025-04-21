import { useState, useEffect, useRef } from 'react';
import { keyframes } from '@mui/system';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Favorite } from '@mui/icons-material';

// Keyframes for animations
const floatUp = keyframes`
  0% { transform: translateY(0) scale(0.4); }
  100% { transform: translateY(-20px) scale(0.6); }
`;

const heartbeat = keyframes`
  0% { transform: scale(1); }
  15% { transform: scale(1.15); }
  30% { transform: scale(1); }
  45% { transform: scale(1.15); }
  60% { transform: scale(1); }
`;

const ping = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

// More To Love Section Heading with heart/love theme
const MoreToLoveHeading = ({ isLoaded = true }) => {
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

  // Create floating hearts with different animations
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 8; i++) {
      hearts.push(
        <Box 
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${5 + (i * 12)}%`,
            transform: `scale(${0.4 + Math.random() * 0.3})`,
            transition: 'all 0.7s',
            transitionDelay: `${i * 70}ms`,
            animation: isHovered ? `${floatUp} ${2 + Math.random() * 3}s ease-in-out infinite` : 'none',
            opacity: isHovered ? 1 : 0,
            color: `rgba(233, 30, 99, ${0.6 + (i % 3) * 0.1})`, // pink with varying opacity
          }}
        >
          <Favorite size={16} fill="currentColor" />
        </Box>
      );
    }
    return hearts;
  };

  return (
    <Box
      ref={headingRef}
      sx={{
        position: 'relative',
        padding: '24px 16px',
        transition: 'all 1s',
        transform: isLoaded && isInView ? 'translateY(0)' : 'translateY(40px)',
        opacity: isLoaded && isInView ? 1 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated floating hearts */}
      {renderHearts()}
      
      <Stack direction="row" alignItems="center">
        {/* Heart icon with pulse animation */}
        <Box
          sx={{
            position: 'relative',
            marginRight: 2,
            padding: 1.5,
            borderRadius: '50%',
            backgroundColor: isHovered ? 'rgba(244, 143, 177, 0.15)' : 'rgba(244, 143, 177, 0.1)',
            transition: 'all 0.5s',
            boxShadow: isHovered ? '0 10px 15px -3px rgba(244, 143, 177, 0.2)' : 'none',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              backgroundColor: '#E91E63', // error.main in MUI
              animation: isHovered ? `${ping} 1s cubic-bezier(0, 0, 0.2, 1) infinite` : 'none',
              opacity: isHovered ? 0.3 : 0,
            }}
          />
          <Favorite 
            size={24} 
            style={{
              color: '#D32F2F', // error.main
              transition: 'all 0.5s',
              animation: isHovered ? `${heartbeat} 1.5s ease-in-out infinite` : 'none',
              fill: isHovered ? "currentColor" : "none",
            }}
          />
        </Box>
        
        <Box sx={{ flex: 1 }}>
          {/* Title with gradient effect */}
          <Typography 
            variant="h4" 
            fontWeight={700}
            sx={{
              transition: 'all 0.5s',
              letterSpacing: isHovered ? '0.05em' : 'normal',
              ...(isHovered && {
                background: 'linear-gradient(90deg, #E91E63, #F06292, #E91E63)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                animation: `${keyframes`
                  0% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                  100% { background-position: 0% 50%; }
                `} 3s ease infinite`,
              })
            }}
          >
            More To Love
          </Typography>
          
          {/* Animated tagline */}
          <Box sx={{ height: '24px', overflow: 'hidden', marginTop: '4px' }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                transition: 'all 0.5s',
                transform: isHovered ? 'translateY(0)' : 'translateY(32px)',
                opacity: isHovered ? 1 : 0,
              }}
            >
              Discover items you'll fall in love with
            </Typography>
          </Box>
          
          {/* Animated heart-shaped progress bar */}
          <Box 
            sx={{
              position: 'relative',
              height: '8px',
              width: '100%',
              mt: 1,
            }}
          >
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(244, 143, 177, 0.1)',
                borderRadius: '4px',
              }}
            />
            <Box 
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: 'linear-gradient(to right, #EC407A, #E91E63)',
                borderRadius: '4px',
                transition: 'all 1s ease-out',
                width: isHovered ? '100%' : '33%',
              }}
            />
            <Box 
              sx={{
                position: 'absolute',
                right: '-4px',
                top: '50%',
                transform: `translateY(-50%) ${isHovered ? 'scale(1)' : 'scale(0)'}`,
                transition: 'all 0.7s',
                opacity: isHovered ? 1 : 0,
                color: '#E91E63',
              }}
            >
              <Favorite size={12} fill="currentColor" />
            </Box>
          </Box>
        </Box>
        
        {/* Love count with animation */}
        <Box
          sx={{
            marginLeft: 'auto',
            backgroundColor: isHovered ? 'rgba(244, 143, 177, 0.15)' : 'rgba(244, 143, 177, 0.1)',
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            transition: 'all 0.5s',
            boxShadow: isHovered ? '0 4px 6px -1px rgba(244, 143, 177, 0.2)' : 'none',
          }}
        >
          <Favorite 
            size={14} 
            style={{
              color: '#D32F2F', // error.main
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.5s',
              fill: "currentColor"
            }}
          />
          <Typography 
            sx={{
              color: '#C2185B', // pink.800
              fontWeight: 500,
              overflow: 'hidden',
              transition: 'all 0.5s',
              maxWidth: isHovered ? '100px' : '0',
              opacity: isHovered ? 1 : 0,
              marginLeft: isHovered ? '4px' : 0,
            }}
          >
            42 loved
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default MoreToLoveHeading;