import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Order confirmation" };

const OrderConfirmationPage = async (props: {
  searchParams: Promise<{ session_id: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;

  // TODO:
  console.log(sessionId);
  const orderId = 1;

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
            <Button size="lg" asChild className="flex-1">
              <Link href={`/account/orders/${orderId}`}>View Order</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmationPage;
