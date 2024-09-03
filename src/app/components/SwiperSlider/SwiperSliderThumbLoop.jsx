import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';

// import required modules
import { Mousewheel, FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function SwiperSliderThumbLoop({images, swipTo}) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const mainSwiperRef = useRef(null)

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    borderRadius: '6px'
  };

  useEffect(() => {
    if (swipTo!==undefined && mainSwiperRef.current && mainSwiperRef.current.swiper) {
      mainSwiperRef.current.swiper.slideTo(swipTo);
    }
  }, [swipTo])

  return (
    <>
      <Swiper
        ref={mainSwiperRef}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          height: '80%',
          // width: '100%'
        }}
        loop={true}
        spaceBetween={0}
        mousewheel
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className="mySwiper2"
      >
        {
          images && images.map((image, index) => (
            <SwiperSlide key={`main_slide_${index}`}>
              <Zoom>
                <img style={imageStyle} src={image}/>
              </Zoom>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        style={{height: '20%', display:'flex', justifyContent: 'center', alignItems: 'center'}}
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={images.length>=5?5:images.length}
        spaceBetween={5}
        centeredSlides={true}
        navigation={true}
        mousewheel={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className="mySwiper"
      >
        {
          images && images.map((image, index) => (
            <SwiperSlide key={`second_slide_${index}`}>
              <img style={imageStyle} src={image}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  );
}
