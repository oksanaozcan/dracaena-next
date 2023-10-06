"use client"

import { cn, formNavigationObjectFromJsonData } from "@/lib/utils"
import { ICategoryResource } from "@/types"
import Link from "next/link"
import {usePathname} from "next/navigation"
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from "lucide-react"

interface MainNavProps {
  data: ICategoryResource
}

export const revalidate = 0;

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {

  const pathname = usePathname()  
  const routes = formNavigationObjectFromJsonData(data, pathname);

  return (
    <nav className="w-auto relative">
      <ul className="flex flex-row gap-10 text-lg font-bold">        
        { routes.map(route => (
          <li key={route.id}>
          <Popover>
            <Popover.Button
              className={cn(
                "py-1 px-2 font-bold capitalize flex flex-row items-center gap-0 ui-open:text-gray-500 ui-open:transform transition-all ui-open:underline",                
              )}    
            >
              <span>{route.label}</span>              
              <ChevronDownIcon className="ui-open:rotate-180"/>                        
            </Popover.Button>
            <Popover.Panel className="absolute bg-white w-max p-6 inset-x-0 transition-all">
              <div className="flex flex-row gap-8 items-top justify-center px-6">
                {
                  route.category_filters.map(f => (
                    <div className="font-bold capitalize" key={f.id}>
                      <span className="leading-6">{f.title}</span>
                    <ul>                      
                        {
                          route.tags.map(t => {
                            if (t.category_filter_id == f.id) {
                              return (
                                <li className="font-light p-1" 
                                  key={t.id}
                                >
                                  <Link href={t.href}>
                                    {t.title}
                                  </Link>
                                </li>
                              )
                            }
                          })
                        }                      
                    </ul>                    
                    </div>
                  ))
                }                   
              </div>
              <Popover.Button as={Link} href={route.href}>
                Shop all {route.label}                  
              </Popover.Button>
            </Popover.Panel>
          </Popover>
          </li>
        ))
      }
      </ul>
    </nav>
  )
}

export default MainNav;     