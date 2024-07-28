import { IBillboard } from "@/types";
import { LinkBtn } from "./ui/link-btn";

interface BillboardProps {
  data: IBillboard
}

const Billboard: React.FC<BillboardProps> = ({
  data
}) => {
  
  return (
    <div>
      <div 
        className="relative aspect-square md:aspect-[2.4/1] bg-cover"
        style={{backgroundImage: `url(${data.data.image})`}}        
      >
        <div className="text-white h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
            {data.data.description} descr
          </div>
          <LinkBtn
            href={'/category/1'} 
            className={"bg-zinc-600 border-white text-white hover:border-gold hover:text-white w-1/3"}
          >
            Shop all our plants
          </LinkBtn>
        </div>
      </div>
    </div>
  )
}

export default Billboard;