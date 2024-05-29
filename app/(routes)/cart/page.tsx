"use client";

import Container from "@/components/ui/container";
import { Suspense, useContext, useEffect, useState } from "react";
import CartItem from "./_components/cart-item";
import Summary from "./_components/summary";
import { CartContext } from "@/context/cart";
import CartItemSkeleton from "@/components/loading-ui/cart-item-skeleton";

const CartPage = () => {  
  const {cartItems, cartTotal} = useContext(CartContext);
  
  const [isMounted, setIsMounted] = useState(false);    
  
  useEffect(() => {    
    setIsMounted(true);
  }, [])     

  if (!isMounted) return null;
  
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping cart</h1>    
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cartItems.length === 0 && <p className="text-neuteral-500">No items added to cart</p>}
              <ul>
                {
                  cartItems.map(item => (
                    <Suspense key={item.id} fallback={<CartItemSkeleton/>}>
                      <CartItem data={item}/>
                    </Suspense>
                  ))
                }
              </ul>
            </div>
          <Summary totalPrice={cartTotal}/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage;