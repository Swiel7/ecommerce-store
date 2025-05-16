"use server";

import { TOrder, TOrderItem, TShippingAddress } from "@/types";
import { stripe } from "../stripe";
import Stripe from "stripe";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createShippingAddressIfNotExists } from "./user";

export const fulfillCheckout = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product", "payment_intent.payment_method"],
  });

  const { amount_subtotal, amount_total, metadata, shipping_cost, line_items } =
    session;

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

  const items: TOrderItem[] =
    line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product;

      return {
        name: product.name,
        image: product.images[0],
        color: product.metadata.color,
        productId: product.metadata.productId,
        quantity: item.quantity as number,
        price: item.price?.unit_amount as number,
      };
    }) || [];

  let order: TOrder | undefined;

  await db.transaction(async (tx) => {
    order = await tx
      .insert(orders)
      .values({
        items,
        itemsPrice: amount_subtotal as number,
        shippingPrice: shipping_cost?.amount_total as number,
        totalPrice: amount_total as number,
        shippingAddress,
        userId: metadata?.userId as string,
        paymentMethod,
        paymentId: sessionId,
      })
      .returning()
      .then((r) => r[0]);

    for (const item of items) {
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
    metadata?.userId as string,
  );

  if (order) {
    await stripe.checkout.sessions.update(sessionId, {
      metadata: { ...metadata, orderId: order.id },
    });
  }
};
