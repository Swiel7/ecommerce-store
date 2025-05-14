import { useCart } from "@/hooks/use-cart";
import { checkFreeShipping, cn, formatPrice } from "@/lib/utils";

const CartPrices = () => {
  const {
    cart: { itemsPrice, shippingPrice, totalPrice },
  } = useCart();
  const { isFree } = checkFreeShipping(itemsPrice);

  return (
    <div className="divide-y">
      <div className="flex justify-between pb-4">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">{formatPrice(itemsPrice)}</span>
      </div>
      <div className="flex justify-between py-4">
        <span className="text-muted-foreground">Delivery Fee</span>
        <span
          className={cn("font-medium", isFree && "text-emerald-500 uppercase")}
        >
          {isFree ? "Free" : formatPrice(shippingPrice)}
        </span>
      </div>
      <div className="flex justify-between pt-4 text-lg font-bold">
        <span>Grand Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>
    </div>
  );
};

export default CartPrices;
