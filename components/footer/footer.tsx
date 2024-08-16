import Container from "@/components/ui/container";
import { Logo } from "../logo";
import { PaymentCardLogos } from "../ui/payment-card-logos";
import { FooterMobile } from "./footer-mobile";
import { ShopList } from "./shop-list";
import { CustomerServiceList } from "./customer-service-list";
import { AboutList } from "./about-list";
import { SmmIconList } from "./smm-icon-list";
import { FooterForm } from "./footer-form";
import { PolicyList } from "./policy-list";

const Footer = () => {

  return (
    <footer className="dark:bg-slate-800 dark:text-white text-beige-100">
      
      <div className="bg-footer-green py-4 md:py-8 dark:bg-slate-800 dark:text-white px-6">
        <Container>
          <div>
            <Logo/>
          </div>
          
          <div 
            className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            
            <div className="hidden md:block">
              <h5 className="font-bold text-xl py-2">Shop</h5>
              <ShopList/>             
            </div>     

            <div className="hidden md:block">
              <h5 className="font-bold text-xl py-2">Customer service</h5>
              <CustomerServiceList/>             
            </div> 

            <div className="hidden md:block">
              <h5 className="font-bold text-xl py-2">About Dracaena</h5>
              <AboutList/>           
            </div>                               
            <div>
              <SmmIconList/>                         
            </div>            
            <div>
              <FooterForm/>          
            </div>            
          </div>
        </Container>       
      </div>      

      <FooterMobile/>

      <div className="bg-beige-100 py-10 px-4 text-custom-green dark:bg-slate-800 dark:text-white">
        <Container>
          <div className="grid md:grid-cols-2">
            <div>
            <PaymentCardLogos/>          
            </div>
            <PolicyList/>             
          </div>
        </Container>       
      </div>      
      <div className="mx-auto text-custom-green py-10 bg-beige-100 dark:bg-slate-800 dark:text-white">
        <p className="text-center text-xs">
          &copy; 2024 - DRACAENA.COM.
        </p>
      </div>
    </footer>
  )
}

export default Footer;