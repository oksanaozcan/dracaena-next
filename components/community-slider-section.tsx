"use client";

import Container from "@/components/ui/container";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import Link from "next/link";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { ArrowLeft, ArrowRight, Instagram } from 'lucide-react';
import IconButton from "./ui/icon-button";
import { useRef, useState, useEffect } from "react";

const slides = [
  { id: 1, src: '/images/community-slider/community-1.jpg' },
  { id: 2, src: '/images/community-slider/community-2.jpg' },
  { id: 3, src: '/images/community-slider/community-3.jpg' },
  { id: 4, src: '/images/community-slider/community-4.jpg' },
  { id: 5, src: '/images/community-slider/community-5.jpg' },
  { id: 6, src: '/images/community-slider/community-6.jpg' },
  { id: 7, src: '/images/community-slider/community-7.jpg' },
];

export const CommunitySlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;
      const handleSlideChange = () => setActiveSlide(swiperInstance.realIndex);
      swiperInstance.on('slideChange', handleSlideChange);
      return () => {
        swiperInstance.off('slideChange', handleSlideChange);
      };
    }
  }, []);

  const handleArrowsClick = (direction: 'left' | 'right'): void => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (direction === 'left') {
        swiperRef.current.swiper.slidePrev();
      } else {
        swiperRef.current.swiper.slideNext();
      }
    }
  };

  return (
    <div className="py-6">
      <Container>
        <div className="flex text-xl font-bold justify-end pt-10 pb-4">
          <Link className="flex items-center gap-1 underline mb-2 hover:text-gold" href={'#'}>
            <span></span>
            <Instagram size={24} />
            <span>Join our community!</span>
            <span><ArrowRight size={24} /></span>
          </Link>
        </div>
      </Container>
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={3}      
        navigation={{
          prevEl: '.custom-prev-community',
          nextEl: '.custom-next-community',
        }}
      >
        {
          slides.map((slide, index) => (
            <SwiperSlide key={slide.id} onClick={() => setActiveSlide(index)} className='aspect-square'>
              <img className='object-cover w-full h-full' src={slide.src} alt='community slide' />
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className='flex w-full justify-center items-center bottom-8 gap-3 mt-6'>
        <IconButton className='custom-prev-community bg-transparent text-custom-green border-custom-green hover:bg-gold hover:text-white hover:border-gold' onClick={() => handleArrowsClick('left')} icon={<ArrowLeft size={24} />} />
        {
          slides.map((_, index) => (
            <div 
              key={index} 
              className={`w-10 h-1 ${index === activeSlide ? 'bg-custom-green' : 'bg-slate-400'}`}
            ></div>
          ))
        }
        <IconButton className='custom-next-community bg-transparent text-custom-green border-custom-green hover:bg-gold hover:text-white hover:border-gold' onClick={() => handleArrowsClick('right')} icon={<ArrowRight size={24} />} />
      </div>

    </div>
  );
};
