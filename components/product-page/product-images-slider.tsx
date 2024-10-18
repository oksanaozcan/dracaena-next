"use client";

import React, { useRef, useState } from "react";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { useMediaQuery } from 'react-responsive';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import IconButton from "../ui/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MobileProductImagesSlider } from "./mobile-product-images-slider";

interface IImage {
  id: string;
  url: string;
}

interface ProductImagesSliderProps {
  images: IImage[];
}

export const ProductImagesSlider: React.FC<ProductImagesSliderProps> = ({ images }) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  const verticalSwiperRef = useRef<SwiperRef>(null); // Ref for the vertical Swiper

  const handleSlideClick = (index: number): void => {
    setActiveSlide(index);
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
    if (verticalSwiperRef.current?.swiper) {
      verticalSwiperRef.current.swiper.slideToLoop(index);
    }
  };

  const handleArrowsClick = (direction: 'left' | 'right'): void => {
    let newIndex = activeSlide;
    if (direction === 'left') {
      newIndex = activeSlide > 0 ? activeSlide - 1 : images.length - 1;
    } else if (direction === 'right') {
      newIndex = activeSlide < images.length - 1 ? activeSlide + 1 : 0;
    }
    handleSlideClick(newIndex);
  };

  return (
    <div className="relative">     
    {
      isMobile ?
      <MobileProductImagesSlider images={images}/> :
      <div className="flex gap-1">      
       
        <div className="w-1/4">
        <Swiper
          ref={verticalSwiperRef}
          modules={[Navigation, A11y, Pagination, Scrollbar]}
          spaceBetween={10}
          slidesPerView={4}
          direction={"vertical"}
          loop={images.length > 4}
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          pagination={false}
          scrollbar={{ draggable: true }}
          style={{ height: '600px' }}
        >
          {images.map((slide, index) => (
            <SwiperSlide key={slide.id} onClick={() => handleSlideClick(index)}>
              <div className="h-40 relative cursor-pointer">
                <Image
                  src={slide.url}
                  layout="fill"
                  objectFit="cover"
                  sizes="100vw"
                  alt={`slide ${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>          
        </div>
       
        <div className="relative w-3/4">
          <Image
            src={images[activeSlide].url}
            width={400}
            height={600}
            objectFit="cover"
            alt="Selected slide"
            priority
          />
          <div className='absolute inset-x-0 bottom-0 flex justify-center gap-3 p-4'>
            <IconButton 
              className='bg-transparent text-white hover:bg-gold' 
              onClick={() => handleArrowsClick('left')} icon={<ArrowLeft size={24}/>} 
            />
            <IconButton 
              className='bg-transparent text-white hover:bg-gold' 
              onClick={() => handleArrowsClick('right')} icon={<ArrowRight size={24}/>} 
            />
          </div>
        </div>

      </div>
    }      
    </div>
  );
};