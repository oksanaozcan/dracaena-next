import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import Sortbox from "@/components/ui/sortbox";
import React from "react";
import { sortingParams } from "@/lib/sorting-params";
import { v4 as uuidv4 } from 'uuid';
import ProductList from "@/components/product-list";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    category_id: string;
    tag_id: string;
  },
  searchParams: {
    colorId: string;    
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  
  const billboardData = await getBillboard({
    category_id: params.category_id,
    tag_id: params.tag_id,
  });
  const productsData = await getProducts({    
    category_id: params.category_id,
    tag_id: params.tag_id,
  });

  const [products, billboard] = await Promise.all([productsData, billboardData]);

  return (    
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard}/>      
        <div className="ml-8">
          <Sortbox params={sortingParams}/> 
        </div>            
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            {
              products.data.length === 0 && <NoResults/>
            }
          </div>           
          <ul 
            key={uuidv4()}
            className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
          >
            <ProductList title="Category" initialItems={products}/>
          </ul>     
      </div>
    </Container>
  )
}

export default CategoryPage;