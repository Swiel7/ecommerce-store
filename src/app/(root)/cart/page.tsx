import { getProductBySlug } from "@/actions/products";
import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { CartItem, CartSummary } from "@/components/store/Cart";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import { Package } from "lucide-react";
import { cache } from "react";

export const metadata = { title: "Cart" };

const items: TBreadcrumbsItem[] = [
  { label: "Home", href: "/" },
  { label: "Cart" },
];

const Cart = async () => {
  const p = await cache(() =>
    getProductBySlug("ayvvpii-stereo-earphones-bluetooth"),
  )();
  if (!p) return <div>Product not found</div>;
  const cartItems = Array(3).fill(p) as TProduct[];
  const freeShipping = true;

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-x-16 gap-y-8 not-lg:flex-col">
            <div className="flex grow flex-col gap-6">
              <Alert variant={freeShipping ? "success" : "default"}>
                <Package className="stroke-foreground" />
                <AlertTitle className="text-foreground pb-3">
                  {freeShipping
                    ? "Your order qualifies for free shipping!"
                    : "Add $374.12 to cart and get free shipping!"}
                </AlertTitle>
                <AlertDescription>
                  <Progress
                    value={33}
                    className={cn(
                      freeShipping
                        ? "*:data-[slot=progress-indicator]:bg-emerald-500"
                        : "*:data-[slot=progress-indicator]:bg-muted-foreground",
                    )}
                  />
                </AlertDescription>
              </Alert>
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="rounded-lg border">
                    <CartItem product={item} />
                  </li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="ml-auto">
                Clear All
              </Button>
            </div>
            <div className="w-full max-w-[360px]">
              <CartSummary />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
