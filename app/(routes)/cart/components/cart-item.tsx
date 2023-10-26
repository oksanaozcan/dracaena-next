"use client";

import Image from "next/image";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { IProduct } from "@/types";
import React, { useContext } from "react";
import { CartContext } from "@/context/cart";

interface CartItemProps {
  data: IProduct;
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {

  const {onRemove} = useContext(CartContext);

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image 
          fill 
          src={data.preview} 
          alt="preview image of product"
          className="object-cover object-center"
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />        
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={() => onRemove(data.id)} icon={<X size={15}/>}/>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">
              {data.title}
            </p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">color</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">size</p>
          </div>          
          <Currency value={data.price}/>
        </div>
      </div>
    </li>
  )
}

export default CartItem;