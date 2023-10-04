"use client"

import { cn } from "@/lib/utils"
import { ICategoryResource } from "@/types"
import Link from "next/link"
import {usePathname} from "next/navigation"
import { Popover } from '@headlessui/react'

interface MainNavProps {
  data: ICategoryResource
}

export const revalidate = 0;

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname()  

  const routes = data.data.map((route) => ({
    id: route.id,
    href: `/category/${route.id}`,
    label: route.title,
    active: pathname === `/category/${route.id}`,
    category_filters: route.category_filters.map(f => (
      {
        id: f.id,
        title: f.title,
        category_id: f.category_id
      }
    )),
    tags: route.tags.map(t => ({
      id: t.id,
      title: t.title,
      category_filter_id: t.category_filter_id
    })),
  }))

  return (
    <nav>
      <ul className="flex flex-row">        
        { routes.map(route => (
          <li key={route.id}>
          <Popover className="relative">
            <Popover.Button className="font-bold"
            >
              {route.label}
            </Popover.Button>
            <Popover.Panel className="absolute">
              <div className="flex flex-row items-center justify-center">
                {
                  route.category_filters.map(f => (
                    <div>{f.title}
                    <ul>                      
                        {
                          route.tags.map(t => {
                            if (t.category_filter_id == f.id) {
                              return (
                                <li><a href="#">{t.title}</a></li>
                              )
                            }
                          })
                        }                      
                    </ul>                    
                    </div>
                  ))
                }                   
              </div>
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



      {/* {
        routes.map((route) => (
          <Link 
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              route.active ? "text-black" : "text-neutral-500"
            )}
          >
            {route.label}
          </Link>
        ))
      }    */}