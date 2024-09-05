import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';


// import required modules
import { Mousewheel, Autoplay, Navigation, FreeMode } from 'swiper/modules';
import { Box, GlobalStyles, Typography } from '@mui/material';
import { floor } from 'lodash';

const ProductSlider = ({ title, children }) => {

    const swiperRefs = useRef(null)

    const [slidesPerView, setSlidesPerView] = useState()

    const handleSlidesPerView = () => {
        const swiperInstance = swiperRefs.current?.swiper;
        if (!swiperInstance) return;

        setSlidesPerView(floor(swiperInstance.width/260))
    }

    useEffect(() => {
        window.addEventListener('resize', handleSlidesPerView);
        handleSlidesPerView();
    
        return () => window.removeEventListener('resize', handleSlidesPerView);
      }, []);

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1em', height: 'max-content'}}>
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
                    // ".swiper-button-next::after, .swiper-button-prev::after": {
                    //     fontSize: '0',
                    //     content: ''
                    // },
                    ".swiper-button-next": {
                        backgroundSize: '50%'
                    },
                    ".swiper-button-prev": {
                        backgroundSize: '50%'
                    }
                }}
            />
            <Swiper
                loop={true}
                onResize={handleSlidesPerView}
                ref={swiperRefs}
                spaceBetween={0}
                slidesPerView={slidesPerView}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                navigation={true}
                pagination
                modules={[FreeMode, Autoplay, Navigation, Mousewheel]}
                className="mySwiper"
                style={{ width: '100%', height: 'max-content', padding: '2em' }}
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

