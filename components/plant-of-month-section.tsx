'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/legacy/image";
import Link from "next/link";
import { LinkBtn } from "./ui/link-btn";
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import IconButton from './ui/icon-button';

import 'swiper/css';
import 'swiper/css/navigation';

export const PlantOfTheMonthSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const slides = [
    { id: 1, src: '/images/plant-of-month/plant-of-month-slider-1.jpg', title: 'Calathea Orbifolia' },
    { id: 2, src: '/images/plant-of-month/plant-of-month-slider-2.jpg', title: 'Fiddle Leaf Fig' },
    { id: 3, src: '/images/plant-of-month/plant-of-month-slider-3.jpg', title: 'Snake Plant' },
    { id: 4, src: '/images/plant-of-month/plant-of-month-slider-4.jpg', title: 'Test 1 Plant' },
    { id: 5, src: '/images/plant-of-month/plant-of-month-slider-5.jpg', title: 'Test 2 Plant' },
  ];

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  const handleAroowsClick = (direction: 'left' | 'right'): void => {
    let newIndex = activeSlide;
    if (direction === 'left') {
      newIndex = activeSlide > 0 ? activeSlide - 1 : slides.length - 1;
    }
    if (direction === 'right') {
      newIndex = activeSlide < slides.length - 1 ? activeSlide + 1 : 0;
    }
    handleSlideClick(newIndex);
  };

  return (
    <div className="relative pt-20">
      <div className="absolute z-10 lg:top-1 left-4 top-1 lg:left-32">
        <h2 className="text-3xl lg:text-8xl font-black subpixel-antialiased tracking-wider leading-relaxed text-gold">Plant of the month</h2>
      </div>
      <div className="w-full grid grid-cols-7 gap-4">

        <div className="hidden lg:block lg:col-span-3 h-auto relative">
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

        <div className="col-span-7 lg:col-span-4">
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
            <div className="px-4 lg:p-10 text-orange">
              <h4 className="text-2xl lg:text-4xl font-bold py-1 lg:py-4">{slides[activeSlide].title}</h4>
              <p className="lg:text-2xl font-bold">
                This month, we're excited to highlight the Calathea Orbifolia, a plant that gives ultimate jungle vibes with its big, round, striped leaves. It's a true showstopper, loved by plant enthusiasts and a popular ornamental piece in urban jungles. Whether your home is boho minimalist or a thriving jungle, this plant radiates charm in any room. For the entire month of July, you can shop this beautiful botanical at a special discount!
              </p>
              <div className="flex lg:text-xl lg:font-bold justify-between lg:pt-10 lg:pb-24">
                <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}><span><ArrowRight size={24} /></span><span>Discover more</span></Link>
                <LinkBtn href={'#'} className={'border-orange hover:text-white hover:bg-orange w-1/2'}>Shop with discount</LinkBtn>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-7 lg:col-start-3 lg:mt-[-4rem] pb-4">
          <Swiper
            ref={swiperRef}
            modules={[Navigation, A11y]}
            spaceBetween={10}
            slidesPerView={3}
            loop={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            pagination={false}
            scrollbar={false}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} onClick={() => handleSlideClick(index)}>
                <div className="lg:h-80 relative cursor-pointer pb-4">
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