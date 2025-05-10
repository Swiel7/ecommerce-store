"use client";

import Link from "next/link";
import { LogOut, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { profileLinks } from "@/data";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { logout } from "@/lib/actions/auth";
import { protectedRoutes } from "@/lib/routes";

const UserButton = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const isProtectedRoute = protectedRoutes.includes(pathname);

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "!size-10",
        })}
      >
        <User2 />
      </Link>
    );
  }

  const { image, email, firstName, lastName } = session.user;

  const userAvatar = (
    <Avatar>
      {image && (
        <AvatarImage
          src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
          alt={`${firstName} ${lastName} avatar`}
        />
      )}
      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
        {firstName[0]}
        {lastName[0]}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ml-2">{userAvatar}</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuItem className="py-2">
          {userAvatar}
          <div className="ml-1 flex flex-col">
            <span className="text-sm font-medium">
              {firstName} {lastName}
            </span>
            <span className="text-muted-foreground text-xs">{email}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {profileLinks.map((link) => (
          <DropdownMenuItem
            key={link.label}
            className="flex items-center gap-3 text-sm"
            asChild
          >
            <Link href={link.href}>
              <link.icon />
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-3 text-sm"
          onClick={() => {
            logout({ redirectTo: isProtectedRoute ? "/" : undefined });
          }}
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
