"use client";

import { Menu, Search } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Logo } from "../shared";
import { Input } from "../ui/input";
import { navLinks } from "@/data";
import Link from "next/link";
import { sidebarMenuButtonVariants } from "../ui/sidebar";

const MobileNav = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="size-10">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle className="flex">
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 px-4">
            {/* search */}
            <div className="relative">
              <Input
                id="search"
                placeholder="Search"
                className="bg-background h-11 w-full pl-10 shadow-none"
              />
              <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 opacity-50 select-none" />
            </div>

            {/* menu */}
            <nav>
              <ul>
                {navLinks.map(({ label, href }) => (
                  <li key={label}>
                    <SheetClose asChild>
                      <Link
                        href={href}
                        className={sidebarMenuButtonVariants({
                          variant: "default",
                          size: "lg",
                        })}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
