'use client';

import Container from "@/components/ui/container";
import { CategoryFilter, Tag } from "@/types";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/legacy/image";
import Link from "next/link";
import { LinkBtn } from "./ui/link-btn";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useRef, useState } from "react";
import { ArrowRight, GlassWaterIcon, GrabIcon, TreePine, TreesIcon } from "lucide-react";

interface CareCategory {
  id: string;
  title: string;
  preview: string;
  category_filters: CategoryFilter[];
  tags: Tag[];
}

interface CareSliderSectionProps {
  careCategory: CareCategory;
}

export const CareSliderSection: React.FC<CareSliderSectionProps> = ({ careCategory }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>();
  const swiperRef = useRef(null);

  useEffect(() => {
    const initialFilter = careCategory.category_filters[0];
    setActiveFilter(initialFilter);
  }, [careCategory.category_filters]);

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
            <div className="py-4 bg-beige-200 my-6">
              <Swiper
                className="text-center font-bold text-2xl"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => {}}
                onSlideChange={() => {}}
              >
                {careCategory.category_filters.map((f, i) => (
                  <SwiperSlide key={f.id} onClick={() => handleSlideClick(i)}>
                    <div className={`cursor-pointer flex justify-center items-center ${activeFilter?.id === f.id ? 'underline' : ''}`}>
                      <span className="pr-2">{filterAdditions.find(fa => fa.title === f.title)?.icon}</span>
                      <span>{f.title}</span>                       
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h5 className="text-3xl font-bold py-4 capitalize">{activeFilter?.title}</h5>
              <p className="text-bold text-xl">{filterAdditions.find(item => item.title === activeFilter?.title)?.text}</p>
            </div>
            <div className="flex text-xl font-bold justify-between pt-10 pb-24">
                <Link className="flex my-4 items-center gap-1 underline mb-2 hover:text-gold" href={'#'}><span><ArrowRight size={24} /></span><span>Read more</span></Link>
                <LinkBtn href={'#'} className={'border-custom-green hover:text-white hover:bg-gold hover:border-gold'}>Shop {activeFilter?.title} {activeFilter?.title === 'watering' && 'tools'}</LinkBtn>
              </div>
          </div>
          
        </div>
      </Container>
    </section>
  );
};

const filterAdditions = [
  {
    title: 'watering', 
    src: '/images/care-slider/watering-filter.jpg',
    icon: <GlassWaterIcon size={28}/>,
    text: 'Watering your houseplants sounds easy. Yet it is something that many people struggle with, especially when it comes to doing it the right way. There are so many factors that make it difficult to know exactly when and how often to water, let alone how much each plant needs.'
  },
  {
    title: 'potting soil', 
    src: '/images/care-slider/soil-filter.jpg',
    icon: <TreePine size={28}/>,
    text: 'Choosing the right soil or substrate/growing medium for your houseplants can often feel like a complex puzzle. What are different substrates? Which one should I choose? These questions often arise when we face our houseplant repotting.'
  },
  {
    title: 'propagation', 
    src: '/images/care-slider/propagation-filter.jpg',
    icon: <TreesIcon size={28}/>,
    text: 'While outdoor plants can pull food from the big ground around them, our inside plant buddies only have their little pots to rely on. So, they sometimes need a bit of extra help from us. As we occasionally need a vitamin boost, our leafy friends also benefit from added nutrients. It just keeps them looking lush and beautiful!'
  },
  {
    title: 'growth', 
    src: '/images/care-slider/growth-filter.jpg',
    icon: <GrabIcon size={28}/>,
    text: 'Just like us, some plants love to be in the sun, and others prefer a place with a little more shade. The light requirement of your plant is very important because it determines how your plant looks and how fast it grows. The location of a plant also affects its watering, so there are a lot of factors to take into account!'
  },
]