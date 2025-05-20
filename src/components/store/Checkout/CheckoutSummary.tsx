"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CartItem, CartPrices } from "../Cart";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import CheckoutButton from "./CheckoutButton";

const CheckoutSummary = () => {
  const {
    cart: { items },
  } = useCart();

  return (
    <Card>
      <ul className="w-full space-y-4">
        {items.map((item) => (
          <li key={item.productId} className="px-4 lg:px-6">
            <CartItem
              item={item}
              withQuantityButton={false}
              withRemoveButton={false}
              className="p-0 [&_button]:right-2 [&>div]:gap-1 [&>div]:first-of-type:w-24"
            />
          </li>
        ))}
      </ul>
      <CardContent>
        <CartPrices />
      </CardContent>
      <CardFooter>
        <CheckoutButton />
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
