import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const PlantCareEssential = () => {
  return(
   <section>
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col justify-between">
        
        <div>   
          <h1>Plants for life</h1>       
          <div>
            <Link 
              href={'/category/1'} 
              className="my-2 w-1/2 cursor-pointer inline-block leading-none select-none text-center focus:outline-none transition-colors py-2.5 px-6 backdrop-blur-sm border-[1.5px] hover:bg-gold rounded-full max-h-[inherit] border-custom-green text-custom-green hover:border-gold hover:text-white"
            >
              See all
            </Link>
          </div>         
        </div>

        <div>
          <p>
            Whether you are a seasoned plant lover or just starting out on your green journey, we are here to help you care for your green friends. Each plant has its own unique needs, so understanding their specific care requirements is crucial to their well-being.            
          </p>
          <Link className="flex my-4 items-center gap-1 underline hover:text-gold mb-2" href={'#'}><span>Discover our plant care guides</span><span><ArrowRight size={20}/></span></Link>
        </div>    

      </div>
      <div>
        <Image  
          src={'/images/plant-bg.jpg'}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }} // optional
          alt="plant background"
          />
      </div>
      <div className="col-span-2">swip slider</div>
    </div>
   </section>
  )
}