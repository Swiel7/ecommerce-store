import { cn, formatPrice } from "@/lib/utils";
import { TOrderItem } from "@/types";
import Image from "next/image";

const OrderItem = ({
  item,
  className,
}: {
  item: TOrderItem;
  className?: string;
}) => {
  const { name, image, color, price, quantity } = item;

  return (
    <article className={cn("flex gap-3 rounded-lg border p-4", className)}>
      <div className="grid size-16 shrink-0 place-items-center rounded-lg border">
        <div className="relative size-[80%]">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
            alt={name}
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
      </div>
      <div className="flex grow flex-wrap justify-between gap-x-5">
        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-bold">{name}</h3>
          <span className="text-muted-foreground text-sm font-medium">
            Color: <span> {color}</span>
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold">{formatPrice(price)}</span>
          <span className="text-muted-foreground text-sm font-medium">
            Qty: {quantity}
          </span>
        </div>
      </div>
    </article>
  );
};

export default OrderItem;
