const ProductCardSkeleton = () => {  
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-300 relative"/>
      <div className="bg-gray-300 h-6 w-40 rounded-md"/>
      <div className="bg-gray-300 h-6 w-20 rounded-md"/>     
    </div>
  )
}

export default ProductCardSkeleton;