'use client';

import { cn } from "@/lib/utils";
import Container from "@/components/ui/container";
import { CategoryFilter, IProductCareSlider, IProductsCareSliderResource, Tag } from "@/types";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/legacy/image";
import Link from "next/link";
import { LinkBtn } from "@/components/ui/link-btn";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { filterAdditions } from "@/lib/filter-additions";
import ProductCard from "@/components/ui/product-card";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore from 'swiper';  // Import SwiperCore as a type

interface CareCategory {
  id: string;
  title: string;
  preview: string;
  category_filters: CategoryFilter[];
  tags: Tag[];
}

interface CareSliderSectionProps {
  careCategory: CareCategory;
  careSliderProducts: IProductsCareSliderResource;
}

export const CareSliderSection: React.FC<CareSliderSectionProps> = ({ careCategory, careSliderProducts }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>();
  const [filteredProducts, setFilteredProducts] = useState<IProductCareSlider[]>([]);
  const swiperRef = useRef<SwiperCore | null>(null); // Use SwiperCore as the type

  useEffect(() => {
    const initialFilter = careCategory.category_filters[0];
    setActiveFilter(initialFilter);
  }, [careCategory.category_filters]);

  useEffect(() => {
    if (activeFilter) {
      const filtered = careSliderProducts.data.filter(product => product.category_filter_id === activeFilter.id);
      setFilteredProducts(filtered);
    }
  }, [activeFilter, careSliderProducts]);

  const handleSlideClick = (i: number) => {
    let newFilter = careCategory.category_filters[i];
    setActiveFilter(newFilter);
    if (swiperRef.current && typeof swiperRef.current.slideTo === 'function') {
      swiperRef.current.slideTo(i);
    }
  };

  return (
    <section>
      <Container>
        <div className="grid grid-cols-12 gap-2 py-10 lg:py-20">
          <div className="hidden md:block lg:col-span-4">
            <Image
              src={activeFilter ? filterAdditions.find(img => img.title === activeFilter.title)?.src ?? "" : filterAdditions[0].src}
              width={400}
              height={600}
              objectFit="cover"
              alt="plant of month image"
            />
          </div>

          <div className="col-span-12 lg:col-span-8 lg:pl-8">
            <h4 className="text-center px-4 lg:px-0 text-2xl lg:text-4xl font-bold lg:py-4">
              We are happy to help you care for your plants!
            </h4>
            <div className="py-4 bg-beige-200 my-6 relative">
              <Swiper
                onSwiper={(swiperInstance) => (swiperRef.current = swiperInstance)} // Capture the swiper instance
                className={cn('text-center font-bold lg:text-2xl')}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={{ 
                  nextEl: ".custom-swiper-arrow-prev", 
                  prevEl: ".custom-swiper-arrow-next" 
                }}                                 
              >
                {careCategory.category_filters.map((f, i) => (
                  <SwiperSlide key={f.id} onClick={() => handleSlideClick(i)}>
                    <div className={`cursor-pointer flex justify-center items-center hover:text-gold ${activeFilter?.id === f.id ? 'underline' : ''}`}>
                      <span className="hidden md:block pr-1">{filterAdditions.find(fa => fa.title === f.title)?.icon}</span>
                      <span>{f.title}</span>                       
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="custom-swiper-arrow custom-swiper-arrow-next bg-slate-700/20"><ChevronLeft/></button>
              <button className="custom-swiper-arrow custom-swiper-arrow-prev bg-slate-700/20"><ChevronRight/></button>
            </div>
            <div>
              <h5 className="text-xl text-center lg:text-3xl font-bold lg:py-4 capitalize">{activeFilter?.title}</h5>
              <p className="text-bold text-lg px-4 lg:text-xl">{filterAdditions.find(item => item.title === activeFilter?.title)?.text}</p>
            </div>
            <div className="flex lg:text-xl font-bold justify-between pt-4 lg:pt-10 lg:pb-24 px-4 lg:px-0">
                <Link className="flex lg:my-4 items-center gap-1 underline mb-2 hover:text-gold" href={'#'}><span><ArrowRight size={24} /></span><span>Read more</span></Link>
                <LinkBtn href={`/category-filter/${activeFilter?.id}`} className={'border-custom-green hover:text-white hover:bg-gold hover:border-gold'}>Shop {activeFilter?.title} {activeFilter?.title === 'watering' && 'tools'}</LinkBtn>
              </div>
          </div>
        </div>
      </Container>
      <div className="bg-olive-100 dark:bg-slate-800 dark:text-white">
        <Container>
          <div className=" py-2 lg:py-4 font-bold lg:text-2xl flex w-full items-end">
            <Link className="text-white flex items-center my-4 gap-1 underline mb-2 hover:text-gold ml-auto" href={'/category/3'}>
              <span>All care products</span>
              <span><ArrowRight size={24} /></span>
            </Link>                         
          </div>

          <div className="px-4 pb-4 lg:pb-10">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },             
                639: {
                  slidesPerView: 2,
                },
                865:{
                  slidesPerView: 3
                },             
              }}
            >
              {filteredProducts.map(item => (
                <SwiperSlide key={item.id}><ProductCard item={item} /></SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>     
      </div>
    </section>
  );
};