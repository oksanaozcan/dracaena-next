'use client';

import { IProduct } from "@/types";
import { useContext, FormEvent, useEffect, useState, MouseEventHandler } from "react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { CheckIcon, ChevronDown, Heart, MinusIcon, PlusIcon, ShoppingCart, StarIcon, XCircleIcon } from "lucide-react";
import { CartContext } from "@/context/cart";
import axios from "axios";
import { getCookie } from "cookies-next";
import IconButton from "@/components/ui/icon-button";
import { FavouriteContext } from "@/context/favourite";
import { useAuth } from "@/context/auth-contex";
import { useRouter } from 'next/navigation';

interface InfoProps {
  product: IProduct,
}

const Info: React.FC<InfoProps> = ({ product }) => { 
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false); 
  
  const favouriteContext = useContext(FavouriteContext);
  const { favouriteItems } = favouriteContext;

  useEffect(() => {
    if (favouriteItems.some(favoriteItem => favoriteItem.id === product.id)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favouriteItems, product]);

  const onAddFavourite = favouriteContext ? favouriteContext.onAdd : () => {};
  const onRemoveFavourite = favouriteContext ? favouriteContext.onRemove : () => {};

  const onToggleFavorite: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (isAuthenticated) {
      if (isFavourite) {
        onRemoveFavourite(product.id);
      } else {
        onAddFavourite(product.id);
      }
    } else {
      router.push('/auth/login');
    }

   
  }

  useEffect(() => {
    const accessToken = getCookie("dracaena_access_token");

    const addRecentlyViewedItem = async () => {
      if (accessToken) {       
        try {
          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/recently-viewed-items`, 
            { product_id: product.id }, 
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              }
            }
          );
        } catch (error) {
          console.error('Failed to add recently viewed item:', error);
        }
      } else {      
        const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
       
        if (!recentlyViewed.some((item: { id: string }) => item.id === product.id)) {
          recentlyViewed.unshift({
            id: product.id,
            title: product.title,
            price: product.price,
            preview: product.preview,
          });
        
          if (recentlyViewed.length > 5) {
            recentlyViewed.pop();
          }

          localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        }
      }
    };

    addRecentlyViewedItem();
  }, [product]);

  const cartContext = useContext(CartContext);
  const onAdd = cartContext ? cartContext.onAdd : () => {};

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isAuthenticated) {
      onAdd(product.id);    
    } else {
      router.push('/auth/login');
    }    
  }  

  return (
    <div>   
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold capitalize">{product.title}</h1>
        </div>
        <div>
        <IconButton 
          className={isFavourite ? "text-slate-500 bg-slate-700" : "text-gray-600"}
          onClick={onToggleFavorite}
          icon={<Heart size={20} />}
        />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold">Category:</h3>
        <div>{product.category.title}</div>
      </div>   
      
      <div className="mt-3 flex items-end justify-between">
        <div>
          <Currency value={product.price}/>
        </div>        
      </div>

      <div className="flex py-2 gap-2">
        <div className="flex">
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
          <StarIcon/>
        </div>
      
        <div>
          <span>(5 reviews)</span>
        </div>
      </div>

      <div className="w-full bg-beige-200 p-4">
        <div className="border-b border-custom-green pb-2">
          <h5 className="font-bold pb-1"> 1. Select the size of your plant</h5>
          <div className="flex justify-between items-center py-1">
            <XCircleIcon size={30}/>
            <span className="cursor-pointer hover:underline">Plant size guide</span>
          </div>
        </div>
        <div className="border-b border-custom-green py-2">
          <h5 className="font-bold pb-1">2. Find a matching pot</h5>
          <div className="flex justify-between items-center py-1">
            select pots slider
          </div>
        </div>
        <div className="border-b border-custom-green py-2">
          <div className="flex justify-between items-center">
            <h5 className="font-bold pb-1">3. Care products for this plant</h5>
            <ChevronDown/>
          </div>
         
          <div className="flex justify-between items-center py-1">
            select pots slider
          </div>
        </div>
        <div className="pt-4">        
          <h5 className="font-bold pb-1">{product.title} (XXL)</h5>
          <div className="flex justify-between items-center">
            <div className="p-1 bg-white flex justify-around items-center">
              <MinusIcon/>
              <span className="px-2">1</span>
              <PlusIcon/>
            </div>
            <div>
              {product.price}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="mt-10 flex items-center gap-x-3">    
              <form onSubmit={onSubmit}>                    
                <Button 
                  type="submit"
                  className="flex items-center gap-x-2"
                >
                  Add to Cart
                  <ShoppingCart/>
                </Button>  
              </form>      
            </div>         
            <div>
              <span>Total: {product.price}</span>
            </div>     
          </div>         
        </div>
      </div>      

      <div className="py-4">
        <ul>
          <li className="flex gap-1"><CheckIcon/>Straight from the nursery</li>
          <li className="flex gap-1"><CheckIcon/>250,000+ PLNTS Community followers</li>
          <li className="flex gap-1"><CheckIcon/>The largest range of baby plants</li>
        </ul>
      </div>

      <div className="flex border-y border-custom-green py-2">
        About this plant
        Care
        Reviews
        Shipment

        30
        Guarantee
      </div>

      <div className="py-2">
        Review list (comments about product with star rate)
      </div>
     
      
    </div>
  )
}

export default Info;