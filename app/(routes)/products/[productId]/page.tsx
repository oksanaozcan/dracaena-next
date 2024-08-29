import getProduct from "@/actions/get-product";
import Container from "@/components/ui/container";
import Info from "@/components/info";
import RecentlyViewed from "@/components/ui/recently-viewed";
import { ProductImagesSlider } from "@/components/product-images-slider";
import { v4 as uuidv4 } from 'uuid';

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

  const [product] = await Promise.all([productData])

  return (
    <div className="bg-beige-100 dark:bg-slate-800 dark:text-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8">            
            <div className="lg:col-span-6">
              <ProductImagesSlider images={[{id: uuidv4(), url: product.preview}, ...product.images]}/> 
            </div>
            <div className="lg:col-span-6 mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info product={product}/>
            </div>
          </div>
          <hr className="my-10"/>         
          <RecentlyViewed currentProductId={product.id}/>
        </div>
      </Container>
    </div>
  )
}

export default ProductPage;