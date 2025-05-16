import { ClearCart } from "@/components/store/Cart";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = { title: "Order confirmation" };

const OrderConfirmationPage = async (props: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;

  if (!sessionId) redirect("/");

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.status !== "complete") redirect("/checkout");

  const orderId = session.metadata?.orderId;

  return (
    <section>
      <div className="wrapper">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-8">
          <CheckCircle className="text-foreground size-16" />
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold">Your Order is Confirmed</h2>
            <p className="text-muted-foreground">
              Thanks for shopping! Your order hasn’t shipped yet, but we will
              send you and email when it done.
            </p>
          </div>
          <div className="flex w-full gap-4">
            <Button size="lg" asChild variant="outline" className="flex-1">
              <Link href="/">Back To Home</Link>
            </Button>
            {orderId ? (
              <>
                <Button size="lg" asChild className="flex-1">
                  <Link href={`/account/orders/${orderId}`}>View Order</Link>
                </Button>
                <ClearCart />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
