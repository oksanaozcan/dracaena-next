"use client";

import { cn, formNavigationObjectFromJsonData } from "@/lib/utils";
import { ICategoryResource } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Disclosure } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "lucide-react";
import Button from "../ui/button";
import { useAuth } from "@/context/auth-contex";
import { Logo } from "../logo";
import { useRef } from "react";

interface MainNavProps {
  data: ICategoryResource;
}

export const revalidate = 0;

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const routes = formNavigationObjectFromJsonData(data, pathname);

  // Ref for the outer Disclosure
  const outerDisclosureRef = useRef<HTMLDivElement>(null);

  // Function to close the outer Disclosure
  const closeOuterDisclosure = () => {
    if (outerDisclosureRef.current) {
      outerDisclosureRef.current?.querySelector("button")?.click();
    }
  };

  return (
    <nav className="w-full relative">
      {/* Burger Menu for small screens */}
      <div className="flex justify-start items-center lg:hidden">
        {/* Outer disclosure */}
        <Disclosure as="div" ref={outerDisclosureRef}>
          {({ open }) => (
            <>
              <Disclosure.Button className="p-2 text-gray-500 hover:text-gray-700 dark:bg-slate-800 dark:text-white">
                {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </Disclosure.Button>
              <Disclosure.Panel className="absolute bg-white w-full h-screen overflow-y-auto p-6 left-0 top-16 z-50 shadow-lg dark:bg-slate-800 dark:text-white">
                <ul className="flex flex-col gap-4 text-lg font-bold">
                  {routes.map((route) => (
                    <li key={route.id}>
                      {/* Inner disclosure */}
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="w-full text-left py-2">
                              <span className={cn("flex justify-between items-center", { "text-gray-500": open })}>
                                {route.label}
                                <ChevronDownIcon className={cn("ml-2 transition-transform transform", { "rotate-180": open })} />
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              <ul className="pl-4">
                                {route.category_filters.map((f) => (
                                  <div className="font-bold capitalize" key={f.id}>
                                    <span className="leading-6">{f.title}</span>
                                    <ul className="pl-2">
                                      {route.tags.map((t) => {
                                        if (t.category_filter_id === f.id) {
                                          return (
                                            <li className="font-light p-1" key={t.id}>
                                              <Disclosure.Button
                                                as={Link}
                                                href={t.href}
                                                onClick={closeOuterDisclosure}
                                              >
                                                {t.title}
                                              </Disclosure.Button>
                                            </li>
                                          );
                                        }
                                      })}
                                    </ul>
                                  </div>
                                ))}
                              </ul>
                              <Disclosure.Button as={Link} href={route.href} className="block py-2" onClick={closeOuterDisclosure}>
                                Shop all {route.label}
                              </Disclosure.Button>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </li>
                  ))}
                  {isAuthenticated ? (
                    <>
                      <li>
                        <Link href="/dashboard" className="ml-4 flex lg:ml-0 gap-x-2 pt-2">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Button onClick={logout}>Logout</Button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link href="/auth/login" className="ml-4 flex lg:ml-0 gap-x-2 pt-2">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link href="/auth/register" className="ml-4 flex lg:ml-0 gap-x-2 pt-2">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                  <li>
                    <a className="ml-4 flex lg:ml-0 gap-x-2 pt-2" href="#">
                      Inspiration
                    </a>
                  </li>
                  <li>
                    <a className="ml-4 flex lg:ml-0 gap-x-2 pt-2" href="#">
                      Plant Doctor
                    </a>
                  </li>
                  <li className="ml-4 flex lg:ml-0 gap-x-2 pt-2">EN(cur)</li>
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Logo />
      </div>
      {/* Regular Menu for large screens */}
      <ul className="hidden lg:flex flex-row items-center justify-between text-base font-bold">
        {routes.map((route) => (
          <li key={route.id}>
            <Popover>
              <Popover.Button className="py-1 px-2 font-bold capitalize flex flex-row items-center gap-0 ui-open:text-gray-500 ui-open:transform transition-all ui-open:underline dark:bg-slate-800 dark:text-white">
                <span>{route.label}</span>
                <ChevronDownIcon className="ui-open:rotate-180" />
              </Popover.Button>
              <Popover.Panel className="absolute bg-white w-max p-6 inset-x-0 transition-all dark:bg-slate-800 dark:text-white">
                <div className="flex flex-row gap-8 items-top justify-center px-6">
                  {route.category_filters.map((f) => (
                    <div className="font-bold capitalize" key={f.id}>
                      <span className="leading-6">{f.title}</span>
                      <ul>
                        {route.tags.map((t) => {
                          if (t.category_filter_id === f.id) {
                            return (
                              <li className="font-light p-1" key={t.id}>
                                <Popover.Button as={Link} href={t.href}>
                                  {t.title}
                                </Popover.Button>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <Popover.Button as={Link} href={route.href}>
                  Shop all {route.label}
                </Popover.Button>
              </Popover.Panel>
            </Popover>
          </li>
        ))}
        <div className="w-auto">
          <ul className="flex flex-row gap-4 items-center justify-between text-center">
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/dashboard" className="ml-4 lg:ml-0 gap-x-2">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Button onClick={logout}>Logout</Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/auth/login" className="ml-4 lg:ml-0 gap-x-2 pt-2">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="ml-4 lg:ml-0 gap-x-2 pt-2">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <a className="ml-4 lg:ml-0 gap-x-2 pt-2" href="#">
                Inspiration
              </a>
            </li>
            <li>
              <a className="ml-4 lg:ml-0 gap-x-2 pt-2" href="#">
                Plant Doctor
              </a>
            </li>
            <li className="ml-4 lg:ml-0 gap-x-2">EN(cur)</li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};

export default MainNav;