import ProductCardSkeleton from "@/components/loading-ui/product-card-skeleton";
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="bg-white ">
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">        
          <div className="h-40 w-40 rounded-md bg-gray-300"/>                
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="h-6 w-30 rounded-md bg-gray-300 m-2"/>
            <div className="h-6 w-30 rounded-md bg-gray-300 m-2"/>
            <div className="h-6 w-30 rounded-md bg-gray-300 m-2"/>
            <div className="h-6 w-30 rounded-md bg-gray-300 m-2"/>
            <div className="h-6 w-30 rounded-md bg-gray-300 m-2"/>
          </div>
        </div>
        <hr className="my-10"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
          <ProductCardSkeleton/>
        </div>       
      </div>
    </Container>
  </div>
  )
}