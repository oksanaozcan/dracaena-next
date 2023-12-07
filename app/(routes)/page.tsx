import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async ({
  searchParams
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) => {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

  const billboardData = await getBillboard({})
  const productsData = await getProducts({q: search});

  const [billboard, products] = await Promise.all([billboardData, productsData])
  
  return (
    <Container>
      <div className="space-y-10 pb-10">
          <Billboard data={billboard}/>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="All Products" items={products}/>
        </div>
      </div>
    </Container>
  )
}

export default HomePage;