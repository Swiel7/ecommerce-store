"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

const ClearCart = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return null;
};

export default ClearCart;
