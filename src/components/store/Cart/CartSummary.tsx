"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { checkFreeShipping, cn, formatPrice } from "@/lib/utils";
import Link from "next/link";

const CartSummary = () => {
  const {
    cart: { itemsPrice, shippingPrice, taxPrice, totalPrice },
  } = useCart();
  const { isFree } = checkFreeShipping(itemsPrice, taxPrice);

  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="divide-y">
        <div className="flex justify-between pb-4">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(itemsPrice)}</span>
        </div>
        <div className="space-y-4 py-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxes</span>
            <span className="font-medium">{formatPrice(taxPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span
              className={cn(
                "font-medium",
                isFree && "text-emerald-500 uppercase",
              )}
            >
              {isFree ? "Free" : formatPrice(shippingPrice)}
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-4 text-lg font-bold">
          <span>Grand Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
      <Button size="lg" asChild className="w-full">
        <Link href="/checkout">Checkout</Link>
      </Button>
    </div>
  );
};

export default CartSummary;
