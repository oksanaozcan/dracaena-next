"use client";

import React from 'react';
import ProductCard from "@/components/ui/product-card";
import { LinkBtn } from "@/components/ui/link-btn";
import { IProduct } from '@/types';

interface NewReleasesSectionProps {
  newRelease: IProduct[];
}

export const NewReleasesSection: React.FC<NewReleasesSectionProps> = ({ newRelease }) => {
  return (
    <div className="grid lg:grid-cols-3 gap-2">

      <div className="bg-[url('/images/philodendron.jpg')] w-full p-4 md:p-36 lg:px-4 flex flex-col justify-center">
        <h2 className='text-white font-bold text-4xl px-4 pb-4'>New releases</h2>
        <ProductCard item={newRelease[0]} />
      </div>

      <div className="lg:col-span-2">
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {newRelease.map(item => (
            <div key={item.id}><ProductCard item={item} /></div>            
          ))}
        </div>
        <div className='w-full flex justify-center items-center pt-6'>
          <LinkBtn href={'/new-releases'} className={'border-custom-green text-custom-green hover:border-gold hover:text-white'}>
            See all new releases
          </LinkBtn>
        </div>
      </div>

    </div>
  );
}