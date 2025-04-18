import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// import required modules
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function SwiperSliderHeroAuto({ slides }) {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      speed={850}
      centeredSlides={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Autoplay, Pagination]}
      fadeEffect={{
        crossFade: true, // Ensures smooth fading transition
      }}
      className="mySwiper"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} onClick={slide.fun}>
          <Box
            sx={{
              backgroundImage: "url(" + slide.img + ")",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "50dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              cursor: "pointer",
              borderRadius: 1,
            }}
          >
            <Box>
              <Button
                sx={{
                  color: "transparent",
                  background: "transparent",
                }}
              >
              </Button>
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
