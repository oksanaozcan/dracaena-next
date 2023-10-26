import React, { createContext, useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import { IProduct } from "@/types";

interface CartContextType {
  cartItems: IProduct[];
  cartTotal: number;
  onRemove: (productId: string) => Promise<void>;
  onAdd: (productId: string) => Promise<void>;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({ 
  children
}) => {
  const {userId} = useAuth(); 
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);  
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
 
  const onAdd = async ( 
    productId: string
    ) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      product_id: productId,
      client_id: userId
    }).then((res) => {
      fetchItems();
      toast.success("Product added to your cart successfully");      
    }
    ).catch((err) => {
      toast.error("Something went wrong! Check your internet connection and try again");  
      console.log(err)
    }).finally(() => {
      setIsLoading(false);
    })
  }

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
        onRemove, 
        onAdd,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  )

}

export default CartProvider;
