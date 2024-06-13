import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { IProduct } from "@/types";

interface FavouriteContextType {
  favouriteItems: IProduct[];
  onRemove: (productId: string) => Promise<void>;
  onAdd: (productId: string) => Promise<void>;
  isLoading: boolean;
}

export const FavouriteContext = createContext<FavouriteContextType>({
  favouriteItems: [],
  onRemove: async () => {},
  onAdd: async () => {},
  isLoading: false,
});

interface FavouriteProviderProps {
  children: React.ReactNode
}

const FavouriteProvider: React.FC<FavouriteProviderProps> = ({ 
  children
}) => {
  const {userId} = useAuth(); 
  const [favouriteItems, setFavouriteItems] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);  

  useEffect(() => {
    if (userId) {
      fetchItems();
    }   
  }, [])  
 
  const onAdd = async ( 
    productId: string
    ) => {
      setIsLoading(true);
      
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      product_id: productId,
      client_id: userId
    }).then((res) => {
      fetchItems();
      toast.success("Product added to your favourites successfully");      
    }
    ).catch((err) => {
      toast.error("Something went wrong! Check your internet connection and try again");
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const onRemove = async (productId: string) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {     
      data: {
        userId,
        productId
      }
    });      
    if (!res) {
      toast.error("Something went wrong");
      throw new Error("Failed to remove item from favourites");      
    }   
    setFavouriteItems(prevData => prevData.filter(item => item.id != productId)); 
    toast.success("Product successfully removed from your favourites");
  }   

  const fetchItems = async () => {     
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${userId}`);      
    if (!res) {
      throw new Error("Failed to fetch data");
    }
    const newItems = await res.data.data;    
    setFavouriteItems(newItems);
  }  
   
  return (
    <FavouriteContext.Provider
      value={{
        favouriteItems,
        onRemove, 
        onAdd,
        isLoading
      }}
    >
      {children}
    </FavouriteContext.Provider>
  )

}

export default FavouriteProvider;