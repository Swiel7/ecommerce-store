"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/hooks/use-cart";
import { checkFreeShipping, cn, formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import CartItem from "./CartItem";
import { FREE_SHIPPING_LIMIT } from "@/lib/constants";

const CartList = () => {
  const {
    cart: { items, itemsPrice, taxPrice },
    clearCart,
  } = useCart();

  const { isFree, freeShippingDiff } = checkFreeShipping(itemsPrice, taxPrice);

  const progressValue = !isFree
    ? ((FREE_SHIPPING_LIMIT - freeShippingDiff) * 100) / FREE_SHIPPING_LIMIT
    : 100;

  return (
    <div className="flex grow flex-col gap-6">
      <Alert variant={isFree ? "success" : "default"}>
        <Package className="stroke-foreground" />
        <AlertTitle className="text-foreground pb-3">
          {isFree
            ? "Your order qualifies for free shipping!"
            : `Add ${formatPrice(freeShippingDiff)} to cart and get free shipping!`}
        </AlertTitle>
        <AlertDescription>
          <Progress
            value={progressValue}
            className={cn(
              isFree
                ? "*:data-[slot=progress-indicator]:bg-emerald-500"
                : "*:data-[slot=progress-indicator]:bg-muted-foreground",
            )}
          />
        </AlertDescription>
      </Alert>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="rounded-lg border">
            <CartItem item={item} />
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto"
        onClick={clearCart}
      >
        Clear All
      </Button>
    </div>
  );
};

export default CartList;
