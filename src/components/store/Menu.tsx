import { navLinks } from "@/data";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ComponentProps } from "react";
import { sidebarMenuButtonVariants } from "../ui/sidebar";
import { SheetClose } from "../ui/sheet";
import { cn } from "@/lib/utils";

const Menu = ({
  orientation = "horizontal",
  ...props
}: ComponentProps<typeof NavigationMenu>) => {
  return (
    <NavigationMenu orientation={orientation} {...props}>
      <NavigationMenuList>
        {navLinks.map(({ label, href }) => {
          const link = (
            <NavigationMenuLink
              className={cn(
                orientation === "horizontal"
                  ? buttonVariants({
                      variant: "link",
                      size: "sm",
                    })
                  : sidebarMenuButtonVariants({
                      size: "lg",
                      className: "block",
                    }),
                "!bg-background",
              )}
              asChild
            >
              <Link href={href}>{label}</Link>
            </NavigationMenuLink>
          );

          return (
            <NavigationMenuItem key={label}>
              {orientation === "horizontal" ? (
                link
              ) : (
                <SheetClose asChild>{link}</SheetClose>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menu;
