"use client";

import Container from "@/components/ui/container";
import { useContext, useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { CartContext } from "@/context/cart";

const CartPage = () => {  
  const [isMounted, setIsMounted] = useState(false);  

  const {cartItems, cartTotal} = useContext(CartContext);
  
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
                    <CartItem key={item.id} data={item}/>
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