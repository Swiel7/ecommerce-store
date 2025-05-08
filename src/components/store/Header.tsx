import { Logo } from "../shared";
import { Button } from "../ui/button";
import Link from "next/link";
import { Heart, Search } from "lucide-react";
import MobileNav from "./MobileNav";
import { CartDrawer } from "./Cart";
import UserButton from "./UserButton";
import { Session } from "next-auth";
import Menu from "./Menu";

const Header = ({ session }: { session: Session | null }) => {
  return (
    <header className="bg-background sticky top-0 z-20 shadow-xs">
      <div className="wrapper px-2 lg:px-4">
        <div className="flex items-center justify-between gap-3 py-2 lg:py-4">
          <MobileNav />
          <Logo />
          <Menu className="not-lg:hidden" />
          <div className="flex">
            {/* search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden size-10 lg:flex"
            >
              <Search />
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

            <CartDrawer />
            <UserButton session={session} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
