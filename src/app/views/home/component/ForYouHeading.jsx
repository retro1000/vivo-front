function ForYouHeading({ isLoaded }) {
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.2, once: false });

    const renderDots = () => {
      return Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          sx={{
            position: 'absolute',
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`,
            bgcolor: '#4f46e5',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3 + Math.random() * 0.7,
          }}
        />
      ));
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.7 }}
          sx={{ position: 'absolute', inset: 0 }}
        >
          {renderDots()}
        </motion.div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mr: 2 }}>
            <motion.div
              animate={{ scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                position: 'absolute',
                inset: 0,
                bgcolor: '#4f46e5',
                borderRadius: '50%',
                opacity: 0.3,
              }}
            />
            <IconButton
              sx={{
                p: 1.5,
                bgcolor: isHovered ? '#e0e7ff' : '#eef2ff',
                boxShadow: isHovered ? '0 4px 12px rgba(79, 70, 229, 0.5)' : 'none',
                transition: 'all 0.5s',
              }}
            >
              <motion.div animate={{ scale: isHovered ? 1.1 : 1 }} transition={{ duration: 0.5 }}>
                <Person sx={{ color: '#312e81', fontSize: 24 }} />
              </motion.div>
            </IconButton>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: isHovered ? 'transparent' : '#1f2937',
                background: isHovered
                  ? 'linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)'
                  : 'none',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: isHovered ? 'text' : 'none',
                WebkitTextFillColor: isHovered ? 'transparent' : 'inherit',
                animation: isHovered ? 'gradientShift 3s ease infinite' : 'none',
                transition: 'all 0.5s',
                letterSpacing: isHovered ? '0.05em' : '0',
              }}
            >
              For You
            </Typography>
            {isHovered && (
              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: -32,
                  bgcolor: '#e0e7ff',
                  color: '#312e81',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Personalized
              </Typography>
            )}
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 32, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
                Curated just for your preferences
              </Typography>
            </motion.div>
            <Box sx={{ position: 'relative', height: 6, mt: 1, bgcolor: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: '66%' }}
                animate={{ width: isHovered ? '100%' : '66%' }}
                transition={{ duration: 1 }}
                sx={{ height: '100%', bgcolor: '#4f46e5', borderRadius: 3 }}
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovered ? '300%' : '-100%' }}
                  transition={{ duration: 1.5 }}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: 80,
                    bgcolor: '#ffffff',
                    opacity: 0.2,
                  }}
                />
              </motion.div>
            </Box>
          </Box>
          <Badge
            badgeContent="97% match"
            sx={{
              ml: 'auto',
              '& .MuiBadge-badge': {
                bgcolor: isHovered ? '#e0e7ff' : '#eef2ff',
                color: '#312e81',
                px: 1.5,
                py: 0.5,
                borderRadius: '16px',
                transition: 'all 0.5s',
                boxShadow: isHovered ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
              },
            }}
          />
        </Box>
      </motion.div>
    );
  }