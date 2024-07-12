import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { IProduct } from "@/types";
import { getCookie } from "cookies-next";
import { useAuth } from "./auth-contex";

interface RestokeSubscriptionContextType {
  restokeSubscriptionItems: IProduct[];
  isLoading: boolean;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
}

interface ErrorResponse {
  error: string;
}

export const RestokeSubscriptionContext = createContext<RestokeSubscriptionContextType>({
  restokeSubscriptionItems: [],
  isLoading: false,
  onAdd: async (productId: string) => {},
  onRemove: async (productId: string) => {},
});

interface RestokeSubscriptionProviderProps {
  children: React.ReactNode;
}

const RestokeSubscriptionProvider: React.FC<RestokeSubscriptionProviderProps> = ({ children }) => {  
  const {logout} = useAuth();
  const [restokeSubscriptionItems, setRestokeSubscriptionItems] = useState<IProduct[]>([]);
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/restoke-subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      setRestokeSubscriptionItems(response.data.data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch restoke subscription items", error);
      toast.error("Failed to fetch restoke subscription items");
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
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/restoke-subscriptions`, {
        product_id: productId,     
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success("Product added to your restoke subscription successfully");
      fetchItems();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      if (error.response?.status === 400 && error.response.data?.error === 'in_stock') {
        toast.error("This product is in stock and cannot be added to your restoke subscription.");
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
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/restoke-subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          product_id: productId,
        },
      });
  
      if (!response.data) {
        throw new Error("Failed to remove item from restoke subscription");
      }
  
      setRestokeSubscriptionItems(prevItems => prevItems.filter(item => item.id !== productId));
      toast.success("Product successfully removed from your restoke subscription");
    } catch (error) {
      console.error("Failed to remove item from restoke subscription", error);
      toast.error("Failed to remove item from restoke subscription. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RestokeSubscriptionContext.Provider
      value={{
        restokeSubscriptionItems,
        isLoading,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </RestokeSubscriptionContext.Provider>
  );
};

export default RestokeSubscriptionProvider;