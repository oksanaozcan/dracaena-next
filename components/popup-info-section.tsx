'use client';

import { ChevronDown, ChevronUp } from "lucide-react";
import { PopupArticle } from "./popup-article";
import { useState } from "react";

export const PopupInfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleIsOpen = (): void => {
    setIsOpen(!isOpen);
  }

  return (
    <section className="py-10">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-3xl font-bold">Plants, pots, care products and accessories</h5>
        </div>        
        <div>
          <button 
            onClick={handleIsOpen}
            className="flex items-center justify-center gap-1 underline mb-2 hover:text-gold"
          >
            <span>{isOpen ? 'Read less' : 'Read more'}</span>
            <span>{isOpen ? <ChevronUp size={22}/> : <ChevronDown size={22} />}</span>
          </button>        
        </div>        
      </div>
      <div className={isOpen ? '' : 'hidden'}>
        <PopupArticle/>  
      </div>
    </section>
  );
};
