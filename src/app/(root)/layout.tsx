import { Footer, Header } from "@/components/store";
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

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
