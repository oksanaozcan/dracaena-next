import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { StringDecoder } from "string_decoder";
import toast from "react-hot-toast";

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
    const totalPrice = cartItems.reduce((total, item) => {
      return total + Number(item.price)
    },0);

    setCartTotal(totalPrice)
  }, [cartItems, userId])

  useEffect(() => {
    if (userId) {
      fetchItems();
    }   
  }, [])  

  const onRemove = async (productId: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {     
      data: {
        userId,
        productId
      }
    });      
    if (!res) {
      toast.error("Something went wrong");
      throw new Error("Failed to remove item from cart");      
    }   
    setCartItems(prevData => prevData.filter(item => item.id != productId)); 
    toast.success("Product successfully removed from your cart");
  }   

  const fetchItems = async () => {     
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
        cartTotal,
        onRemove
      }}
    >
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider;
