"use client";

import { FavouriteContext } from "@/context/favourite";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ui/product-card";
import Pagination from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 6;

const MyFavouritesPage: React.FC = () => {
  const { favouriteItems } = useContext(FavouriteContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [favouriteItems]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedItems = favouriteItems.slice(startIndex, endIndex);

  const totalPages = Math.ceil(favouriteItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Wishlist</h1>     
      {paginatedItems.length === 0 ? (
        <p>You have not selected any favourites yet.</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {paginatedItems.map((item) => (
            <div key={item.id}>
              <ProductCard item={item} />
            </div>
          ))}
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

export default MyFavouritesPage;