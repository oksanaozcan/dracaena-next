"use client"

import Image from "next/legacy/image"
import Currency from "@/components/ui/currency"
import { useRouter } from "next/navigation"
import usePreviewModal from "@/hooks/use-preview-modal"

interface ProductCardProps {
  item: {
    id: string;
    title: string;
    price: string;
    preview: string;
  }
}

export const GuestRecentlyViewedProductCard: React.FC<ProductCardProps> = ({item}) => { 
  const previewModal = usePreviewModal();
  const router = useRouter();  
  
  const handleClick = () => {
    router.push(`/products/${item?.id}`);
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-white group cursor-pointer border p-3 space-y-4"
    >
      {/* Images and Actions */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={`${item.preview}`}  
          layout="fill"
          alt={`${item.title} preview image`}
          className="aspect-square object-cover rounded-md"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />        
      </div>
      <div className="font-semibold text-lg truncate">
          {item.title}
      </div>
      <div className="flex items-center justify-between">
        <Currency value={item.price}/>
      </div>
    </div>
  )
}