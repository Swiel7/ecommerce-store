"use client";

import { useCart } from "@/hooks/use-cart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { Empty } from "@/components/shared";

const Cart = () => {
  const {
    cart: { itemsCount },
  } = useCart();

  return (
    <>
      {itemsCount > 0 ? (
        <div className="flex gap-x-16 gap-y-8 not-lg:flex-col">
          <CartList />
          <div className="w-full max-w-sm">
            <CartSummary />
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Cart;
