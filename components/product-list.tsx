'use client'

import { IProductsResource } from "@/types";
import React, { Suspense, useState, useEffect } from "react";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import ProductCardSkeleton from "./loading-ui/product-card-skeleton";
import { useInView } from 'react-intersection-observer'
import { fetchProducts } from "@/actions/fetch-products";
import { v4 as uuidv4 } from 'uuid';
import LoadingSpinner from "./ui/loading-spinner";

interface ProductListProps {
  title: string
  initialItems: IProductsResource
  search?: string | undefined
  category_id: string | undefined
  tag_id: string | undefined
  category_filter_id: string | undefined
  sort?: string
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  initialItems,
  search,
  category_id,
  tag_id,
  category_filter_id,
  sort
}) => {
  const [items, setItems] = useState(initialItems && initialItems.data ? initialItems.data : []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  async function loadMoreProducts() {
    if (!hasMore) return;

    const next = page + 1;
    const newItems = await fetchProducts({ search, category_id, tag_id, category_filter_id, page: next, sort });
    
    if (newItems.data?.length) {
      setPage(next);
      setItems((prev) => [
        ...(prev?.length ? prev : []),
        ...newItems.data,
      ]);
    } else {
      setHasMore(false);
    }
  }

  // TODO: wrap loadMoreProducts in useCallback and pass it to the dep array
  useEffect(() => {
    if (inView) {
      loadMoreProducts()
    }
  }, [inView])  

  return (
    <>
    <div className="space-y-4">
      <h3>{title}</h3>
      { items.length == 0 && <NoResults/> }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          items.map(item => <Suspense 
            key={uuidv4()} 
            fallback={<ProductCardSkeleton/>}
            ><ProductCard item={item}/></Suspense>)
        }
      </div>
    </div>
    {hasMore && (
        <div ref={ref} className="col-span-1 mt-16 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default ProductList;