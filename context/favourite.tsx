import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import { getCookie } from "cookies-next";
import { useAuth } from "./auth-contex";

interface FavouriteContextType {
  favouriteItems: IProduct[];
  isLoading: boolean;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
}

interface ErrorResponse {
  error: string;
}

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteItems: [],
  isLoading: false,
  onAdd: async (productId: string) => {},
  onRemove: async (productId: string) => {},
});

interface FavouriteProviderProps {
  children: React.ReactNode;
}

const FavouriteProvider: React.FC<FavouriteProviderProps> = ({ children }) => {  
  const {logout} = useAuth();
  const [favouriteItems, setFavouriteItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {   
    const token = getCookie('dracaena_access_token');
    if (token) {
      fetchItems();
    }    
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('dracaena_access_token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      setFavouriteItems(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch favourite items", error);
      toast.error("Failed to fetch favourite items");
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        product_id: productId,     
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success("Product added to your favourites successfully");
      fetchItems(); // Refresh the favourite items after adding
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response?.status === 400 && error.response.data?.error === 'out_of_stock') {
        toast.error("This product is out of stock and cannot be added to your favourites.");
      } else {
        toast.error("Something went wrong! Check your internet connection and try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onRemove = async (productId: string) => {
    setIsLoading(true);
    const token = getCookie('dracaena_access_token');
  
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          product_id: productId,
        },
      });
  
      if (!response.data) {
        throw new Error("Failed to remove item from favourites");
      }
  
      setFavouriteItems(prevItems => prevItems.filter(item => item.id !== productId));
      toast.success("Product successfully removed from your favourites");
    } catch (error) {
      console.error("Failed to remove item from favourites", error);
      toast.error("Failed to remove item from favourites. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        favouriteItems,
        isLoading,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;