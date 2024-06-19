"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import { useAuth } from "@/context/auth-contex";
import { ICategoryResource } from "@/types";
import Button from "./ui/button";

export const revalidate = 0;

interface NavbarProps {
  categories: ICategoryResource
}

const Navbar: React.FC<NavbarProps> = ({categories}) => { 
  const {isAuthenticated, logout} = useAuth();
  
  return (
    <header className="border-b top-0 sticky z-50 bg-white">
      <Container>
        <div className="flex flex-row flex-nowrap items-center justify-between gap-2 px-3 py-2 md:px-0 md:py-3">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">Dracaena</p>
          </Link>
          <NavbarActions/>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">         
          <MainNav data={categories}/>      
          <div className="w-auto">
            <ul className="flex flex-row items-center gap-4">  
              {
                isAuthenticated ? (
                  <>
                  <li>              
                    <Link href="/dashboard" className="ml-4 flex lg:ml-0 gap-x-2">
                      Dashboard
                    </Link>               
                  </li>
                  <li>
                    <Button onClick={logout}>Logout</Button>
                  </li>
                  </>
                  )
                  : (
                    <>
                    <li>              
                      <Link href="/auth/login" className="ml-4 flex lg:ml-0 gap-x-2">
                        Login
                      </Link>               
                    </li>
                    <li>              
                      <Link href="/auth/register" className="ml-4 flex lg:ml-0 gap-x-2">
                        Register
                      </Link>               
                    </li>                
                    </>
                  )
              }                            
              <li> <a href="#">Inspiration</a></li>
              <li> <a href="#">Plant Doctor</a></li>
              <li>EN(cur)</li>
            </ul>
          </div>    
        </div>        
      </Container>      
    </header>
  )
}

export default Navbar;