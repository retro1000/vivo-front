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
              minHeight: "85dvh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
              cursor: 'pointer'
            }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* <Stack
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Typography
                  variant="h3"
                  color="white"
                  gutterBottom
                  textAlign={"center"}
                  width={"80%"}
                  noWrap={false}
                >
                  {slide.header}
                </Typography>
                <Typography
                  variant="span"
                  color="white"
                  gutterBottom
                  textAlign={"center"}
                  width={"85%"}
                >
                  {slide.sub}
                </Typography>
                <Button
                  size="large"
                  variant="outlined"
                //   color={slide.color && slide.color!==undefined ? "" : "primary"}
                  onClick={slide.fun}
                  sx={{
                    width: "200px",
                    height: "60px",
                    fontSize: "20px",
                    mt: 2,
                    // ...(slide.color ? { background: slide.color } : {}),
                  }}
                >
                  {slide.act}
                </Button>
              </Stack> */}
            </Container>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
