"use client";

import { AddressElement, PaymentElement } from "@stripe/react-stripe-js";
import CheckoutSummary from "./CheckoutSummary";

const CheckoutForm = () => {
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
                contacts: [
                  // {
                  //   name: "Jenny Rosen",
                  //   address: {
                  //     line1: "185 Berry St.",
                  //     city: "San Francisco",
                  //     state: "CA",
                  //     postal_code: "94941",
                  //     country: "US",
                  //   },
                  // },
                  // {
                  //   name: "Jenny Rosen",
                  //   address: {
                  //     line1: "185 Berry St.",
                  //     city: "San Francisco",
                  //     state: "CA",
                  //     postal_code: "94941",
                  //     country: "US",
                  //   },
                  // },
                ],
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
        <div className="w-full max-w-sm">
          <CheckoutSummary />
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
