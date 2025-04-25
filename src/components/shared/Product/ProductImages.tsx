"use client";

import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TProduct } from "@/types";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ product }: { product: TProduct }) => {
  const { images, discountPrice, regularPrice } = product;

  const [selectedImage, setSelectedImage] = useState<string>(images[0]);

  return (
    <div className="space-y-4">
      <div className="grid aspect-square overflow-hidden rounded-lg border">
        <div className="p-4 xl:p-10">
          <div className="relative size-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${selectedImage}`}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
        {discountPrice && (
          <Badge className="absolute top-[5%] left-[5%]">
            -{Math.round(((regularPrice - discountPrice) * 100) / regularPrice)}
            %
          </Badge>
        )}
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        className="w-full gap-4"
        value={selectedImage}
        onValueChange={setSelectedImage}
      >
        {images.map((image) => (
          <ToggleGroupItem
            key={image}
            value={image}
            className="!bg-background data-[state=on]:border-primary aspect-square size-full rounded-lg !border p-4 xl:p-8"
          >
            <div className="relative size-full">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                alt={product.name}
                fill
                className="object-contain"
                sizes="33vw"
              />
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ProductImages;
