import { headphones, laptop, smartwatch } from "public/hero";
import { banner1, banner2 } from "public/banners";
import { CreditCard, Headphones, Package, RotateCcwSquare } from "lucide-react";

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Special offers", href: "/products?status=Featured" },
  { label: "Sale", href: "/products?status=On+Sale" },
  { label: "Contact us", href: "/contact" },
];

export const footerLinks = [
  {
    title: "Information",
    links: [
      { text: "My Account", href: "/account" },
      { text: "Contact Us", href: "/contact" },
      { text: "Career", href: "/" },
      { text: "FAQ", href: "/" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { text: "About Us", href: "/" },
      { text: "Shipping", href: "/" },
      { text: "Privacy Policy", href: "/" },
      { text: "Return & Refund", href: "/" },
    ],
  },
];

export const heroContent = [
  {
    subtitle: "Deals and Promotions",
    title: "New smartwatches at unique prices",
    price: "$199.99",
    image: smartwatch,
  },
  {
    subtitle: "Sale 25% Discount",
    title: "Ideal for your first laptop",
    price: "$749.99",
    image: laptop,
  },
  {
    subtitle: "New In Stock",
    title: "Technology for your convenience",
    price: "$99.99",
    image: headphones,
  },
];

export const bannerContent = [
  {
    title: "Upgrade to 5G With Samsung’s Ultra-Fast Devices",
    subtitle: "Enjoy seamless, & next-level connectivity with Samsung.",
    image: banner1,
  },
  {
    title: "Find Your Perfect Headphones for Every Moment",
    subtitle: "Discover a range of wireless, noise-canceling headphones.",
    image: banner2,
  },
];

export const features = [
  {
    icon: Package,
    title: "Fast Free Shipping",
    description: "You will love at great low prices",
  },
  {
    icon: RotateCcwSquare,
    title: "30 Days Returns",
    description: "Within 15 days for an exchange",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "24 hours a day, 7 days a week",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay with multiple credit cards",
  },
];
