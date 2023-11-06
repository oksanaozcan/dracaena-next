const BillboardSkeleton = () => {  
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div 
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-gray-300 h-60 w-full">
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            <div className="h-6 rounded-md bg-gray-400 w-80 m-4"></div>
            <div className="h-6 rounded-md bg-gray-400 w-80 m-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillboardSkeleton;