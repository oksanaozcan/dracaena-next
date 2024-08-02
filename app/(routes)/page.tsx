import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import { fetchProducts } from "@/actions/fetch-products";
import { InfoLine } from "@/components/info-line";
import { Trademark } from "@/components/trademark";
import getCategories from "@/actions/get-categories";
import { PopularCategoriesList } from "@/components/popular-categories-list";
import { PlantCareEssential } from "@/components/plant-care-essentials";
import { NewReleasesSection } from "@/components/new-releases-section";
import { PlantOfTheMonthSection } from "@/components/plant-of-month-section";
import { CareSliderSection } from "@/components/care-slider-section";

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

  const newRelease = products.data.slice(0, 6);

  const careCategory = categories.data.find(item => item.title === 'care'); 
  
  return (
    <div className="bg-beige-100 dark:bg-slate-800 dark:text-white">
      <Billboard data={billboard}/>
      <Container>
        <div className="space-y-10 p-8">        
          <Trademark/>
          <PopularCategoriesList categories={categories}/>
          <PlantCareEssential/>
          <NewReleasesSection newRelease={newRelease}/>       
          <InfoLine/>
        </div>
      </Container>
      <div className="bg-beige-300 dark:bg-slate-800 dark:text-white">
        <Container>
          <PlantOfTheMonthSection/>
        </Container>
      </div>    
      {careCategory && <CareSliderSection careCategory={careCategory} />}
    </div>
  )
}

export default HomePage;