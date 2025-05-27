"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CartItem, CartPrices } from "../Cart";
import { useCart } from "@/hooks/use-cart";
import React from "react";
import CheckoutButton from "./CheckoutButton";
import { OrderItem } from "../Orders";

const CheckoutSummary = () => {
  const { cart } = useCart();

  return (
    <Card>
      <ul className="w-full space-y-4">
        {cart.items.map((item) => (
          <li key={item.productId} className="px-4 lg:px-6">
            {/* <CartItem
              item={item}
              withQuantityButton={false}
              withRemoveButton={false}
              className="p-0 [&_button]:right-2 [&>div]:gap-1 [&>div]:first-of-type:w-24"
            /> */}
            <OrderItem item={item} className="border-none p-0" />
          </li>
        ))}
      </ul>
      <CardContent>
        <CartPrices {...cart} />
      </CardContent>
      <CardFooter>
        <CheckoutButton />
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
