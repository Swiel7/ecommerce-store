"use client";

import { Button } from "@/components/ui/button";
import { Color } from "@/components/ui/color";
import { QuantityButton } from "@/components/ui/quantity-button";
import { Rating } from "@/components/ui/rating";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { TProduct } from "@/types";
import { ExternalLink, Heart, Package, Repeat, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProductDetails = ({ product }: { product: TProduct }) => {
  const { addItem } = useCart();
  const { name, discountPrice, regularPrice, numReviews, rating, variants } =
    product;

  const [variant, setVariant] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  // TODO: Add to wishlist (+wishlist status)

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3">
        <h3 className="text-3xl font-bold lg:text-4xl">{name}</h3>
        <div className="flex flex-wrap items-center gap-1.5">
          <Rating value={Number(rating)} disabled />
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            ({numReviews} reviews)
          </span>
        </div>
        <div className="flex gap-1.5">
          <span className="font-medium">
            {formatPrice(discountPrice ?? regularPrice)}
          </span>
          {discountPrice && (
            <span className="text-muted-foreground line-through">
              {formatPrice(regularPrice)}
            </span>
          )}
        </div>
      </div>
      {/* TODO: Stock */}
      <div className="space-y-2">
        <div className="text-muted-foreground flex gap-1.5 text-sm font-medium">
          Color:
          <span className="text-foreground">{variants[variant].colorName}</span>
        </div>
        <ToggleGroup
          type="single"
          variant="outline"
          className="flex-wrap gap-4 !shadow-none"
          value={variant.toString()}
          onValueChange={(value) => setVariant(Number(value))}
        >
          {variants.map((v, i) => (
            <ToggleGroupItem
              asChild
              key={v.colorName}
              value={i.toString()}
              disabled={v.stock < 1}
              size="lg"
              className="!bg-background data-[state=on]:border-primary flex-none rounded-lg !border"
            >
              <Color item={v} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex flex-wrap gap-4">
        <QuantityButton
          size="lg"
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
        <Button
          size="lg"
          className="grow"
          onClick={() =>
            addItem(product, quantity, variants[variant].colorName)
          }
        >
          Add To Cart
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          Buy Now
        </Button>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        <li>
          <Button variant="ghost" size="sm">
            <Heart />
            Add To Wishlist
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm">
            <Repeat />
            Compare
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm">
            <ExternalLink />
            Share
          </Button>
        </li>
      </ul>
      <ul className="text-muted-foreground space-y-4">
        <li className="flex items-center gap-3">
          <Truck /> <p>Free worldwide shipping on all order over $200</p>
        </li>
        <li className="flex items-center gap-3">
          <Package />
          <p className="flex flex-wrap gap-x-3">
            Delivers in 2-4 working days
            <Button asChild variant="link" size="sm" className="h-7 px-0">
              <Link href="/">Shipping & Return</Link>
            </Button>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default ProductDetails;
