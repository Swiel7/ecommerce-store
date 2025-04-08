import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const font = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", font.variable)}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
