const CartItemSkeleton = () => {  
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 bg-gray-300">       
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">       
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <div className="h-6 w-40 rounded-md bg-gray-300"/>
          </div>
          <div className="mt-1 flex text-sm">
          <div className="h-6 w-40 rounded-md bg-gray-300 mx-2"/>
          <div className="h-6 w-40 rounded-md bg-gray-300 mx-2"/>
          </div>          
          <div className="h-6 w-10 rounded-md bg-gray-300"/>
        </div>
      </div>
    </li>
  )
}

export default CartItemSkeleton;