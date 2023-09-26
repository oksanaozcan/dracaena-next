"use client"

import { IProduct } from "@/types"
import Image from "next/image"
import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { Expand, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  item: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={`${item.preview}`}  
          fill  
          alt={`${item.title} preview image`}
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton 
              onClick={() => {}}
              icon={<Expand size={20} className="text-gray-600"/>} 
            />
            <IconButton 
              onClick={() => {}}
              icon={<ShoppingCart size={20} className="text-gray-600"/>} 
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg">
          {item.title}
        </p>
        <p>
          {item.category.title}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={item.price}/>
      </div>
    </div>
  )
}

export default ProductCard;