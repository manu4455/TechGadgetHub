// components/SwipeableCarousel.js
'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // import Swiper styles

const SwipeableCarousel = () => (
  <Swiper
    spaceBetween={50}
    slidesPerView={1}
  >
    <SwiperSlide>Slide 1</SwiperSlide>
    <SwiperSlide>Slide 2</SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
  </Swiper>
);

export default SwipeableCarousel;
