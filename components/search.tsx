"use client"

import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { RadioGroup } from '@headlessui/react'
import { ListApiItem } from "@/types";
import { cn } from "@/lib/utils";

interface SearchProps {
  listApi: ListApiItem[];
  toggleDrawer: () => {};
}

const Search: React.FC<SearchProps> = ({
  listApi,
  toggleDrawer
}) => {

  const [searchApi, setSearchApi] = useState(listApi[0].value)  
  const [search, setSearch] = useState('');  

  const handleDrawer = () => {
    toggleDrawer();
  }

  return (
    <div>    
      <div className="flex justify-between items-center">
        <RadioGroup value={searchApi} onChange={setSearchApi} className="flex w-full justify-start items-center space-x-4 my-4">
          {listApi.map((item) => (
            <RadioGroup.Option
              key={item.id}
              value={item.value}    
              className="cursor-pointer"                    
            >
              {({ checked }) => (
                  <span className={cn(
                    `
                    w-auto
                    rounded-full
                    bg-gray-400
                    border-transparent
                    px-4
                    py-2
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    text-white
                    font-semibold
                    hover:opacity-75
                    transition
                    `,
                    checked && 'bg-black'
                  )}>{item.label}</span>
                )}            
            </RadioGroup.Option>
          ))}
        </RadioGroup>
        <div>
          <button onClick={handleDrawer}>
            <XIcon/>
          </button>
        </div>
      </div>      

      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon
            className="h-5 w-5 text-gray-400"                    
          />       
        </div>
        <input
          value={search}
          placeholder="Hi, what are you looking for?"
          onChange={e => setSearch(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
          />            
      </div>
    </div>
  )
}

export default Search;