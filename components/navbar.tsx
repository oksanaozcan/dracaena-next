"use client";

import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import NavbarActions from "@/components/navbar-actions";
import { ICategoryResource } from "@/types";
import { Logo } from "./logo";

export const revalidate = 0;

interface NavbarProps {
  categories: ICategoryResource
}

const Navbar: React.FC<NavbarProps> = ({categories}) => {   
  
  return (
    <header className="border-b top-0 sticky z-50 bg-beige-100 text-green-900 dark:bg-slate-800 dark:text-white">
      <Container>
        <div className="flex flex-row flex-nowrap items-center justify-between gap-2 px-3 py-2 md:px-0 md:py-3">
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