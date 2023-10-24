import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export const CartContext = createContext(null);

// interface CartProviderProps {
//   children: React.ReactNode
// }

const CartProvider = ({ 
  children
}) => {
  const {userId} = useAuth(); 
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchItems(userId);
    }   
  }, [])  

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      return total + Number(item.price)
    },0);

    setCartTotal(totalPrice)
  }, [cartItems, userId])

  const fetchItems = async (userId: string) => {     
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts/${userId}`);      
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const newItems = await res.data.data;    
    setCartItems(newItems);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider;
