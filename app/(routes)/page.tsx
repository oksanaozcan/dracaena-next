import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import ProductList from "@/components/product-list";
import { fetchProducts } from "@/actions/fetch-products";
import { v4 as uuidv4 } from 'uuid';

export const revalidate = 0;

const HomePage = async ({
  searchParams
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const billboardData = await getBillboard({})
  const productsData = await fetchProducts({search});

  const [billboard, products] = await Promise.all([billboardData, productsData])
  
  return (
    <Container>
      <div className="space-y-10 pb-10">
          <Billboard data={billboard}/>
        <ul 
          key={uuidv4()}
          className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8"
        >
          <ProductList tag_id="" category_id="" search={search} title="All Products" initialItems={products}/>
        </ul>
      </div>
    </Container>
  )
}

export default HomePage;