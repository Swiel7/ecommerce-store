import Stripe from "stripe";

export const SLIDER_MAX_PRICE = 200000;
export const PRODUCTS_PER_PAGE = 12;
export const MAX_QUANTITY = 10;
export const REVIEWS_PER_PAGE = 6;
export const ORDERS_PER_PAGE = 6;
export const FREE_SHIPPING_LIMIT = 50000;
export const SHIPPING_COST = 1000;
export const ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  ["US", "GB", "PL"];
