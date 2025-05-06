import { Footer, Header } from "@/components/store";
import { Features } from "@/components/store/Home";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { auth } from "auth";

export const metadata: Metadata = {
  title: {
    template: "%s / TechVVave Store",
    default: "TechVVave Store",
  },
  description:
    "TechVVave Store offers electronic devices at very competitive prices",
};

const Layout = async ({
  children,
  authModal,
}: {
  children: ReactNode;
  authModal: ReactNode;
}) => {
  const session = await auth();
  //   if (!session) redirect("/login");
  console.log(session);

  return (
    <div className="flex min-h-screen flex-col">
      <Header session={session} />
      <main className="flex flex-1 flex-col *:nth-last-[2]:pb-8 *:nth-last-[2]:lg:pb-20">
        {children}
        {authModal}
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
