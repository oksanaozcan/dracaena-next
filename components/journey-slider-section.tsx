'use client';

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/legacy/image";
import 'swiper/css';
import { useRef, useState } from "react";
import IconButton from "./ui/icon-button";
import Link from "next/link";
import { SwiperRef } from 'swiper/react';

interface Slide {
  id: number;
  src: string;
  title: string;
  text: string;
}

export const JourneySliderSection: React.FC = () => {
  const slides: Slide[] = [
    {id: 1, src: '/images/journey-slider/packing.jpg', title: 'Packing', text: 'Your order will be hand picked and packed in our strong and sustainable packaging as soon as possible!'},
    {id: 2, src: '/images/journey-slider/shipping.jpg', title: 'Shipping', text: 'Your order will be delivered straight from our greenhouse to your door by your chosen carrier. You can follow the journey of your plants via the tracking link you receive in your mail.'},
    {id: 3, src: '/images/journey-slider/unboxing.jpg', title: 'Unboxing', text: 'Carefully unpack your new plants, check their condition and give them a sip of water when needed. Place them in a nice spot and they are ready to shine! Happy growing!'},
  ];

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const swiperRef = useRef<SwiperRef>(null);

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  const handleArrowsClick = (direction: 'left' | 'right'): void => {
    let newIndex = activeSlide;
    if (direction === 'left') {
      newIndex = activeSlide > 0 ? activeSlide - 1 : slides.length - 1;
    } else if (direction === 'right') {
      newIndex = activeSlide < slides.length - 1 ? activeSlide + 1 : 0;
    }
    handleSlideClick(newIndex);
  };

  return (
    <div className="pb-10 px-4">
      <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-10 pb-4 text-center md:text-left">
        The journey of your new plant!
      </h5>
      <div className="flex text-lg sm:text-xl pb-10 justify-center md:justify-start">
        <Link className="flex items-center justify-center gap-1 underline mb-2 hover:text-gold" href="#">
          <span>More about shipping</span>
          <span><ArrowRight size={22} /></span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative">
          <Swiper
            ref={swiperRef}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id} onClick={() => handleSlideClick(index)}>
                <div>
                  <div className="w-full border-b border-custom-green">
                    0{slide.id}.
                  </div>
                  <div>
                    <h6 className="text-xl md:text-2xl py-4 font-bold">{slide.title}</h6>
                  </div>
                  <div>
                    <p className="text-sm md:text-base">{slide.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex w-full items-center bottom-8 gap-3 mt-4 justify-center lg:justify-start">
            <IconButton 
              className="bg-transparent text-custom-green border-custom-green hover:bg-gold hover:border-gold hover:text-white" 
              onClick={() => handleArrowsClick('left')} 
              icon={<ArrowLeft size={24} />} 
            />
            <div className="text-lg md:text-xl">{activeSlide + 1}/{slides.length}</div>
            <IconButton 
              className="bg-transparent text-custom-green border-custom-green hover:bg-gold hover:border-gold hover:text-white" 
              onClick={() => handleArrowsClick('right')} 
              icon={<ArrowRight size={24} />} 
            />
          </div>
        </div>
        <div className="lg:col-span-4 relative mt-6 lg:mt-0">
          <div className="relative w-full h-64 lg:h-full">
            <Image
              src={slides[activeSlide].src}
              layout="fill"
              objectFit="cover"
              alt="plant of month image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};