import React, { createContext, useState, useEffect, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import { useAuth } from "./auth-contex";
import { getCookie } from "cookies-next";

interface CartContextType {
  cartItems: IProduct[];
  cartTotal: number;
  onRemove: (productId: string) => Promise<void>;
  onAdd: (productId: string) => Promise<void>;
  isLoading: boolean;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  cartTotal: 0,
  onRemove: async () => {},
  onAdd: async () => {},
  isLoading: false,
});

interface CartProviderProps {
  children: React.ReactNode
}

const CartProvider: React.FC<CartProviderProps> = ({ 
  children
}) => {
  const {logout} = useAuth();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {   
    const token = getCookie('dracaena_access_token');
    if (token) {
      fetchItems();
    }   
  }, []);

  useEffect(() => {
    const totalPrice = cartItems.reduce((total, item) => {
      // Check if item and item.price are valid before adding
      return total + (item && item.price ? Number(item.price) : 0);
    }, 0);
    setCartTotal(totalPrice);
  }, [cartItems]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('dracaena_access_token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      setCartItems(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch cart items", error);
      toast.error("Failed to fetch cart items");
      if (error.response?.status === 401) {        
        logout();
      }     
    } finally {
      setIsLoading(false);
    }
  };

  const onAdd = async (productId: string) => {
    setIsLoading(true);
    const token = getCookie('dracaena_access_token');
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/carts`,
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const addedProduct = response.data.product;
  
      setCartItems((prevItems) => [...prevItems, addedProduct]);
  
      toast.success("Product added to your cart successfully");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err);
        if (err.response.data.message === "out_of_stock") {
          toast.error("This product is out of stock and cannot be added to the cart.");
        } else {
          toast.error("Something went wrong! Check your internet connection and try again");
        }
      } else {
        toast.error("Something went wrong! Check your internet connection and try again");
      }
    } finally {
      setIsLoading(false);
    }
  }; 

  const onRemove = async (productId: string) => {
  setIsLoading(true);
  const token = getCookie('dracaena_access_token');
  
  try {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        product_id: productId,
      },
    });

    if (!response.data) {
      throw new Error("Failed to remove item from cart");
    }

    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    toast.success("Product successfully removed from your cart");
  } catch (error) {
    console.error("Failed to remove item from cart", error);
    toast.error("Failed to remove item from cart. Please try again.");
  } finally {
    setIsLoading(false);
  }
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