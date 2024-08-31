"use client";

import { useEffect, useState } from "react";
import Pagination from '@/components/ui/pagination';
import { getCookie } from "cookies-next";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-contex";
import { IProductWithReview } from "@/types";
import { RatingCard } from "@/components/ui/rating-card";

const ITEMS_PER_PAGE = 6;

const PerchasedProductsPage: React.FC = () => {
  const {logout} = useAuth();
  const [perchasedItems, setPerchasedItems] = useState<IProductWithReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {   
    const token = getCookie('dracaena_access_token');
    if (token) {
      fetchItems();
    }    
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('dracaena_access_token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/perchased-products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }      
      setPerchasedItems(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch perchased items", error);
      toast.error("Failed to fetch favourite items");
      if (error.response?.status === 401) {        
        logout();
      }     
    } finally {
      setIsLoading(false);
    }
  };  

  useEffect(() => {
    setCurrentPage(1);
  }, [perchasedItems]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = perchasedItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(perchasedItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Here you can rate the purchased product and leave a review</h1>     
      {paginatedItems.length === 0 ? (
        <p>You have not any perchased products yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {paginatedItems.map((item) => <RatingCard key={item.id} item={item}/>
          )}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PerchasedProductsPage;