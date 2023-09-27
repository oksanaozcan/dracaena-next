"use client"

import { IProductResource } from "@/types";
import React from "react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface InfoProps {
  product: IProductResource
}

const Info: React.FC<IProductResource> = ({
  data
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text text-gray-900">{data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price}/>
        </p>        
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">      
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Descr:</h3>
          <div>{data.description}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Category:</h3>
          <div>{data.category.title}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600"
            style={{backgroundColor: data?.color?.value}}
          />
        </div>
        <div>
          <h3 className="font-semibold text-black">Details:</h3>
          <div>{data.content}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart/>
        </Button>
      </div>
    </div>
  )
}

export default Info;