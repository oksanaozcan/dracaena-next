"use client"

import { IProduct } from "@/types"
import Image from "next/image"
import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { Expand, Heart, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { MouseEventHandler, useContext, useEffect, useState } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import { CartContext } from "@/context/cart"
import { FavouriteContext } from "@/context/favourite"

interface ProductCardProps {
  item: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  const [isFavourite, setIsFavourite] = useState(false); 
  const previewModal = usePreviewModal();
  const router = useRouter();

  const cartContext = useContext(CartContext);
  const onAdd = cartContext ? cartContext.onAdd : () => {};

  const favouriteContext = useContext(FavouriteContext);
  const { favouriteItems } = favouriteContext;

  useEffect(() => {
    if (favouriteItems.some(favoriteItem => favoriteItem.id === item.id)) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [favouriteItems, item]);

  const onAddFavourite = favouriteContext ? favouriteContext.onAdd : () => {};
  const onRemoveFavourite = favouriteContext ? favouriteContext.onRemove : () => {};

  const handleClick = () => {
    router.push(`/products/${item?.id}`);
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(item);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement>  = (event) => {
    event.stopPropagation();    
    onAdd(item.id);
  }

  const onToggleFavorite: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (isFavourite) {
      onRemoveFavourite(item.id);
    } else {
      onAddFavourite(item.id);
    }
    setIsFavourite(!isFavourite);
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={`${item.preview}`}  
          fill  
          alt={`${item.title} preview image`}
          className="aspect-square object-cover rounded-md"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600"/>} 
            />
            <IconButton 
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600"/>} 
            />
            <IconButton 
              className={isFavourite ? "text-slate-500 bg-slate-700" : "text-gray-600"}
              onClick={onToggleFavorite}
              icon={<Heart size={20} />}
            />
          </div>
        </div>       
      </div>
      <div className="font-semibold text-lg">
          {item.title}
      </div>
      <div className="flex items-center justify-between">
        <Currency value={item.price}/>
      </div>
    </div>
  )
}

export default ProductCard;