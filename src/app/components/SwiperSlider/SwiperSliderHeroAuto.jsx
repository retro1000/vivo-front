import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

export default function SwiperSliderHeroAuto({ slides }) {

    return (
        <Swiper
            spaceBetween={0.1}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
        >
            {
                slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                backgroundImage:
                                "url("+slide.img+")",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                minHeight: "85dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: 'center',
                                alignContent: 'center',
                                width: '100%'
                            }}
                        >
                            <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                    <Typography variant="h3" color="white" gutterBottom textAlign={'center'} width={'80%'} noWrap={false}>
                                        {slide.header}
                                    </Typography>
                                    <Typography variant="span" color="white" gutterBottom textAlign={'center'} width={'85%'}>
                                        {slide.sub}
                                    </Typography>
                                    <Button size='large' variant="contained" color="primary" onClick={slide.fun} sx={{width: '200px', height: '60px', fontSize: '20px', mt: 2}}>{slide.act}</Button>
                                </Stack>
                            </Container>
                        </Box>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}
