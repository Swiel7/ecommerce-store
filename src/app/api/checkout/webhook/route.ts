import { fulfillCheckout } from "@/lib/actions/checkout";
import { stripe } from "@/lib/stripe";
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
    const orderId = event.data.object.metadata?.orderId;

    if (!orderId) await fulfillCheckout(event.data.object.id);
  }

  return NextResponse.json({ received: true });
}
