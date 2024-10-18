"use client";

import Image from "next/legacy/image";
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IImage {
  id: string;
  url: string;
}

interface ProductImagesSliderProps {
  images: IImage[];
}

export const MobileProductImagesSlider:React.FC<ProductImagesSliderProps> = ({images}) => {
  return (
    <div>
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}       
        className="swiper-pagination-custom"
      >
        {
          images.map(item => (<SwiperSlide key={item.id}
            >
              <Image
                src={item.url}
                width={380}
                height={500}
                objectFit="cover"
                alt="Selected slide"
                priority
              />
            </SwiperSlide>  
          ))
        }            
      </Swiper>
    </div>
  )
}