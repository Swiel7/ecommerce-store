import { db } from "@/db";
import { products } from "@/db/schema";
import { calcCartPrice } from "@/hooks/use-cart";
import { authenticateUser } from "@/lib/actions/auth";
import { createOrGetStripeCustomer, getUserById } from "@/lib/services/user";
import { stripe } from "@/lib/stripe";
import { TCartItem } from "@/types";
import { inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateUser();
    if (!user) return;

    const requestHeaders = new Headers(request.headers);
    const origin = requestHeaders.get("origin");

    const cartItems = (await request.json()) as TCartItem[];
    const cartItemsIds = cartItems.map(({ productId }) => productId);

    const productsWithPrice = await db
      .select({
        id: products.id,
        discountPrice: products.discountPrice,
        regularPrice: products.regularPrice,
      })
      .from(products)
      .where(inArray(products.id, cartItemsIds));

    const formattedProducts = productsWithPrice.reduce(
      (acc, { id, regularPrice, discountPrice }) => {
        acc[id] = { regularPrice, discountPrice };
        return acc;
      },
      {} as Record<string, Record<string, number | null>>,
    );

    const formattedCartItems = cartItems.map((item) => ({
      ...item,
      discountPrice: formattedProducts[item.productId].discountPrice,
      regularPrice: formattedProducts[item.productId].regularPrice as number,
      image: `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${item.image}`,
    }));

    const { shippingPrice } = calcCartPrice(formattedCartItems);

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      formattedCartItems.map(
        ({
          name,
          color,
          quantity,
          image,
          productId,
          discountPrice,
          regularPrice,
        }) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name,
              images: [image],
              metadata: { productId, color },
            },
            unit_amount: discountPrice ?? regularPrice,
          },
          quantity,
        }),
      );

    const dbUser = await getUserById(user.id!);
    if (!dbUser) throw new Error("User not found!");

    const result = await createOrGetStripeCustomer(dbUser);
    if (!result.success) throw new Error("Stripe customer not created!");

    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      mode: "payment",
      line_items,
      payment_method_types: ["card", "paypal"],
      shipping_address_collection: { allowed_countries: ["US", "GB", "PL"] },
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Shipping cost",
            fixed_amount: { amount: shippingPrice, currency: "usd" },
          },
        },
      ],
      customer_email: user.email!,
      customer: result.stripeCustomerId,
      saved_payment_method_options: { payment_method_save: "enabled" },
      metadata: { userId: user.id! },
      return_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error(error);
  }
}
