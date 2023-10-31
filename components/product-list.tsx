import { IProductsResource } from "@/types";
import React, { Suspense } from "react";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import ProductCardSkeleton from "./loading-ui/product-card-skeleton";

interface ProductListProps {
  title: string
  items: IProductsResource
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
}) => {
  return (
    <div className="space-y-4">
      <h3>{title}</h3>
      { items.data.length == 0 && <NoResults/> }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          items.data.map(item => <Suspense fallback={<ProductCardSkeleton/>}><ProductCard key={item.id} item={item}/></Suspense>)
        }
      </div>
    </div>
  );
}

export default ProductList;