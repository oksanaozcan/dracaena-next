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
import getProductsForCareSlider from "@/actions/get-products-for-care-slider";
import { CommunitySlider } from "@/components/community-slider-section";
import { ReviewSliderSection } from "@/components/review-slider-section";
import { BabyPlantSection } from "@/components/baby-plant-section";
import { RarePlantSection } from "@/components/rare-plant-section";
import { JourneySliderSection } from "@/components/journey-slider-section";
import { PopupInfoSection } from "@/components/popup-info-section";

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
  const careSliderData = await getProductsForCareSlider();

  const [billboard, products, categories, careSliderProducts] = await Promise.all([billboardData, productsData, categoriesData, careSliderData]);

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
      {careCategory && <CareSliderSection careCategory={careCategory} careSliderProducts={careSliderProducts} />}
      {/*<div>
        <CommunitySlider/>
      </div>
      <div className="bg-gold text-white dark:bg-slate-800 dark:text-white">
        <Container>
          <ReviewSliderSection/>
        </Container>
      </div>
      <div className="py-16">
        <InfoLine/>
      </div>     
      <div className="bg-beige-400 text-white dark:bg-slate-800 dark:text-white">       
        <BabyPlantSection/>
      </div>
      <div className="bg-custom-blue-200 text-custom-blue-100 dark:bg-slate-800 dark:text-white">       
        <RarePlantSection/>
      </div>
      <Container>
        <JourneySliderSection/>
      </Container>
      <div className="bg-beige-200 dark:bg-slate-800 dark:text-white">
        <Container>
          <PopupInfoSection/>
        </Container>
      </div> */}
    </div>
  )
}

export default HomePage;