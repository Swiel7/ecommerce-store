import { navLinks } from "@/data";
import { Logo } from "../shared";
import { Button } from "../ui/button";
import Link from "next/link";
import { Heart, Search, User2 } from "lucide-react";
import MobileNav from "./MobileNav";
import { CartDrawer } from "./Cart";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-20 shadow-xs">
      <div className="wrapper px-2 lg:px-4">
        <div className="flex items-center justify-between gap-3 py-2 lg:py-4">
          <MobileNav />
          <Logo />
          <nav className="hidden lg:block">
            <ul className="flex">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Button variant="link" size="sm" asChild>
                    <Link href={href}>{label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex">
            {/* search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-10 lg:flex"
            >
              <Search />
            </Button>

            {/* account */}
            <Button variant="ghost" size="icon" className="size-10">
              <Link href="/login">
                <User2 />
              </Link>
            </Button>

            {/* wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-10 sm:flex"
              asChild
            >
              <Link href="/wishlist">
                <Heart />
              </Link>
            </Button>

            {/* cart */}
            <CartDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
