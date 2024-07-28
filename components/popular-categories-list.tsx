
import { ICategoryResource } from "@/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { LinkBtn } from "./ui/link-btn"

interface CategoryListProps {
  categories: ICategoryResource
}

export const PopularCategoriesList: React.FC<CategoryListProps> = ({categories}) => {
  return (
  <div>            
    <Link 
      className="flex items-center gap-1 underline hover:text-gold mb-2" 
      href={'#'}
    >
      <h1>Popular categories</h1><span><ArrowRight size={24}/></span></Link>
    <div            
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {
        categories.data.slice(0,4).map(cat => {
          return (
            <div className="relative">
              <Link
                key={cat.id}
                className="w-full overflow-hidden shadow-lg flex items-center p-4"
                style={{
                  backgroundImage: `url(${cat.preview})`,
                  aspectRatio: 272/366,
                }}
                href={`/category/${cat.id}`}
              >             
                <div className="text-center w-full font-bold text-xl my-2 uppercase text-white">{cat.title}</div>             
              </Link>                          
              <LinkBtn
                href={`/category/${cat.id}`}
                className={"absolute border-white text-white hover:border-gold hover:text-white"}
              >See all</LinkBtn>
            </div>
          )
        })
      }                    
    </div>               
  </div>
  )
}