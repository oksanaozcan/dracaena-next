"use client";

import Link from "next/link";
import { A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { StarRating } from "./ui/star-rating";
import IconButton from "./ui/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useRef } from "react";

import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  { id: 1, stars: 3, text: 'Fast delivery, packaged with care and complete. Plus a (too) nice shopping experience on the website making it impossible to not order a baby plant extra...', author: 'Stefan Boonen' },
  { id: 2, stars: 4, text: 'I am satisfied. The transportation was very quick with in 2 days I got my plants. They arrived well packaged and they are growing nicely and healthy...', author: 'Joan' },
  { id: 3, stars: 5, text: 'Third time ordering my plants, pots and soil from this store, and I have never regret a purchase...', author: 'Mary' },
];

export const ReviewSliderSection: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);

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
    <div className="relative">
      <h5 className="text-xl py-4 text-center">4.6 out of 5 stars, based on <Link className="underline hover:font-bold" href={'#'}>18,700+ reviews</Link></h5>
      <Swiper
        ref={swiperRef}
        modules={[EffectFade, A11y]}   
        effect="fade"    
        spaceBetween={10}
        slidesPerView={1}     
        loop={true}  
        fadeEffect={{ crossFade: true }}    
      >
        {
          slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="w-full flex flex-col justify-center items-center py-4">
                <StarRating stars={slide.stars} />
                <p className="text-2xl italic pt-4 px-20">{slide.text}</p>   
                <p>{slide.author}</p>       
              </div>
            </SwiperSlide>
          ))
        }     
      </Swiper>
      <div className='absolute top-1/4 z-20 flex w-full justify-between items-center bottom-8 gap-3 mt-6'>
        <IconButton className='custom-prev-review bg-transparent text-white border-white hover:bg-white hover:text-gold hover:border-white' icon={<ArrowLeft size={24} />} onClick={() => handleArrowsClick('left')} />      
        <IconButton className='custom-next-review bg-transparent text-white border-white hover:bg-white hover:text-gold hover:border-white' icon={<ArrowRight size={24} />} onClick={() => handleArrowsClick('right')} />
      </div>
    </div>    
  )
}