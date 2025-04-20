const { useTheme } = require("@emotion/react");
const { Box, Typography } = require("@mui/material");
const { ProductGrid } = require("app/components");
const { useEffect } = require("react");
const { useState } = require("react");

const NewArrivals = ({ newArrivalProducts }) => {

    const theme = useTheme();

    const [animationState, setAnimationState] = useState(0);
    const [isAnimationFinish, setIsAnimationFinish] = useState(false);

    useEffect(() => {
        setAnimationState(0);
        const timer = setTimeout(() => setAnimationState(1), 300);
        const timer2 = setTimeout(() => setIsAnimationFinish(true), 1200);
        return () => {clearTimeout(timer); clearTimeout(timer2);}
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
            <Box sx={{ textAlign: 'center', mb: 3, position: 'relative', pt: 2, pb: 4, pl: 4, pr: 4, overflow: 'hidden', mt: -2 }}>
                <Box sx={{ position: 'relative' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '1.8rem', sm: '2rem' },
                            fontWeight: 'bold',
                            color: theme.palette.custom.titleGray,
                            mb: .8,
                            position: 'relative',
                            display: 'inline-block',
                            animation: animationState >= 1 ? 'revealText 0.8s ease-out forwards' : 'none',
                        }}
                    >
                        New Arrivals
                    </Typography>

                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: theme.palette.custom.paleBlue,
                            transform: animationState >= 1 ? 'translateX(0)' : 'translateX(-100%)',
                            opacity: isAnimationFinish ? 0 : 1,
                            animation: animationState >= 1 ? 'sweep 1.2s ease-in-out forwards' : 'none',
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', my: .2, gap: 1 }}>
                    {[0, 1, 2].map((i) => (
                        <Box
                            key={i}
                            sx={{
                                height: 4,
                                width: 32,
                                background: theme.palette.custom.primaryBlue,
                                borderRadius: '9999px',
                                transform: animationState >= 1 ? 'scale(1)' : 'scale(0)',
                                transition: 'all 0.3s ease',
                                transitionDelay: `${500 + i * 150}ms`,
                            }}
                        />
                    ))}
                </Box>

                <Typography
                    sx={{
                        fontSize: '.8rem',
                        color: theme.palette.custom.darkGray,
                        transform:
                            animationState >= 1 ? 'translateY(0)' : 'translateY(32px)',
                        opacity: animationState >= 1 ? 1 : 0,
                        transition: 'all 0.5s ease',
                        transitionDelay: '800ms',
                    }}
                >
                    Fresh products just added to our catalog
                </Typography>

                <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                    {[...Array(5)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: 'absolute',
                                background: theme.palette.custom.lightBlueAccent,
                                borderRadius: '9999px',
                                width: `${10 + Math.random() * 20}px`,
                                height: `${10 + Math.random() * 20}px`,
                                left: `${Math.random() * 90}%`,
                                right: `${Math.random() * 90}%`,
                                top: `${Math.random() * 110}%`,
                                transition: 'all 1s ease',
                                transitionDelay: `${900 + i * 100}ms`,
                                opacity: animationState >= 1 ? 0.4 : 0,
                                animation:
                                    animationState >= 1
                                        ? `float${(i % 4) + 1} ${5 + i}s ease-in-out infinite`
                                        : 'none',
                                animationDelay: `${i * 0.5}s`,
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <ProductGrid
              products={newArrivalProducts}
              sx={{ justifyContent: 'center', alignItems: 'center', mt: 4 }}
            />
        </Box>
    );
}

export default NewArrivals;