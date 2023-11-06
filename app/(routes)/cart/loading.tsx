import CartItemSkeleton from "@/components/loading-ui/cart-item-skeleton";
import Container from "@/components/ui/container";

export default function Loading() {
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping cart</h1>    
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <ul>
                <CartItemSkeleton/>
              </ul>
            </div>
          <div className="h-20 bg-gray-300 rounded-md w-40"/>
          </div>
        </div>
      </Container>
    </div>
  )
}