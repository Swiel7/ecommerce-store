import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const font = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased [&>section]:last-of-type:!p-0",
          font.variable,
        )}
      >
        {children}
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
};

export default RootLayout;
