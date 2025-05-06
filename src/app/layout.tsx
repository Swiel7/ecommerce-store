import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";

const font = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={cn(
            "font-sans antialiased [&>section]:last-of-type:!p-0",
            font.variable,
          )}
        >
          {children}
          <Toaster richColors theme="light" />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
