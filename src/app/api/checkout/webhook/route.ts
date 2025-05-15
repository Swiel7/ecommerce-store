import { createOrder } from "@/lib/actions/order";
import { updateProductStock } from "@/lib/actions/product";
import { createShippingAddress } from "@/lib/actions/user";
import { stripe } from "@/lib/stripe";
import { TOrder, TOrderItem, TShippingAddress } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  let event: Stripe.Event;

  try {
    const sig = request.headers.get("stripe-signature")!;
    const payload = await request.text();

    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json("Invalid webhook signature", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    try {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: [
            "line_items.data.price.product",
            "payment_intent.payment_method",
          ],
        },
      );

      // Utwórz transakcję z poniższych funkcji
      const {
        payment_intent,
        amount_subtotal,
        amount_total,
        metadata,
        shipping_cost,
        collected_information,
        line_items,
        id,
      } = session;

      const paymentIntent = payment_intent as Stripe.PaymentIntent;
      const paymentMethod = (
        paymentIntent.payment_method as Stripe.PaymentMethod
      ).type as string;
      const shippingDetails =
        collected_information?.shipping_details as Stripe.Checkout.Session.CollectedInformation["shipping_details"];

      const formattedAddress: TShippingAddress = {
        address: {
          city: shippingDetails?.address.city || "",
          country: shippingDetails?.address.country || "",
          line1: shippingDetails?.address.line1 || "",
          line2: shippingDetails?.address.line2 || "",
          postal_code: shippingDetails?.address.postal_code || "",
          state: shippingDetails?.address.state || "",
        },
        name: shippingDetails?.name || "",
      };

      const items = line_items
        ? (line_items.data.map((item) => {
            const product = item.price?.product as Stripe.Product;

            const quantity = item.quantity as number;
            const price = item.price?.unit_amount as number;
            const image = product.images[0];
            const name = product.name;
            const color = product.metadata.color;
            const productId = product.metadata.productId;

            return { color, image, name, price, productId, quantity };
          }) as TOrderItem[])
        : [];

      // TODO: Create order (if not exist)

      const order = await createOrder({
        items,
        itemsPrice: amount_subtotal as number,
        paymentMethod,
        shippingAddress: formattedAddress,
        shippingPrice: shipping_cost?.amount_total as number,
        totalPrice: amount_total as number,
        userId: metadata?.userId as string,
        paymentId: id,
      } as TOrder);

      // updateSession
      await stripe.checkout.sessions.update(id, {
        metadata: { orderId: order.id },
      });

      // TODO: Add user address (if not exist)
      await createShippingAddress(formattedAddress, metadata?.userId as string);

      // TODO: Reduce stock value for products (do not run two times)

      for (const { productId, color, quantity } of items) {
        await updateProductStock(productId, color, quantity);
      }

      // TODO: Send receipt email ??
    } catch (error) {
      console.error(error);
    }
  }

  return NextResponse.json("Payment successful", { status: 200 });
}
