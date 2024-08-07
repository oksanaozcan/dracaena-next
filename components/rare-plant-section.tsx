import Image from "next/legacy/image";
import Container from "@/components/ui/container";
import { LinkBtn } from "./ui/link-btn";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import SvgArrow from "./ui/svg-arrow";

export const RarePlantSection = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      
      <div className="col-span-8">
        <Container>
          <div>
            <h5 className="text-5xl text-center py-6">Rare Plants</h5>
            <div className="grid grid-cols-2 gap-4 px-6">

              <div>
                <p className="text-xl pb-10">
                  Is your room already full of plants, but would you like even more green in your home? 
                  Then baby plants are ideal. Buy a small baby houseplant and let it grow into a big, 
                  strong houseplant! With the right care and a lot of love you can enjoy your plant for 
                  a very long time.
                </p>
                <LinkBtn 
                  href={'/tag/2'} 
                  className={
                    'text-xl border-custom-blue-100 bg-custom-blue-200 text-custom-blue-100 hover:text-custom-blue-200 hover:bg-custom-blue-100'
                  }
                >
                  Shop all rare plants
                </LinkBtn>
              </div> 

              <div className="text-white relative">
                <Link
                  key={uuidv4()}
                  className="w-full overflow-hidden shadow-lg flex items-center p-4"
                  style={{
                    backgroundImage: `url(/images/baby-plant-card.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '600px',
                  }}
                  href={`#`}
                >
                  <div className="text-center w-full font-bold text-xl my-2 uppercase text-white bg-custom-blue-200/40 py-6 mx-6">
                    <ul>
                      <li>Monstera</li>
                      <li>Thai Constellation</li>
                      <li>€69.95</li>
                    </ul>
                  </div>
                </Link>
                <LinkBtn
                  href={`#`}
                  className={
                    "border-beige-200 bg-custom-blue-200/40 text-white hover:border-custom-blue-100/40 hover:bg-custom-blue-100/40 hover:text-white absolute text-xl bottom-14 left-24"
                  }
                >
                  Shop now
                </LinkBtn>
              </div>

              <div className="flex justify-between gap-20 relative">
                <div className="mb-6">
                  <img src="/images/baby-plant.jpg" className="w-full h-auto" />
                </div>
                <div className="pl-10 ml-6">
                  <p className="text-xl">
                    Variegation is extremely rare, as it is a difficult process to create genetic mutations!
                  </p>
                </div>
                <div className="absolute top-1/4 left-24">
                  <SvgArrow />
                </div>
              </div>
             
            </div>
          </div>
        </Container>       
      </div>

      <div className="col-span-4 relative w-full h-full">
        <div className="relative w-full h-full">
          <Image
            src={'/images/baby-plant.jpg'}
            alt="baby plant image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

    </div>
  )
}

// import Image from "next/legacy/image"
// import Container from "@/components/ui/container";
// import { LinkBtn } from "./ui/link-btn";
// import Link from "next/link";
// import { v4 as uuidv4 } from 'uuid';
// import SvgArrow from "./ui/svg-arrow";

// export const RarePlantSection = () => {
//   return (
//     <div className="grid grid-cols-12 gap-2">
      
//       <div className="col-span-8">
//         <Container>
//           <div>
//             <h5 className="text-5xl text-center py-6">Rare Plants</h5>
//             <div className="grid grid-cols-2 gap-4 px-6">

//               <div>
//                 <p className="text-xl pb-10">Is your room already full of plants, but would you like even more green in your home? Then baby plants are ideal. Buy a small baby houseplant and let it grow into a big, strong houseplant! With the right care and a lot of love you can enjoy your plant for a very long time.</p>
//                 <LinkBtn href={'/tag/2'} className={'text-xl border-custom-blue-100 bg-custom-blue-200 text-custom-blue-100 hover:text-custom-blue-200 hover:bg-custom-blue-100'}>Shop all rare plants</LinkBtn>
//               </div> 

//               <div className="text-white relative">
//                 <Link
//                   key={uuidv4()}
//                   className="w-full overflow-hidden shadow-lg flex items-center p-4"
//                   style={{
//                     backgroundImage: `url(/images/baby-plant-card.jpg)`,
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     height: '600px',
//                   }}
//                   href={`#`}
//                 >
//                   <div className="text-center w-full font-bold text-xl my-2 uppercase text-white bg-custom-blue-200/40 py-6 mx-6">
//                     <ul>
//                       <li>Monstera</li>
//                       <li>Thai Constellation</li>
//                       <li>€69.95</li>
//                     </ul>
//                   </div>
//                 </Link>
//                 <LinkBtn
//                   href={`#`}
//                   className={
//                     "border-beige-200 bg-custom-blue-200/40 text-white hover:border-custom-blue-100/40 hover:bg-custom-blue-100/40 hover:text-white absolute text-xl bottom-14 left-24"
//                   }
//                 >
//                   Shop now
//                 </LinkBtn>
//               </div>

//               <div className="flex justify-between gap-20 relative">
//                 <div className="mb-6">
//                   <img src="/images/baby-plant.jpg" className="w-full h-auto" />
//                 </div>
//                 <div className="pl-10 ml-6">
//                   <p className="text-xl">
//                     Variegation is extremely rare, as it is a difficult process to create genetic mutations!
//                   </p>
//                 </div>
//                 <div className="absolute top-1/4 left-24">
//                   <SvgArrow />
//                 </div>
//               </div>
             
//             </div>
//           </div>
//         </Container>       
//       </div>

//       <div className="col-span-4 relative w-full h-0 pb-[175%]">
//         <Image
//           src={'/images/baby-plant.jpg'}
//           alt="baby plant image"
//           layout="fill"
//           objectFit="cover"
//         />
//       </div>

//     </div>
//   )
// }
