"use client";

import Container from '../ui/container';
import { ShopList } from './shop-list';
import { CustomerServiceList } from './customer-service-list';
import { AboutList } from './about-list';
import { SmmIconList } from './smm-icon-list';
import { FooterForm } from './footer-form';
import { MobileDisclosure } from './mobile-disclosure';

export const FooterMobile = () => {
  return (    
    <div className="md:hidden bg-footer-green dark:bg-slate-800 dark:text-white">    
      <MobileDisclosure title={'Shop'} component={<ShopList/>}/>
      <MobileDisclosure title={'Customer service'} component={<CustomerServiceList/>}/>     
      <MobileDisclosure title={'About Dracaena'} component={ <AboutList/>}/>
      <Container>
        <SmmIconList/>          
        <div className='px-4'>
          <FooterForm/>         
        </div>     
      </Container>     
    </div>
  )
}

