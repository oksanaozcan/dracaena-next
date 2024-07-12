'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCookie } from 'cookies-next';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ProductCard from './product-card';

const RecentlyViewed = ({currentProductId}) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {   

    const fetchRecentlyViewedItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recently-viewed-items`, {
          headers: {
            Authorization: `Bearer ${getCookie("dracaena_access_token")}`,
          }
        });
        let newRecentlyViewed = response.data.data.filter(item => item.id != currentProductId);
        setRecentlyViewed(newRecentlyViewed);
      } catch (error) {
        console.error('Failed to fetch recently viewed items:', error);
      }
    };
   
    fetchRecentlyViewedItems();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recently Viewed Products</h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}       
      >
      {
        recentlyViewed.map(item => (
          <SwiperSlide key={item.id} className='pb-10'>
            <ProductCard item={item}/>          
          </SwiperSlide>
        ))
      }      
    </Swiper>
    </div>
  );
};

export default RecentlyViewed;
