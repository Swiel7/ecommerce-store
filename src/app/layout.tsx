import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const font = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
