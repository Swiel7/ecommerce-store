import { headphones, laptop, smartwatch } from "public/hero";

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
