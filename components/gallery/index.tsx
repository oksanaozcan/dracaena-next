"use client"

import { Tab } from "@headlessui/react";

import { IImage } from "@/types";
import GalleryTab from "./gallery-tab";
import Image from "next/image";

interface GalleryProps {
  preview?: string
  images?: IImage[];
}

const Gallery: React.FC<GalleryProps> = ({
  images,
  preview
}) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          <GalleryTab preview={preview}/>
          {
            images?.map((image) => (
              <GalleryTab key={image.id} 
                image={image}
              />
            ))
          }
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full ">
      <Tab.Panel>
        <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
          <Image
            fill
            src={`${preview}`}
            alt="image of product"
            className="object-cover object-center"
          />
        </div>
      </Tab.Panel>    
        {
          images?.map(image => (
            <Tab.Panel key={image.id}>
              <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
                <Image
                  fill
                  src={image.url}
                  alt="image of product"
                  className="object-cover object-center"
                />
              </div>
            </Tab.Panel>
          ))
        }
      </Tab.Panels>
    </Tab.Group>
  )
}

export default Gallery;