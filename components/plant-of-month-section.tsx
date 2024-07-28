'Use client';

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LinkBtn } from "./ui/link-btn";

export const PlantOfTheMonthSection = () => {
  return(
    <div className="relative pt-20">
      <div className="absolute z-10 top-1 left-32">
        <h2 className="text-8xl font-black subpixel-antialiased tracking-wider leading-relaxed text-gold">Plant of the month</h2>
      </div>   
      <div className="w-full grid grid-cols-7 gap-4">
        <div className="col-span-3 relative">
          <Image  
            src={'/images/plant-bg.jpg'}
            layout="fill"
            objectFit="cover"
            alt="plant of month image"
          />     
        </div>
        <div className="col-span-4">
          <div className="w-full h-full">
            <div className="flex justify-end">
              <div>
                <Image  
                  src={'/images/plant-bg.jpg'}
                  width={300}
                  height={200}
                  sizes="100vw"                 
                  alt="plant background"
                />                   
              </div>           
            </div>
            <div className="p-10 text-orange">
              <h4 className="text-4xl font-bold py-4">Calathea Orbifolia</h4>
              <p className="text-2xl font-bold">
                This month, we're excited to highlight the Calathea Orbifolia, a plant that gives ultimate jungle vibes with its big, round, striped leaves. It's a true showstopper, loved by plant enthusiasts and a popular ornamental piece in urban jungles. Whether your home is boho minimalist or a thriving jungle, this plant radiates charm in any room. For the entire month of July, you can shop this beautiful botanical at a special discount!
              </p>
              <div className="flex text-xl font-bold justify-between">
                <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}><span><ArrowRight size={24}/></span><span>Discover more</span></Link>
                <LinkBtn href={'#'} className={'border-orange hover:text-white hover:bg-orange'}>Shop with discount</LinkBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}