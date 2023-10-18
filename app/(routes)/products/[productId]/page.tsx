import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import { auth } from "@clerk/nextjs";

interface ProductPageProps {
  params: {
    productId: string;
  }
}

export const revalidate = 0;

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const productData = await getProduct(params.productId); 
  
  const {userId} = auth();
   
  const suggestedProductsData = await getProducts({
    category_id: productData.data.category.id
  });  

  const [product, suggestedProducts] = await Promise.all([productData, suggestedProductsData])  

  const filteredProducts = {
    ...suggestedProducts,
    data: suggestedProducts.data.filter(item => item.id !== product.data.id)
  }

  return (
    <div className="bg-white ">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">            
            <Gallery images={product.data.images} preview={product.data.preview}/>                         
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info product={product} userId={userId || undefined}/>
            </div>
          </div>
          <hr className="my-10"/>
          <ProductList title="Related Products" items={filteredProducts}/>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage;