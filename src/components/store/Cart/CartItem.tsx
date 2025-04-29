import { QuantityButton } from "@/components/ui/quantity-button";
import { formatPrice } from "@/lib/utils";
import { TProduct } from "@/types";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ product }: { product: TProduct }) => {
  return (
    <article className="relative flex items-start gap-4 p-4 pr-11">
      <div className="grid aspect-square w-40 rounded-lg border">
        <Link href={`/products/${product.slug}`} className="p-4 xl:p-6">
          <div className="relative size-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${product.images[0]}`}
              alt={product.name}
              fill
              className="object-contain"
              sizes="160px"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-col gap-1.5">
          <Link href={`/products/${product.slug}`} className="hover:underline">
            <h3 className="text-lg font-medium">{product.name}</h3>
          </Link>
          <span className="font-medium">
            Color: {product.variants[0].colorName}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="font-medium">
            {formatPrice(product.discountPrice || product.regularPrice)}
          </span>
          {product.discountPrice && (
            <span className="text-muted-foreground line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
        <QuantityButton className="h-8 [&_input]:text-sm [&&_svg]:size-4" />
      </div>
      <button className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
        <XIcon />
      </button>
    </article>
  );
};

export default CartItem;
