'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkBtn } from "./ui/link-btn";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import IconButton from './ui/icon-button';

export const PlantOfTheMonthSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { id: 1, src: '/images/plant-of-month-slider-1.jpg', title: 'Calathea Orbifolia' },
    { id: 2, src: '/images/plant-of-month-slider-2.jpg', title: 'Fiddle Leaf Fig' },
    { id: 3, src: '/images/plant-of-month-slider-3.jpg', title: 'Snake Plant' },
    { id: 4, src: '/images/plant-of-month-slider-4.jpg', title: 'Test 1 Plant' },
    { id: 5, src: '/images/plant-of-month-slider-5.jpg', title: 'Test 2 Plant' },
  ];

  const handleSlideClick = (index: number) => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleAroowsClick = (direction: string) => {
    if (direction === 'left') {
      if (activeSlide > 0) {
        setActiveSlide((cur) => cur - 1);
      } else {
        setActiveSlide(slides.length-1);
      }
    }
    if (direction === 'right') {
      if (activeSlide < slides.length-1) {
        setActiveSlide((cur) => cur+1);
      } else {
        setActiveSlide(0);
      }
    }
  }

  return (
    <div className="relative pt-20">
      <div className="absolute z-10 top-1 left-32">
        <h2 className="text-8xl font-black subpixel-antialiased tracking-wider leading-relaxed text-gold">Plant of the month</h2>
      </div>
      <div className="w-full grid grid-cols-7 gap-4">
        <div className="col-span-3 h-auto relative">
          <Image
            src={slides[activeSlide].src}
            layout="fill"
            objectFit="cover"
            alt="plant of month image"
          />
          <div className='absolute flex w-full justify-center bottom-8 gap-3'>
            <IconButton className='bg-transparent text-white hover:bg-gold' onClick={() => handleAroowsClick('left')} icon={<ArrowLeft size={24}/>} />
            <IconButton className='bg-transparent text-white hover:bg-gold' onClick={() => handleAroowsClick('right')} icon={<ArrowRight size={24}/>} />
          </div>      
        </div>
        <div className="col-span-4">
          <div className="w-full h-full">
            <div className="flex justify-end">
              <div>
                <Image
                  src={slides[activeSlide].src}
                  width={300}
                  height={200}
                  sizes="100vw"
                  alt="plant background"
                />                   
              </div>    
                     
            </div>           
            <div className="p-10 text-orange">
              <h4 className="text-4xl font-bold py-4">{slides[activeSlide].title}</h4>
              <p className="text-2xl font-bold">
                This month, we're excited to highlight the Calathea Orbifolia, a plant that gives ultimate jungle vibes with its big, round, striped leaves. It's a true showstopper, loved by plant enthusiasts and a popular ornamental piece in urban jungles. Whether your home is boho minimalist or a thriving jungle, this plant radiates charm in any room. For the entire month of July, you can shop this beautiful botanical at a special discount!
              </p>
              <div className="flex text-xl font-bold justify-between pt-10 pb-24">
                <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}><span><ArrowRight size={24} /></span><span>Discover more</span></Link>
                <LinkBtn href={'#'} className={'border-orange hover:text-white hover:bg-orange'}>Shop with discount</LinkBtn>
              </div>
            </div>
          </div>
        </div>        

        <div className="col-span-7 col-start-3 mt-[-4rem]">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, A11y]}
            spaceBetween={10}
            slidesPerView={3}
            navigation={true}
            onNavigationNext={(swiper: any) => console.log('next')}
            onNavigationPrev={(swiper: any) => console.log('prev')}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            pagination={false}
            scrollbar={false}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} onClick={() => handleSlideClick(index)}>
                <div className="h-80 relative cursor-pointer">
                  <Image
                    src={slide.src}
                    width={300}
                    height={200}
                    objectFit="fill"
                    sizes="100vw"
                    alt={`slide ${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>    
    </div>
  );
};