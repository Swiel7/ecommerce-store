"use client";

import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { sidebarMenuButtonVariants } from "@/components/ui/sidebar";
import { profileLinks } from "@/data";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountNav = () => {
  const pathname = usePathname();

  return (
    <Card className="w-full lg:max-w-sm">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="px-6">
          {profileLinks.map((link) => (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink
                active={link.href === pathname}
                className={cn(
                  "flex-row !gap-3 font-medium",
                  sidebarMenuButtonVariants({
                    size: "lg",
                  }),
                )}
                asChild
              >
                <Link href={link.href}>
                  <link.icon className="!size-5" /> {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <NavigationMenuLink
              className={cn(
                "flex-row !gap-3 font-medium",
                sidebarMenuButtonVariants({
                  size: "lg",
                }),
              )}
              asChild
            >
              <button
                onClick={() => {
                  logout({ redirectTo: "/" });
                }}
              >
                <LogOut /> Sign out
              </button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default AccountNav;
