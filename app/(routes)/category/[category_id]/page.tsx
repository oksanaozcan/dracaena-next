import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import React from "react";

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
    colorId: searchParams.colorId,    
  });

  // const sizes = await getSizes();

  const [products, billboard] = await Promise.all([productsData, billboardData]);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={billboard}/>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* <MobileFilters sizes={sizes} colors={colors}/> */}
            <div className="hidden lg:block">
              {/* <Filter
                valueKey="sizeId"
                names="Sizes"
                data={sizes}
              /> */}
                {/* <Filter
                valueKey="colorId"
                names="Colors"
                data={colors}
              /> */}
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {
                products.data.length === 0 && <NoResults/>
              }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {
                products.data.map(item => (
                  <ProductCard key={item.id} item={item}/>
                ))
              }
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage;