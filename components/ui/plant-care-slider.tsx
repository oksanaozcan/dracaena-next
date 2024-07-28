"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/scrollbar';
import { ArrowIcon } from './arrow-icon';

export const PlantCareSlider = () => {
  const customStyles = {
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
          <Image
            src={'/images/care-slider-1.jpg'}
            width={0}
            height={0}
            sizes="100vw"
            style={customStyles}
            alt='care slide 1'
          />         
        </SwiperSlide>
        <SwiperSlide style={{ minWidth: '250px' }}>
          <Image
            src={'/images/care-slider-2.png'}
            width={0}
            height={0}
            sizes="100vw"
            style={customStyles}
            alt='care slide 2'
          />
        </SwiperSlide>
        <SwiperSlide style={{ minWidth: '250px' }}>
          <Image
            src={'/images/care-slider-3.png'}
            width={0}
            height={0}
            sizes="100vw"
            style={customStyles}
            alt='care slide 3'
          />
        </SwiperSlide>
        <div className='flex justify-between w-4/5 ml-14'>
          <div className='fornt-bold text-gold text-5xl'>1</div>
          <ArrowIcon/>
          <div className='fornt-bold text-gold text-5xl'>2</div>
          <ArrowIcon/>
          <div className='fornt-bold text-gold text-5xl'>3</div>
        </div>
      </Swiper>
    </div>
  );
}