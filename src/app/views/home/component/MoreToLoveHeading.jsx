function MoreToLoveHeading({ isLoaded }) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.2, once: false });

    const renderHearts = () => {
      const hearts = [];
      for (let i = 0; i < 8; i++) {
        hearts.push(
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.7, delay: i * 0.07 }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${5 + i * 12}%`,
              transform: `scale(${0.4 + Math.random() * 0.3})`,
              animation: isHovered ? `floatUp ${2 + Math.random() * 3}s ease-in-out infinite` : 'none',
            }}
          >
            <Favorite sx={{ color: `rgb(244, ${114 + (i % 3) * 50}, 114)`, fontSize: 16 }} />
          </motion.div>
        );
      }
      return hearts;
    };

    return (
      <motion.div
        ref={ref}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: isLoaded && isInView ? 0 : 40, opacity: isLoaded && isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ position: 'relative', py: 4, px: 2 }}
      >
        {renderHearts()}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mr: 2 }}>
            <motion.div
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: '#f87171',
                borderRadius: '50%',
                opacity: 0.3,
              }}
            />
            <IconButton
              sx={{
                p: 1.5,
                bgcolor: isHovered ? '#fee2e2' : '#fef2f2',
                boxShadow: isHovered ? '0 4px 12px rgba(244, 114, 182, 0.5)' : 'none',
                transition: 'all 0.5s',
              }}
            >
              <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.5 }}>
                <Favorite
                  sx={{
                    color: '#e11d48',
                    fontSize: 24,
                    animation: isHovered ? 'heartbeat 1.5s ease-in-out infinite' : 'none',
                  }}
                />
              </motion.div>
            </IconButton>
          </Box>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: isHovered ? 'transparent' : '#1f2937',
                background: isHovered
                  ? 'linear-gradient(90deg, #f472b6, #fb7185, #f472b6)'
                  : 'none',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: isHovered ? 'text' : 'none',
                WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
                transition: 'all 0.5s',
              }}
            >
              More To Love
            </Typography>
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 32, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
                Discover items you'll fall in love with
              </Typography>
            </motion.div>
            <Box sx={{ position: 'relative', height: 8, mt: 1, bgcolor: '#fee2e2', borderRadius: 4 }}>
              <motion.div
                initial={{ width: '33%' }}
                animate={{ width: isHovered ? '100%' : '33%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                sx={{
                  height: '100%',
                  bgcolor: '#f472b6',
                  borderRadius: 4,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
                transition={{ duration: 0.7 }}
                sx={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)' }}
              >
                <Favorite sx={{ color: '#e11d48', fontSize: 12 }} />
              </motion.div>
            </Box>
          </Box>
          <Badge
            badgeContent="42 loved"
            sx={{
              ml: 'auto',
              '& .MuiBadge-badge': {
                bgcolor: isHovered ? '#fee2e2' : '#fef2f2',
                color: '#be123c',
                px: 1.5,
                py: 0.5,
                borderRadius: '16px',
                transition: 'all 0.5s',
                boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              },
            }}
          >
            <Favorite sx={{ color: '#be123c', fontSize: 14 }} />
          </Badge>
        </Box>
      </motion.div>
    );
  }