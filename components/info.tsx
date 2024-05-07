"use client"

import { IProductResource } from "@/types";
import { useContext, FormEvent } from "react";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CartContext } from "@/context/cart";

interface InfoProps {
  product: IProductResource,
}

const Info: React.FC<InfoProps> = ({
  product
}) => {  

 
  const cartContext = useContext(CartContext);
  const onAdd = cartContext ? cartContext.onAdd : () => {};

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(product.id);    
  }  

  return (
    <div>      
      <h1 className="text-3xl font-bold text text-gray-900">{product.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={product.price}/>
        </div>        
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">      
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Descr:</h3>
          <div>{product.description}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Category:</h3>
          <div>{product.category.title}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div className="h-6 w-6 rounded-full border border-gray-600"
            style={{backgroundColor: product?.color?.value}}
          />
        </div>
        <div>
          <h3 className="font-semibold text-black">Details:</h3>
          {/* <div>{product.content}</div> */}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">    
        <form onSubmit={onSubmit}>                    
          <Button 
            type="submit"
            className="flex items-center gap-x-2"
            // disabled={isLoading}
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