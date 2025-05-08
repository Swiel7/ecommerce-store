import type { Metadata } from "next";
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
  return <main className="grid min-h-screen">{children}</main>;
};

export default Layout;
