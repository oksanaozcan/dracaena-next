"use client"

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { SortParamItem } from '@/lib/sorting-params'
import { useDebounce } from 'use-debounce';
import { useRouter } from "next/navigation";

interface SortboxProps {
  params: SortParamItem[],
  // initialSort: SortParamItem
}

const Sortbox: React.FC<SortboxProps> = ({
  params,
  // initialSort
}) => {     
  const router = useRouter();  
  const [selected, setSelected] = useState(params[0] ? params[0] : {id: 1, value: 'default', label: 'Recommended'}) 
  // const [selected, setSelected] = useState(initialSort ? initialSort : params[0]) 
  const [query] = useDebounce(selected.value, 350);   

  useEffect(() => {
    if (!query) {
      router.push(`/`)  
    } else {
      router.push(`?sort=${query}`)
    }    
  }, [query, router]);  

  return (
    <div>  
      <Listbox value={selected} onChange={setSelected}>        
        <div className="relative mt-1">
          <Listbox.Button             
            className="relative w-1/3 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate">{`Sort by: ${selected.label}`}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-1/3 z-40 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {params.map((item) => (
                <Listbox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {item.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Sortbox;