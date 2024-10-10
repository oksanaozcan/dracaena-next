'use client';

import { IProduct, IProductCartItem } from "@/types";
import { useContext, FormEvent, useEffect, useState, MouseEventHandler, useRef } from "react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { CheckIcon, Heart, MinusIcon, PlusIcon, ShoppingCart, XCircleIcon } from "lucide-react";
import { CartContext } from "@/context/cart";
import axios from "axios";
import { getCookie } from "cookies-next";
import IconButton from "@/components/ui/icon-button";
import { FavouriteContext } from "@/context/favourite";
import { useAuth } from "@/context/auth-contex";
import { useRouter } from 'next/navigation';
import { InfoTabs } from "./info-tabs";
import { RenderStars } from "./render-stars";
import { RelatedProductsSlider } from "./related-products-slider";
import { RelatedCareProductsSlider } from "./related-care-products-slider";

interface InfoProps {
  product: IProduct,
}

const Info: React.FC<InfoProps> = ({ product }) => { 
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isFavourite, setIsFavourite] = useState(false); 
  const [activeTab, setActiveTab] = useState(0);
  const infoTabsRef = useRef<HTMLDivElement>(null);
  const [cartItemsCalc, setCartItemsCalc] = useState<IProductCartItem[]>([{id: product.id, title: product.title, price: Number(product.price)}])
  const [totalPrice, setTotalPrice] = useState<number>(Number(product.price)); 

  useEffect(() => {
    const totalPrice = cartItemsCalc.reduce((summ, pr) => summ + Number(pr.price), 0);
    setTotalPrice(totalPrice);
  }, [cartItemsCalc, product.price]);

  const handleIncrementProduct = () => {
    const quantity = cartItemsCalc.filter(item => item.id === product.id).length;
    if (quantity < Number(product.amount)) {
      setCartItemsCalc([...cartItemsCalc, { id: product.id, title: product.title, price: Number(product.price) }]);
    }
     // TODO: make toast if amount of product equel 0
  };
  
  const handleDecrementProduct = () => {
    if (cartItemsCalc.filter(item => item.id === product.id).length > 1) {
      const index = cartItemsCalc.findIndex(pr => pr.id === product.id);
  
      if (index !== -1) {
        const newCartItems = [...cartItemsCalc];
        newCartItems.splice(index, 1);
        setCartItemsCalc(newCartItems);
      }
    }
  };

  const removeRelatedProduct = (item: IProductCartItem) => {
    const newCartItems = cartItemsCalc.filter(item => item.id !== item.id);
    setCartItemsCalc(newCartItems);
  }

  useEffect(() => {    
    const currentUrl = window.location.href;
    const currentSlug = currentUrl.split('/').pop()?.split('-').slice(1).join('-');
    const expectedSlug = product.slug;

    if (currentSlug !== expectedSlug) {
      router.replace(`/products/${product.id}-${expectedSlug}`);
    }
  }, [product, router]);
  
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
      cartItemsCalc.map(item => {
        onAdd(item.id);    
      })      
    } else {
      router.push('/auth/login');
    }    
  }    

  const tabs = [
    {title: "About this product", content: product.content},
    {title: "Reviews", content: product.reviews},
    {title: "Shipment", content: "Your order will be hand picked and packed in our strong and sustainable packaging as soon as possible, after which it will be delivered straight from our greenhouse to your door by your chosen carrier. You can follow the journey of your plants via the tracking link you receive in your mail. If you have any questions regarding your order and its shipment, you can get in contact with our support team."},
    {title: "Guarantee", content: "We expect every order to arrive in tip-top shape. We take intensive care of the plants in our greenhouse and use special and as sustainable as possible protective packaging to ship our plants. We also wrote an extensive blog about how to unpack and prepare your plants for growth after shipping. However there are rare occasions where our plants don’t meet their full potential. That’s why all plants are guaranteed for 30 days after arrival, if still in its original nursery pot."},
  ];

  const handleScrollToReviews = () => {
    setActiveTab(1);
    infoTabsRef.current?.scrollIntoView({behavior: 'smooth'});
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
        <RenderStars rating={product.average_rating}/>           
        <div>
          <span 
            className="cursor-pointer"
            onClick={handleScrollToReviews}
          >
            ({product.total_reviews})
          </span>
        </div>
      </div>

      <div className="w-full bg-beige-200 p-4">
        <div className="border-b border-custom-green pb-2">
          <h5 className="font-bold pb-1"> 1. Select the size of your plant</h5>
          <div className="flex justify-between items-center py-1">
          <div className="flex gap-4">       
            <div className="font-bold uppercase">{product.size}</div>
            {
              Array.isArray(product.product_group_by_size) ? (
                product.product_group_by_size.map(item => (
                  <a key={item.id} className="uppercase" href={`/products/${item.id}`}>{item.size}</a>
                ))
              ) : (
                <div>No other sizes available</div>
              )
            }
          </div>    
            <span className="cursor-pointer hover:underline">Plant size guide</span>
          </div>
        </div>
        <div className="border-b border-custom-green py-2">
          <h5 className="font-bold pb-1">{product.category.title === 'houseplants' && '2. Find a matching pot'}</h5>
          <h5 className="font-bold pb-1">{product.category.title === 'pots' && '2. Find a matching plant'}</h5>
          <div className="flex justify-between items-center py-1">
            <RelatedProductsSlider category={product.category} size={product.size} setCartItemsCalc={setCartItemsCalc}/>
          </div>
        </div>
        {/* TODO: logic for related-care-products-slider */}
        <RelatedCareProductsSlider/>      
        <div className="pt-4">        
          <h5 className="font-bold pb-1">{product.title} <span className="uppercase">({product.size})</span></h5>
          <div className="flex justify-between items-center">
            <div className="p-1 bg-white flex justify-around items-center">
              <button type="button" onClick={handleDecrementProduct}><MinusIcon/></button>              
              <span className="px-2">{cartItemsCalc.filter(item => item.id === product.id).length}</span>
              <button type="button" onClick={handleIncrementProduct}><PlusIcon/></button>                         
            </div>
            <div>
              {product.price}
            </div>
          </div>

          <ul>
            {
              cartItemsCalc.filter(item => item.id !== product.id).map(p => (
                <li className="py-4">
                  <div className="flex justify-between items-center">
                    <div>{p.title}</div>
                    <div>{p.price}</div>
                    <button type="button"><XCircleIcon/></button>
                  </div>
                </li>
              ))
            }
          </ul>

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
              <span>Total: {totalPrice}</span>
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
      <div ref={infoTabsRef}>
        <InfoTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
          
    </div>
  )
}

export default Info;

