import { Badge } from "@/components/ui/badge";
import { formatPrice, getAverage } from "@/lib/utils";
import { TProduct, TReview } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ProductActions from "./ProductActions";
import { Rating } from "@/components/ui/rating";

type Props = {
  product: TProduct & { reviews: TReview[] };
  variant?: "vertical" | "horizontal";
};

const ProductCard = ({ product, variant = "vertical" }: Props) => {
  const rating = getAverage(product.reviews.map((review) => review.rating));

  return (
    <article className="group">
      <div className="bg-muted relative grid aspect-square overflow-hidden rounded-lg">
        <Link href={`/products/${product.slug}`} className="p-6">
          <div className="relative h-full w-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${product.images[0]}`}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 500px) 100vw, (max-width: 740px) 50vw, (max-width: 990px) 33vw, 25vw"
            />
          </div>
        </Link>
        {product.discountPrice && (
          <Badge className="absolute top-[5%] left-[5%]">
            -
            {Math.round(
              ((product.regularPrice - product.discountPrice) * 100) /
                product.regularPrice,
            )}
            %
          </Badge>
        )}
        <ProductActions className="slide-in-from-right slide-out-to-right group-hover:animate-in animate-out focus-within:animate-in absolute top-[5%] right-[5%] opacity-0 transition duration-100 ease-in group-hover:opacity-100 group-hover:duration-300 group-hover:ease-out focus-within:opacity-100 focus-within:duration-300 focus-within:ease-out" />
      </div>
      <div className="mt-2 flex flex-col items-start gap-2">
        <div className="flex items-center gap-1.5">
          <Rating initialRating={rating} disabled />
          <span className="text-muted-foreground text-sm">
            ({product.reviews.length} reviews)
          </span>
        </div>
        <Link href={`/products/${product.slug}`} className="hover:underline">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <div>
          <span className="mr-1.5 font-medium">
            {formatPrice(product.discountPrice || product.regularPrice)}
          </span>
          {product.discountPrice && (
            <span className="text-muted-foreground line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
