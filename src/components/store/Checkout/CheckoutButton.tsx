"use client";

import { Button } from "@/components/ui/button";
import { useCheckout } from "@stripe/react-stripe-js";
import { useTransition } from "react";
import { toast } from "sonner";

const CheckoutButton = () => {
  const checkout = useCheckout();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await checkout.confirm();

      if (result.type === "error") {
        toast.error("Error", { description: result.error.message });
      }
    });
  };

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      loading={isPending}
      onClick={handleClick}
    >
      Place Order
    </Button>
  );
};

export default CheckoutButton;
