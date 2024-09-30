import React, { useEffect, useState } from "react";
import axios from "axios";
import { Category, IProduct } from "@/types";
import Image from "next/legacy/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import { LinkBtn } from "./ui/link-btn";

import 'swiper/css';
import 'swiper/css/navigation';

interface RelatedProductsSliderProps {
  category: Category;
  size?: string;
}

export const RelatedProductsSlider: React.FC<RelatedProductsSliderProps> = ({ category, size }) => {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/related-products`, {
          params: { category: category.title, size: size },
        });
        setRelatedProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching related products", error);
      }
    };

    fetchRelatedProducts();
  }, [category, size]);   

  if (!relatedProducts || relatedProducts.length === 0) return <div>No related products available</div>;

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 1, // Mobile view (1 slide per view)
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2, // Tablet view (2 slides per view)
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3, // Desktop view (3 slides per view)
            spaceBetween: 30,
          },
        }}
      >
        {relatedProducts.map(item => (
          <SwiperSlide
            key={item.id}
            onMouseEnter={() => setHoveredProductId(item.id)}
            onMouseLeave={() => setHoveredProductId(null)}
          >
            <div className="relative">
              <div>
                <Image
                  src={item.preview}
                  width={250}
                  height={300}
                  objectFit="cover"
                  alt={item.title}
                  priority
                />
                <div className="text-center">{item.price}</div>
              </div>
              {hoveredProductId === item.id && (
                <div className="absolute top-0 left-0 bg-white p-4 shadow-lg w-full">
                  <h6 className="line-clamp-1">{item.title} {item.size && `(${item.size})`}</h6>
                  <small className="italic">14 cm</small>
                  <div className="border-y my-1 py-1 border-custom-green flex justify-between items-center">
                  <div className="text-sm text-center flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-diameter">
                        <circle cx="19" cy="19" r="2" />
                        <circle cx="5" cy="5" r="2" />
                        <path d="M6.48 3.66a10 10 0 0 1 13.86 13.86" />
                        <path d="m6.41 6.41 11.18 11.18" />
                        <path d="M3.66 6.48a10 10 0 0 0 13.86 13.86" />
                      </svg>
                      <div>Diameter</div>
                      <span>14 cm</span>
                    </div>
                    <div className="text-sm text-center flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-vertical"><polyline points="8 18 12 22 16 18"/><polyline points="8 6 12 2 16 6"/><line x1="12" x2="12" y1="2" y2="22"/></svg>
                      <div>Height</div>
                      <span>18 cm</span>
                    </div>                         
                  </div>       
                  <div className="flex">
                    <LinkBtn className="hover:text-white" href={`/products/${item.id}`}>Details</LinkBtn>
                    <button>Select</button>          
                  </div>           
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
