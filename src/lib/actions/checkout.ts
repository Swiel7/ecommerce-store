"use server";

import { TOrder, TShippingAddress } from "@/types";
import { stripe } from "../stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createShippingAddressIfNotExists } from "./user";

export const fulfillCheckout = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.payment_method"],
  });

  const paymentIntent = session.payment_intent as Stripe.PaymentIntent;
  const paymentMethod = (paymentIntent.payment_method as Stripe.PaymentMethod)
    .type;
  const shippingDetails = session.collected_information?.shipping_details;

  const shippingAddress: TShippingAddress = {
    name: shippingDetails?.name || "",
    address: {
      city: shippingDetails?.address.city || "",
      country: shippingDetails?.address.country || "",
      line1: shippingDetails?.address.line1 || "",
      line2: shippingDetails?.address.line2 || "",
      postal_code: shippingDetails?.address.postal_code || "",
      state: shippingDetails?.address.state || "",
    },
  };

  let updatedOrder: TOrder | undefined;

  await db.transaction(async (tx) => {
    updatedOrder = await tx
      .update(orders)
      .set({ isPaid: true, paymentMethod, shippingAddress })
      .where(eq(orders.id, session.metadata!.orderId))
      .returning()
      .then((o) => o[0]);

    for (const item of updatedOrder!.items) {
      const product = await tx
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .then((p) => p[0]);

      const updatedVariants = product.variants.map((v) =>
        v.colorName === item.color
          ? { ...v, stock: v.stock - item.quantity }
          : v,
      );

      await tx
        .update(products)
        .set({ variants: updatedVariants })
        .where(eq(products.id, item.productId));
    }
  });

  await createShippingAddressIfNotExists(
    shippingAddress,
    session.metadata!.userId,
  );

  if (updatedOrder) {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...session.metadata, completed: "true" },
    });
  }
};
