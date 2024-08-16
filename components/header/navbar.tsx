"use client";

import Container from "@/components/ui/container";
import MainNav from "@/components/header/main-nav";
import NavbarActions from "@/components/header/navbar-actions";
import { ICategoryResource } from "@/types";
import { Logo } from '../logo';

export const revalidate = 0;

interface NavbarProps {
  categories: ICategoryResource
}

const Navbar: React.FC<NavbarProps> = ({categories}) => {   
  
  return (
    <header className="sticky top-0 z-50 bg-beige-100 dark:bg-slate-800 dark:text-white">
      <Container>
        <div className="flex flex-row flex-nowrap items-center justify-between md:gap-2 py-1 md:px-0 md:py-3">
          <div className="hidden lg:block">
            <Logo/>
          </div>         
          <div className="hidden lg:block">
            <NavbarActions/>
          </div>         
        </div>
      </Container>
      <div className="hidden lg:border-b border-green-900/50 dark:border-gray-700"></div>
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <MainNav data={categories}/>        
          <div className="lg:hidden">
            <NavbarActions/>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Navbar;