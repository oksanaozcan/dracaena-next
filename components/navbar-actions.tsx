"use client"

import Button from "@/components/ui/button";
import { CartContext } from "@/context/cart";
import { ShoppingBag, SearchIcon, Heart, Moon, Sun } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import Search from "./search";
import { listApi } from "@/lib/list-api";

const NavbarActions = () => {
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const localVal = localStorage.getItem("dracaena_dark_mode");
    if (localVal === "true") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode !== undefined) {
      localStorage.setItem("dracaena_dark_mode", darkMode ? "true" : "false");
      if (darkMode) {
        window.document.documentElement.classList.add("dark");
      } else {
        window.document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  const switchMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;

  const [isMounted, setIsMounted] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const { cartItems } = useContext(CartContext);

  const toggleDrawer = () => {
    setIsOpenDrawer((prevState) => !prevState);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push("/dashboard/my-favourites")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <Heart size={20} color="white" />
      </Button>
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cartItems.length}
        </span>
      </Button>
      <Button
        onClick={toggleDrawer}
        className="flex items-center rounded-full bg-black px-4 py-2"
      >
        <SearchIcon size={20} color="white" />
      </Button>
      {darkMode ? (
        <Button onClick={switchMode}><Moon size={24} /></Button>
      ) : (
        <Button onClick={switchMode}><Sun size={24} /></Button>
      )}
      <Drawer
        className="px-2 py-2"
        open={isOpenDrawer}
        overlayOpacity={0.4}
        onClose={toggleDrawer}
        direction="right"
        duration={400}
        lockBackgroundScroll
        size={450}
      >
        {isOpenDrawer && <Search initSearch={search} listApi={listApi} toggleDrawer={toggleDrawer} />}
      </Drawer>
    </div>
  );
};

export default NavbarActions;