"use client"

import { IProductResource } from "@/types";
import React, { FormEvent, useState } from "react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { NextResponse } from "next/server";

interface InfoProps {
  product: IProductResource,
  userId?: string 
}

const Info: React.FC<InfoProps> = ({
  product,
  userId
}) => { 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {    
    event.preventDefault();
    setIsLoading(true);

    try {      
      const formData = new FormData();
      formData.append('product_id', product.data.id);

      if (userId) formData.append('client_id', userId);
      if(!userId) return new NextResponse("Unauthorized", {status: 401});

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts`, {
        // headers: {
        //  'API-Key': process.env.DATA_API_KEY,
        // },
        method: 'POST',
        body: formData
      });    

      console.log(response.json())

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }   
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text text-gray-900">{product.data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={product.data.price}/>
        </div>        
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">      
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Descr:</h3>
          <div>{product.data.description}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Category:</h3>
          <div>{product.data.category.title}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600"
            style={{backgroundColor: product?.data?.color?.value}}
          />
        </div>
        <div>
          <h3 className="font-semibold text-black">Details:</h3>
          <div>{product.data.content}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">    
        <form onSubmit={onSubmit}>                    
          <Button 
            type="submit"
            className="flex items-center gap-x-2"
            disabled={isLoading}
          >
            Add to Cart
            <ShoppingCart/>
          </Button>  
        </form>      
      </div>
    </div>
  )
}

export default Info;