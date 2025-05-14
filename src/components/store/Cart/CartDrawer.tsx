"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import CartItem from "./CartItem";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/hooks/use-cart";
import { Badge } from "@/components/ui/badge";

const CartDrawer = () => {
  const {
    cart: { items, itemsCount, totalPrice },
  } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative size-10">
          <ShoppingCart />
          {itemsCount > 0 && (
            <Badge className="absolute -top-1 right-0 aspect-square min-h-4 min-w-4 rounded-full p-1 leading-0">
              {itemsCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm" side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="min-h-0 px-4 lg:px-6">
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.productId}>
                <CartItem
                  item={item}
                  className="pr-8 pl-0 **:text-base [&_button]:right-2 [&>div]:gap-1.5 [&>div]:first-of-type:w-24"
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
        <SheetFooter className="bg-background sticky bottom-0 gap-4 !pt-0 lg:gap-6">
          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex gap-4">
            <SheetClose asChild className="flex-1">
              <Button variant="outline" size="lg" asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button size="lg" asChild className="flex-1">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
