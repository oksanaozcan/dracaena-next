import Container from "@/components/ui/container";
import { Logo } from "./logo";
import Link from "next/link";
import IconButton from "./ui/icon-button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Button from "./ui/button";
import { PaymentCardLogos } from "./ui/payment-card-logos";

const Footer = () => {

  return (
    <footer className="dark:bg-slate-800 dark:text-white text-beige-100">
      
      <div className="bg-footer-green py-10 dark:bg-slate-800 dark:text-white">
        <Container>
          <div>
            <Logo/>
          </div>
          
          <div className="grid grid-cols-5">
            
            <div>
              <h5 className="font-bold text-xl py-2">Shop</h5>
              <ul className="list-none">
                <li><Link className="hover:underline" href={'/new-releases'}>All products</Link></li>
                <li><Link className="hover:underline" href={'/category/1'}>All houseplant</Link></li>                       
              </ul>
              <h5 className="font-bold text-xl py-2">My account</h5>
              <ul className="list-none">               
                <li><Link className="hover:underline" href={'/auth/login'}>Log in</Link></li>
              </ul>
            </div>     

            <div>
              <h5 className="font-bold text-xl py-2">Customer service</h5>
              <ul>
                <li><Link className="hover:underline" href={'#'}>Frequently asked questions</Link></li>
                <li><Link className="hover:underline" href={'#'}>Contact</Link></li>
                <li><Link className="hover:underline" href={'#'}>Payments</Link></li>
                <li><Link className="hover:underline" href={'#'}>Transport & delivery</Link></li>
                <li><Link className="hover:underline" href={'#'}>Guarantee</Link></li>
                <li><Link className="hover:underline" href={'#'}>Return policy</Link></li>
              </ul>
            </div>            
            <div>
              <h5 className="font-bold text-xl py-2">About Dracaena</h5>
              <ul>
                <li><Link className="hover:underline" href={'#'}>Giftcard</Link></li>
                <li><Link className="hover:underline" href={'#'}>About us</Link></li>
                <li><Link className="hover:underline" href={'#'}>Sustainability</Link></li>
                <li><Link className="hover:underline" href={'#'}>B2B</Link></li>
                <li><Link className="hover:underline" href={'#'}>Collaborations</Link></li>
                <li><Link className="hover:underline" href={'#'}>Press</Link></li>
                <li><Link className="hover:underline" href={'#'}>Job opportunities</Link></li>
              </ul>
            </div>            
            <div>
              <div className="flex gap-2">
                <IconButton className="text-custom-green" onClick={undefined} icon={<Facebook/>} />
                <IconButton className="text-custom-green" onClick={undefined} icon={<Instagram/>} />
                <IconButton className="text-custom-green" onClick={undefined} icon={<Youtube/>} />
              </div>
            </div>            
            <div>
              <h5 className="font-bold text-xl py-2">What's the word on the street?</h5>
              <span>Be part of our community by subscribing to our newsletters!</span>
              <form>
                <input className="px-4 py-2 my-2" type="email" placeholder="Your email address"/>
                <Button>Surprise me!</Button>
              </form>
            </div>            
          </div>
        </Container>
      </div>      

      <div className="bg-beige-100 py-10 text-custom-green dark:bg-slate-800 dark:text-white">
        <Container>
          <div className="flex justify-between items-center">
            <div>
            <PaymentCardLogos/>          
          </div>        
          <div className="flex text-base gap-2">         
            <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Terms & conditions</Link>
            <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Privacy</Link>
            <Link className="flex my-4 items-center gap-1 underline mb-2" href={'#'}>Cookies</Link>
          </div>       
          </div>
        </Container>       
      </div>      
      <div className="mx-auto py-10 bg-beige-100 dark:bg-slate-800 dark:text-white">
        <p className="text-center text-xs">
          &copy; 2024 - DRACAENA.COM.
        </p>
      </div>
    </footer>
  )
}

export default Footer;