import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

// import required modules
import { EffectFade, Autoplay, Pagination } from "swiper/modules";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
              alignItems: "end",
              justifyContent: "left",
              alignContent: "left",
              width: "100%",
              cursor: "pointer",
              borderRadius: 1,
            }}
          >
            <Box>
              <Typography variant="h6" gutterBottom>
                {slide?.title}
              </Typography>
              {/* <Button
                variant="text"
                onClick={slide?.fun}
                sx={{
                  color: slide?.btnClr || "white",
                  textTransform: "none", // Prevent uppercase text
                  textDecoration: "underline", // Add underline
                  fontSize: "1.3rem", // Match font size (approximate)
                  fontWeight: 600, // Regular weight
                  "&:hover": {
                    textDecoration: "underline", // Keep underline on hover
                    backgroundColor: "transparent", // No background on hover
                  },
                }}
                endIcon={
                  <ArrowForwardIcon sx={{ color: slide?.btnClr || "white" }} />
                }
              >
                {slide?.act || "Shop Now"}
              </Button> */}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
