import { getProductBySlug } from "@/actions/products";
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
import { TProduct } from "@/types";
import { ShoppingCart } from "lucide-react";
import { cache } from "react";
import CartItem from "./CartItem";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartDrawer = async () => {
  const p = await cache(() =>
    getProductBySlug("ayvvpii-stereo-earphones-bluetooth"),
  )();
  if (!p) return <div>Product not found</div>;
  const cartItems = Array(7).fill(p) as TProduct[];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="size-10">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-sm" side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="min-h-0 px-4 lg:px-6">
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id}>
                <CartItem
                  product={item}
                  className="pr-8 pl-0 **:text-base [&_button]:right-2 [&>div]:gap-1.5"
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
        <SheetFooter className="bg-background sticky bottom-0 gap-4 !pt-0 lg:gap-6">
          <div className="flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total</span>
            <span>{formatPrice(1580)}</span>
          </div>
          <div className="flex gap-4">
            <SheetClose asChild className="flex-1">
              <Button variant="outline" size="lg" asChild>
                <Link href="/cart">View Cart</Link>
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button size="lg" asChild className="flex-1">
                <Link href="/cart">Checkout</Link>
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
