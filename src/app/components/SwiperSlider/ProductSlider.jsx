import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import { Mousewheel, Autoplay, Navigation, FreeMode } from 'swiper/modules';
import { Box, GlobalStyles, Typography } from '@mui/material';

const ProductSlider = ({ title, children }) => {
    const swiperRefs = useRef(null);

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1em', height: 'max-content' }}>
            <Typography variant="h4">{title}</Typography>
            <GlobalStyles
                styles={{
                    ".swiper-button-next, .swiper-button-prev": {
                        color: '#ffffff',
                        backgroundColor: 'rgba(97, 97, 97, 0.8)',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'transform 0.1s ease-in-out'
                    },
                    ".swiper-button-next:hover, .swiper-button-prev:hover": {
                        backgroundColor: 'rgba(97, 97, 97, 0.9)',
                        color: '#ffffff'
                    },
                    ".swiper-button-next::after, .swiper-button-prev::after": {
                        fontSize: '16px',
                        color: 'inherit'
                    },
                    ".swiper-container": {
                        position: 'relative',
                        overflow: 'hidden',
                      },
                     ".swiper-container::before": {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 10,
                        width: '50px',
                        height: '100%',
                        background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
                        pointerEvents: 'none',
                      },
                      ".swiper-container::after": {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 10,
                        width: '50px',
                        height: '100%',
                        background: 'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
                        pointerEvents: 'none',
                      }
                }}
            />
            <Swiper
                effect='slide'
                loop={true}
                ref={swiperRefs}
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                navigation={true}
                modules={[FreeMode, Autoplay, Navigation, Mousewheel]}
                className="mySwiper"
                style={{ width: '100%', height: 'max-content', padding: '2em' }}
                
                // Define responsive breakpoints for slidesPerView
                breakpoints={{
                    320: {
                        slidesPerView: 1, // For small screens (mobile)
                    },
                    640: {
                        slidesPerView: 2, // For medium screens (tablets)
                    },
                    1024: {
                        slidesPerView: 3, // For larger screens (desktop)
                    },
                    1440: {
                        slidesPerView: 4, // For extra-large screens
                    }
                }}
            >
                {
                    React.Children.map(children, (child, index) => (
                        <SwiperSlide key={index}>
                            {child}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </Box>
    );
}

ProductSlider.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default ProductSlider;
