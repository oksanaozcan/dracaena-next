import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

const HomePage = async () => {
  const billboardData = await getBillboard('1')
  const productsData = await getProducts({});

  const [billboard, products] = await Promise.all([billboardData, productsData])
  
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard}/>
        <div className="fflex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="All Products" items={products}/>
        </div>
      </div>
    </Container>
  )
}

export default HomePage;