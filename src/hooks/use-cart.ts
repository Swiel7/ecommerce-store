import { FREE_SHIPPING_LIMIT, SHIPPING_COST, TAX_RATE } from "@/lib/constants";
import { TCart, TCartItem, TProduct } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState: TCart = {
  items: [],
  itemsCount: 0,
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

type CartStore = {
  cart: TCart;
  addItem: (product: TProduct, quantity: number, color: string) => void;
  removeItem: (id: string, color: string) => void;
  setQuantity: (cartItem: TCartItem, quantity: number) => void;
  clearCart: () => void;
};

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cart: initialState,
      addItem: (product, quantity, color) => {
        const { id, name, images, discountPrice, regularPrice, slug } = product;

        const cartItem: TCartItem = {
          id,
          name,
          slug,
          image: images[0],
          regularPrice,
          discountPrice,
          color,
          quantity,
        };

        const items = get().cart.items;
        const existingItem = items.find(
          (item) => item.id === cartItem.id && item.color === cartItem.color,
        );

        const newItems = existingItem
          ? items.map((item) =>
              item.id === existingItem.id && item.color === existingItem.color
                ? {
                    ...existingItem,
                    quantity: existingItem.quantity + cartItem.quantity,
                  }
                : item,
            )
          : items.concat(cartItem);

        set(({ cart }) => ({
          cart: {
            ...cart,
            items: newItems,
            itemsCount: calcCartItems(newItems),
            ...calcCartPrice(newItems),
          },
        }));
      },
      removeItem: (id, color) => {
        const items = get().cart.items.filter(
          (item) => !(item.id === id && item.color === color),
        );

        set(({ cart }) => ({
          cart: {
            ...cart,
            items,
            itemsCount: calcCartItems(items),
            ...calcCartPrice(items),
          },
        }));
      },
      setQuantity: (product, quantity) => {
        const items = [...get().cart.items];
        const existingItem = items.find(
          (item) => item.id === product.id && item.color === product.color,
        );

        if (existingItem) existingItem.quantity = quantity;
        set(({ cart }) => ({
          cart: {
            ...cart,
            items,
            itemsCount: calcCartItems(items),
            ...calcCartPrice(items),
          },
        }));
      },
      clearCart: () => set({ cart: initialState }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

const calcCartPrice = (items: TCartItem[]) => {
  const itemsPrice = items.reduce(
    (acc, item) =>
      acc + (item.discountPrice ?? item.regularPrice) * item.quantity,
    0,
  );
  const taxPrice = TAX_RATE * itemsPrice;
  const shippingPrice =
    itemsPrice + taxPrice >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const calcCartItems = (items: TCartItem[]) => {
  return items.reduce((acc, item) => acc + item.quantity, 0);
};
