"use client";

import { Empty } from "@/components/shared";
import { useCart } from "@/hooks/use-cart";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { TCartItem, TShippingAddress } from "@/types";
import { CheckoutProvider } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const getClientSecret = (cartItems: TCartItem[]) => {
  return fetch("/api/checkout/create-session", {
    method: "POST",
    body: JSON.stringify(cartItems),
  })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
};

const appearance = {
  variables: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    colorPrimary: "#171717",
    colorText: "#0a0a0a",
    borderRadius: "0.625rem",
    accordionItemSpacing: "1rem",
    spacingPickerItem: "1rem",
    gridRowSpacing: "1rem",
  },
} as Appearance;

const Checkout = ({
  shippingAddress,
}: {
  shippingAddress: TShippingAddress[];
}) => {
  const {
    cart: { itemsCount, items },
  } = useCart();

  return (
    <>
      {itemsCount > 0 ? (
        <CheckoutProvider
          stripe={stripe}
          options={{
            fetchClientSecret: () => getClientSecret(items),
            elementsOptions: { appearance },
          }}
        >
          <CheckoutForm shippingAddress={shippingAddress} />
        </CheckoutProvider>
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Checkout;
