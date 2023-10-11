'use client'

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { IColor, ISize } from "@/types";
import { Dialog } from "@headlessui/react";
import { Plus, X } from "lucide-react";
import Filter from "./filter";
import { useState } from "react";

interface MobileFiltersProps {
  sizes: ISize[];
  colors: IColor[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden"
        onClick={onOpen}
      >
        Filters
        <Plus size={20}/>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25"/>
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full max-w-xs flex-col overflow-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15}/>} onClick={onClose}/>
            </div>
            <div className="p-4">
               {/* <Filter
                valueKey="sizeId"
                names="Sizes"
                data={sizes}
              /> */}
                {/* <Filter
                valueKey="colorId"
                names="Colors"
                data={colors}
              /> */}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )  
}

export default MobileFilters;