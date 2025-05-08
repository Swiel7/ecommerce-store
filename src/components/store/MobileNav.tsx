"use client";

import { MenuIcon, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Logo } from "../shared";
import { Input } from "../ui/input";
import Menu from "./Menu";

const MobileNav = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="size-10">
            <MenuIcon />
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
            <Menu orientation="vertical" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
