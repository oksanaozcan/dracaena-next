"use client"

import { SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { RadioGroup } from '@headlessui/react'
import { ListApiItem } from "@/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDebounce } from 'use-debounce';

interface SearchProps {
  initSearch: string | undefined;
  listApi: ListApiItem[];
  toggleDrawer: () => void;
}

const Search: React.FC<SearchProps> = ({
  initSearch,
  listApi,
  toggleDrawer
}) => {

  const router = useRouter();  

  const [searchApi, setSearchApi] = useState(listApi[0].value)  
  const [search, setSearch] = useState(initSearch ? initSearch : '');
  const [query] = useDebounce(search, 700); 

  const handleDrawer = () => {
    toggleDrawer();    
  }    

  const clearSearch = () => {
    setSearch('');
  }  

  useEffect(() => {
    if (!query) {
      router.push(`/`)  
    } else {
      router.push(`?search=${query}`)
    }    
  }, [query, router]);  

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
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon
              className="h-5 w-5 text-gray-400"                    
            />       
        </div>   
        <input
          maxLength={20}
          value={search}     
          placeholder="Hi, what are you looking for?"
          onChange={e => setSearch(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
        />       
        <button 
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          onClick={clearSearch}
        >
          <XIcon className="h-5 w-5 text-gray-400"/>
        </button>
      </div>
    </div>
  )
}

export default Search;