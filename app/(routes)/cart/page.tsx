"use client";

import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const CartPage = () => {
  const {userId} = useAuth(); 
  const [isMounted, setIsMounted] = useState(false);  
  const [cartItems, setCartItems] = useState([]); 

  const fetchItems = async (userId: string) => {     
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts/${userId}`);      
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const newItems = await res.data.data;    
    setCartItems(newItems);
  }
  
  useEffect(() => {    
    setIsMounted(true);
  }, [])  
  
  useEffect(() => {
    if (userId) {
      fetchItems(userId);
    }   
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
          {/* <Summary/> */}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CartPage;