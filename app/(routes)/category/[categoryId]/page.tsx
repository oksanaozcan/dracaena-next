import getProducts from "@/actions/get-products";
import React from "react";

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const productsData = await getProducts({
    // categoryId: params.categoryId,
    categoryId: "2",
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId
  });

  const [products] = await Promise.all([productsData]);

  // console.log(products)

  return (
    <div>
      Category Page
    </div>
  )
}

export default CategoryPage;