"use client";

import { RestokeSubscriptionContext } from "@/context/restoke-subscription";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ui/product-card";
import Pagination from '@/components/ui/pagination';
import IconButton from "@/components/ui/icon-button";
import { X } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const MyRestokeSubscriptionPage: React.FC = () => {
  const { restokeSubscriptionItems, onRemove } = useContext(RestokeSubscriptionContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [restokeSubscriptionItems]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = restokeSubscriptionItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(restokeSubscriptionItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Restock notifications</h1>     
      <p>Good news! You will be notified as soon as our popular products are back in stock. We will send you an email as soon as they are available, so keep your inbox. This page contains an overview of the products you have subscribed to.</p>
      {paginatedItems.length === 0 ? (
        <p>You have not selected any out of stoke products yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {paginatedItems.map((item) => {
            if (Number(item.amount) > 0) {
              return (
                <div className="border-2 border-red-600 rounded" key={item.id}>
                  <div className="flex justify-center items-center">
                    <p className="text-red-500 px-4">Already in stoke</p>              
                    <IconButton                  
                      className="my-2"
                      onClick={() => onRemove(item.id)}
                      icon={<X className="text-gray-950" size={20} />}
                    />
                  </div>                 
                  <ProductCard item={item} />
                </div>
              )
            } else {
              return (
                <div key={item.id}>              
                <ProductCard item={item} />
              </div>
              )
            }
          })}
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

export default MyRestokeSubscriptionPage;