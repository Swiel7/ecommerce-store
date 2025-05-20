"use client";

import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";
import { TShippingAddress } from "@/types";

const CheckoutForm = ({
  shippingAddress,
}: {
  shippingAddress: TShippingAddress[];
}) => {
  return (
    <form>
      <div className="flex gap-x-16 gap-y-8 not-lg:flex-col">
        <div className="grow space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Shipping Address</h3>
            <AddressElement
              options={{
                mode: "shipping",
                display: { name: "split" },
                contacts: shippingAddress,
              }}
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Payment Method</h3>
            <PaymentElement
              options={{
                layout: { type: "accordion", defaultCollapsed: false },
              }}
            />
          </div>
        </div>
        <div className="w-full lg:max-w-sm">
          <CheckoutSummary />
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
