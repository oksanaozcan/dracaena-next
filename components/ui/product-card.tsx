"use client"

import { IProduct } from "@/types"
import Image from "next/image"
import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCardProps {
  item: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${item?.id}`);
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(item);
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement>  = (event) => {
    event.stopPropagation();    
    cart.addItem(item)
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