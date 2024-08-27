"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { ArrowIcon } from './arrow-icon';

export const PlantCareSlider = () => {
  
  const customStyles: React.CSSProperties = {
    width: '100%', 
    height: '300px', 
    objectFit: 'cover',
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <Swiper
        modules={[Scrollbar]}
        spaceBetween={30}
        slidesPerView={1}
        freeMode={true}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide style={{ minWidth: '250px' }}>
          <img
            src={'/images/guide-slider/guide-slide-1.jpg'}
            style={customStyles}
            alt='care slide 1'
          />         
        </SwiperSlide>
        <SwiperSlide style={{ minWidth: '250px' }}>
          <img
            src={'/images/guide-slider/guide-slide-2.png'}
            style={customStyles}
            alt='care slide 2'
          />
        </SwiperSlide>
        <SwiperSlide style={{ minWidth: '250px' }}>
          <img
            src={'/images/guide-slider/guide-slide-3.png'}
            style={customStyles}
            alt='care slide 3'
          />
        </SwiperSlide>
        <div className='flex justify-between w-4/5 ml-14'>
          <div className='font-bold text-gold text-5xl'>1</div>
          <ArrowIcon/>
          <div className='font-bold text-gold text-5xl'>2</div>
          <ArrowIcon/>
          <div className='font-bold text-gold text-5xl'>3</div>
        </div>
      </Swiper>
    </div>
  );
}
