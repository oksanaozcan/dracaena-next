'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCookie } from 'cookies-next';
import ProductCard from './product-card';
import { useAuth } from '@/context/auth-contex';
import { GuestRecentlyViewedProductCard } from './guest-recently-viewed-product-card';
import { IProduct, IGuestProduct } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type RecentlyViewedItem = IProduct | IGuestProduct;

interface RecentlyViewedProps {
  currentProductId: string;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ currentProductId }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const accessToken = getCookie("dracaena_access_token");    

    const fetchRecentlyViewedItems = async () => {
      if (accessToken) {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/recently-viewed-items`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          });
          let newRecentlyViewed = response.data.data.filter((item: IProduct) => item.id !== currentProductId);
          setRecentlyViewed(newRecentlyViewed);
        } catch (error) {
          console.error('Failed to fetch recently viewed items:', error);
        }
      } else {
        const storedRecentlyViewed: IGuestProduct[] = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
        let newRecentlyViewed = storedRecentlyViewed.filter(item => item.id !== currentProductId);
        setRecentlyViewed(newRecentlyViewed);
      }
    };

    fetchRecentlyViewedItems();
  }, [currentProductId]);

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
      >
        {
          recentlyViewed.map(item => (
            <SwiperSlide key={item.id} className='pb-10'>
              {
                isAuthenticated && 'description' in item ? 
                <ProductCard item={item as IProduct}/> :
                <GuestRecentlyViewedProductCard item={item as IGuestProduct}/>             
              }                   
            </SwiperSlide>
          ))
        }      
      </Swiper>
    </div>
  );
};

export default RecentlyViewed;