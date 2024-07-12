"use client";

import { useState, useEffect } from 'react';
import IconButton from './ui/icon-button';
import { X } from 'lucide-react';
import Button from './ui/button';
import { useCookieConsent } from '@/context/cookies';

const CookieConsent: React.FC = () => {
  const { hasConsented, setHasConsented } = useCookieConsent();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('dracaena_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dracaena_cookie_consent', 'true');
    setHasConsented(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('dracaena_cookie_consent', 'false');
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false)
    setTimeout(() => {
      setIsVisible(true);
    }, 10000);    
  }

  if (!isVisible || hasConsented) return null;

  return (   
    <div className="fixed bottom-0 w-full left-0 right-0 bg-white rounded-lg shadow dark:bg-gray-700 h-1/3">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">           
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                We use cookies to improve your experience on our site. By using our site, you consent to cookies.
              </h3>
              <IconButton onClick={handleCancel} icon={<X size={15}/>}/>             
          </div>          
          <div className="p-4 md:p-5 space-y-4">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla minima aperiam natus illum quia dolorum eius quis sequi blanditiis! Nesciunt, veritatis expedita assumenda praesentium quis iste sapiente esse debitis quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, amet molestias! Perspiciatis iste sequi harum doloremque accusantium similique beatae porro sed possimus, commodi nostrum eum exercitationem. Facere assumenda maiores expedita.                                   
              </p>              
          </div>
          
          <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button 
              type="button"
              className="block items-center w-1/3 gap-x-2 bg-green-600"
              onClick={handleAccept}
            >
              Accept              
            </Button>  
            <Button 
              type="button"
              className="block items-center w-1/3 gap-x-2 bg-rose-600"
              onClick={handleDecline}
            >
              Decline
            </Button>           
          </div>
      </div>    
    </div>
  );
};

export default CookieConsent;