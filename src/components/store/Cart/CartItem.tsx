"use client";

import { QuantityButton } from "@/components/ui/quantity-button";
import { useCart } from "@/hooks/use-cart";
import { cn, formatPrice } from "@/lib/utils";
import { TCartItem } from "@/types";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  item: TCartItem;
  withQuantityButton?: boolean;
  withRemoveButton?: boolean;
  className?: string;
};

const CartItem = ({
  item,
  withQuantityButton = true,
  withRemoveButton = true,
  className,
}: Props) => {
  const { productId, name, slug, image, color, discountPrice, regularPrice } =
    item;

  const { removeItem, setQuantity } = useCart();
  const [quantityValue, setQuantityValue] = useState<number>(item.quantity);

  const handleQuantityChange = (value: number) => {
    setQuantityValue(value);
    setQuantity(item, value);
  };

  return (
    <article
      className={cn("relative flex items-start gap-4 p-4 pr-11", className)}
    >
      <div className="grid aspect-square w-5/12 max-w-40 shrink-0 rounded-lg border">
        <Link href={`/products/${slug}`} className="relative m-auto size-[80%]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
            alt={name}
            fill
            className="object-contain"
            sizes="160px"
          />
        </Link>
      </div>
      <div className="flex flex-col items-start gap-1.5">
        <Link href={`/products/${slug}`} className="hover:underline">
          <h3 className="font-bold">{name}</h3>
        </Link>
        <span className="font-medium">Color: {color}</span>
        <div className="flex flex-wrap gap-1.5">
          {!withQuantityButton && (
            <span className="font-medium">{quantityValue} x </span>
          )}
          <span className="font-medium">
            {formatPrice(discountPrice ?? regularPrice)}
          </span>
          {discountPrice && (
            <span className="text-muted-foreground line-through">
              {formatPrice(regularPrice)}
            </span>
          )}
        </div>
        {withQuantityButton && (
          <QuantityButton
            className="h-8 [&_input]:text-sm [&&_svg]:size-4"
            quantity={quantityValue}
            onQuantityChange={(value) => handleQuantityChange(value)}
          />
        )}
      </div>
      {withRemoveButton && (
        <button
          className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          onClick={() => removeItem(productId, color)}
        >
          <XIcon />
        </button>
      )}
    </article>
  );
};

export default CartItem;
