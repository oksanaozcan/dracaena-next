"use client";

import { A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';

export const InfoLine = () => {
  return (
    <Swiper
      modules={[A11y, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={10}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
        },      
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
        },
      }}
    >    
      <SwiperSlide className='text-center'>
        <Link className='hover:text-amber-600 transition-colors text-xl' href={"#"}>Free shipping for orders over €75,-</Link>          
      </SwiperSlide>
      <SwiperSlide className='text-center'>
        <Link className='hover:text-amber-600 transition-colors text-xl' href={"#"}>30 days PLNTS health guarantee</Link>          
      </SwiperSlide>
      <SwiperSlide className='text-center'>
        <Link className='hover:text-amber-600 transition-colors text-xl' href={"#"}>4.6/5 out of 18,700+ reviews</Link>          
      </SwiperSlide>     
    </Swiper>
  );
};