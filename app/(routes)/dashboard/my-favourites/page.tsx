"use client";

import Container from "@/components/ui/container"
import { useUser } from "@clerk/clerk-react";
import DashboardSidebar from '../components/DashboardSidebar';
import { FavouriteContext } from "@/context/favourite";
import { useContext, useEffect, useState } from "react";
import ProductCard from "@/components/ui/product-card";
import ProductList from "@/components/product-list";

export const revalidate = 0;

interface MyFavouritesPageProps {
  params: {}
}

const MyFavouritesPage: React.FC<MyFavouritesPageProps> = ({
  params,
}) => {
  const { isSignedIn, user, isLoaded } = useUser();

  const {favouriteItems} = useContext(FavouriteContext);
  const [isMounted, setIsMounted] = useState(false);    

  useEffect(() => {    
    setIsMounted(true);
  }, [])     

  if (!isMounted) return null;

  return (
    <div>
      <Container>
        <div className="flex h-full">
          <DashboardSidebar userName={user?.firstName ?? ''}/>
          <div className="p-4">
            <h1>Wishlist</h1> 
            <p>Welcome to your personal jungle oasis! Browse your wishlist and let your green thumb run wild as you curate the ultimate indoor garden that will make all your plant parent friends green with envy.</p>
            <div className="py-2">
              
              {favouriteItems.length === 0 && <p>You have not selected any favourites yet.</p>}                     

              <div className="grid grid-cols-3 gap-2">
               {
                favouriteItems.map(item => (
                  <div key={item.id}><ProductCard item={item}/></div>
                ))
               }
              </div>
              
            </div>
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default MyFavouritesPage;