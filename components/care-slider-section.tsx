'use client';

import { cn } from "@/lib/utils";
import Container from "@/components/ui/container";
import { CategoryFilter, IProductCareSlider, IProductsCareSliderResource, Tag } from "@/types";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/legacy/image";
import Link from "next/link";
import { LinkBtn } from "./ui/link-btn";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { filterAdditions } from "@/lib/filter-additions";
import ProductCard from "./ui/product-card";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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
  const swiperRef = useRef(null);

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
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(i);
    }
  };

  return (
    <section>
      <Container>
        <div className="grid grid-cols-12 gap-2 py-20">
          <div className="col-span-4">
            <Image
              src={activeFilter ? filterAdditions.find(img => img.title === activeFilter.title)?.src : filterAdditions[0].src}
              width={400}
              height={600}
              objectFit="cover"
              alt="plant of month image"
            />
          </div>

          <div className="col-span-8 pl-8">
            <h4 className="text-4xl font-bold py-4">
              We are happy to help you care for your plants!
            </h4>
            <div className="py-4 bg-beige-200 my-6 relative">
              <Swiper
                className={cn('text-center font-bold text-2xl')}
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
                      <span className="pr-1">{filterAdditions.find(fa => fa.title === f.title)?.icon}</span>
                      <span>{f.title}</span>                       
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="custom-swiper-arrow custom-swiper-arrow-next"><ChevronLeft/></button>
              <button className="custom-swiper-arrow custom-swiper-arrow-prev"><ChevronRight/></button>
            </div>
            <div>
              <h5 className="text-3xl font-bold py-4 capitalize">{activeFilter?.title}</h5>
              <p className="text-bold text-xl">{filterAdditions.find(item => item.title === activeFilter?.title)?.text}</p>
            </div>
            <div className="flex text-xl font-bold justify-between pt-10 pb-24">
                <Link className="flex my-4 items-center gap-1 underline mb-2 hover:text-gold" href={'#'}><span><ArrowRight size={24} /></span><span>Read more</span></Link>
                <LinkBtn href={`/category-filter/${activeFilter?.id}`} className={'border-custom-green hover:text-white hover:bg-gold hover:border-gold'}>Shop {activeFilter?.title} {activeFilter?.title === 'watering' && 'tools'}</LinkBtn>
              </div>
          </div>
        </div>
      </Container>
      <div className="bg-olive-100 dark:bg-slate-800 dark:text-white">
        <Container>
          <div className="py-4 font-bold text-2xl flex w-full items-end">
            <Link className="text-white flex items-center my-4 gap-1 underline mb-2 hover:text-gold ml-auto" href={'/category/3'}>
              <span>All care products</span>
              <span><ArrowRight size={24} /></span>
            </Link>                         
          </div>

          <div className="pb-10">
            <Swiper
              spaceBetween={50}
              slidesPerView={3}
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