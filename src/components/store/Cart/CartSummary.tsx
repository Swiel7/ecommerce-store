"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import CartPrices from "./CartPrices";
import { useCart } from "@/hooks/use-cart";

const CartSummary = () => {
  const { cart } = useCart();

  return (
    <Card>
      <CardContent>
        <CartPrices {...cart} />
      </CardContent>
      <CardFooter>
        <Button size="lg" asChild className="w-full">
          <Link href="/checkout">Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
