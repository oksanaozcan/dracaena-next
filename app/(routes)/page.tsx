import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import ProductList from "@/components/product-list";
import { fetchProducts } from "@/actions/fetch-products";
import { v4 as uuidv4 } from 'uuid';
import { InfoLine } from "@/components/info-line";
import Link from "next/link";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import { Trademark } from "@/components/trademark";
import getCategories from "@/actions/get-categories";
import { url } from "inspector";

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

          <div 
            className="p-4 sm:p-6 lg:p-8"
          >            
            <Link className="flex items-center gap-1 underline hover:text-gold mb-2" href={'#'}><h1>Popular categories</h1><span><ArrowRight size={24}/></span></Link>
            <div            
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {
                categories.data.slice(0,4).map(cat => {
                  return (
                    <div 
                      key={cat.id}
                      className="w-full overflow-hidden shadow-lg"
                      style={{
                        backgroundImage: `url(${cat.preview})`,
                        aspectRatio: 272/366,
                      }}
                    >                   
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{cat.title}</div>                    
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>                    
                      </div>
                    </div>
                  )
                })
              }                    
            </div>               
          </div>

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