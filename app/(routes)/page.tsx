import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import ProductList from "@/components/product-list";
import { fetchProducts } from "@/actions/fetch-products";
import { v4 as uuidv4 } from 'uuid';
import { InfoLine } from "@/components/info-line";
import { Trademark } from "@/components/trademark";
import getCategories from "@/actions/get-categories";
import { PopularCategoriesList } from "@/components/popular-categories-list";
import { PlantCareEssential } from "@/components/plant-care-essentials";

export const revalidate = 0;

const HomePage = async ({
  searchParams
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const billboardData = await getBillboard({})
  const productsData = await fetchProducts({search});
  const categoriesData = await getCategories();

  const [billboard, products, categories] = await Promise.all([billboardData, productsData, categoriesData]);
  
  return (
    <>
     <div className='py-2 bg-beige-200 italic dark:bg-slate-800'>
      <Container>
        <InfoLine/>
      </Container>
     </div>
     <div className="bg-beige-100 dark:bg-slate-800 dark:text-white">
      <Container>
        <div className="space-y-10 pb-10">                      
          <Billboard data={billboard}/>
          <Trademark/>
          <PopularCategoriesList categories={categories}/>
          <PlantCareEssential/>
          <ul 
            key={uuidv4()}
            className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
          >
            <ProductList tag_id="" category_id="" search={search} title="All Products" initialItems={products}/>
          </ul>
        </div>
      </Container>
     </div>   
    </>
  )
}

export default HomePage;