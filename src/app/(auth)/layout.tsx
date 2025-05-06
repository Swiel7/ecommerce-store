import { auth } from "auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s / TechVVave Store",
    default: "TechVVave Store",
  },
  description:
    "TechVVave Store offers electronic devices at very competitive prices",
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  // if (session) redirect("/");

  return <main className="grid min-h-screen">{children}</main>;
};

export default Layout;
