import { Button } from "@/components/ui/button";
import { cn, formatPrice } from "@/lib/utils";

const CartSummary = () => {
  const free = true;

  return (
    <div className="space-y-6 rounded-lg border p-6">
      <div className="divide-y">
        <div className="flex justify-between pb-4">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(1600)}</span>
        </div>
        <div className="space-y-4 py-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxes</span>
            <span className="font-medium">{formatPrice(20)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span
              className={cn(
                "font-medium",
                free && "text-emerald-500 uppercase",
              )}
            >
              {free ? "Free" : formatPrice(10)}
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-4 text-lg font-bold">
          <span>Grand Total</span>
          <span>{formatPrice(1580)}</span>
        </div>
      </div>
      <Button size="lg" className="w-full">
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
