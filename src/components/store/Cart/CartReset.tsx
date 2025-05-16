"use client";

import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

const CartReset = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return null;
};

export default CartReset;
