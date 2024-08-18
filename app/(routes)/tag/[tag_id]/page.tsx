import { fetchProducts } from "@/actions/fetch-products";
import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import { v4 as uuidv4 } from 'uuid';
import Sortbox from "@/components/ui/sortbox";
import React from "react";
import { sortingParams } from "@/lib/sorting-params";

export const revalidate = 0;

interface TagPageProps {
  params: {
    category_id: string;
    tag_id: string;
  }  
}

const TagPage: React.FC<TagPageProps> = async ({
  params,
}) => {
  
  const billboardData = await getBillboard({
    category_id: params.category_id,
    tag_id: params.tag_id,
  });
  const productsData = await fetchProducts({    
    category_id: params.category_id,
    tag_id: params.tag_id,
  });

  const [products, billboard] = await Promise.all([productsData, billboardData]);  

  return (
    <div className="bg-beige-100 dark:bg-slate-800 dark:text-white">
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
            <ProductList category_filter_id={undefined} tag_id={params.tag_id} category_id={params.category_id} title="Tag" initialItems={products}/>
          </ul>     
      </div>
    </Container>
    </div>
  )
}

export default TagPage;