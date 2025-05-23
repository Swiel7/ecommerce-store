import { db } from "@/db";
import { products } from "@/db/schema";
import { authenticateUser } from "@/lib/actions/auth";
import { createOrder } from "@/lib/actions/order";
import {
  ALLOWED_COUNTRIES,
  FREE_SHIPPING_LIMIT,
  SHIPPING_COST,
} from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import { TCartItem, TOrder, TOrderItem } from "@/types";
import { inArray, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const user = await authenticateUser();
    if (!user) return;

    const cartItems = (await req.json()) as TCartItem[];
    const cartItemsIds = cartItems.map(({ productId }) => productId);

    const productsWithPrice = await db
      .select({
        id: products.id,
        price: sql`COALESCE(discount_price, regular_price)`,
      })
      .from(products)
      .where(inArray(products.id, cartItemsIds));

    const priceMap = new Map(productsWithPrice.map((p) => [p.id, p]));

    const items: TOrderItem[] = cartItems.map((item) => ({
      name: item.name,
      image: `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${item.image}`,
      color: item.color,
      productId: item.productId,
      quantity: item.quantity,
      price: priceMap.get(item.productId)!.price as number,
    }));

    const itemsPrice = items.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0,
    );
    const shippingPrice = itemsPrice >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }));

    const order = await createOrder({
      items,
      itemsPrice,
      shippingPrice,
      totalPrice: itemsPrice + shippingPrice,
      shippingAddress: null,
      userId: user.id!,
      paymentMethod: null,
    } as TOrder);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      mode: "payment",
      line_items,
      payment_method_types: ["card", "paypal"],
      shipping_address_collection: { allowed_countries: ALLOWED_COUNTRIES },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Shipping cost",
            fixed_amount: { amount: shippingPrice, currency: "usd" },
            type: "fixed_amount",
          },
        },
      ],
      customer_email: user.email!,
      metadata: { userId: user.id!, orderId: order.id, completed: "false" },
      return_url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
