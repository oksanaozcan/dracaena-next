import { ArrowRight } from "lucide-react"
import Image from "next/legacy/image"
import Link from "next/link"
import { LinkBtn } from "./ui/link-btn"
import { PlantCareSlider } from "./ui/plant-care-slider"

export const PlantCareEssential = () => {
  return(
   <section>
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col justify-between">
        
        <div>   
          <h1>Plants for life</h1>       
          <div>          
            <LinkBtn
              href={'/category/1'} 
              className={"border-custom-green text-custom-green hover:border-gold hover:text-white"}
            >See all</LinkBtn>
          </div>         
        </div>

        <div>
          <p>
            Whether you are a seasoned plant lover or just starting out on your green journey, we are here to help you care for your green friends. Each plant has its own unique needs, so understanding their specific care requirements is crucial to their well-being.            
          </p>
          <Link className="flex my-4 items-center gap-1 underline hover:text-gold mb-2" href={'#'}><span>Discover our plant care guides</span><span><ArrowRight size={20}/></span></Link>
        </div>    

      </div>
      <div className="w-full h-auto">
        <Image  
          src={'/images/plant-bg.jpg'}
          width={450}
          height={350}  
          sizes="100vw"
          alt="plant background"
          />
      </div>
      <div className="col-span-2 py-4">       
        <PlantCareSlider/>        
      </div>
    </div>
   </section>
  )
}