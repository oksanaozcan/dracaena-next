import { IImage } from "@/types";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

interface GalleryTabProps {
  image?: IImage
  preview?: string
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image,
  preview
}) => {
  const src = preview ? preview : image?.url
  
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {
        ({selected}) => (
          <div>
            <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
              <Image
                fill
                src={`${src}`}
                alt="image of gallery"
                className="object-cover object-center"              
              />
            </span>
            <span className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
            />
          </div>
        )
      }      
    </Tab>
  )
}

export default GalleryTab;