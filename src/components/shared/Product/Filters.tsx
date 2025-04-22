"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TFilterKeys, TFilterOption, TFilterOptionColor } from "@/types";
import React, { Fragment, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Color } from "@/components/ui/color";
import { SLIDER_MAX_PRICE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

type Props = {
  filters: {
    status: TFilterOption[];
    category: TFilterOption[];
    brand: TFilterOption[];
    color: TFilterOptionColor[];
  };
};

const titles: Exclude<TFilterKeys, "sort" | "page">[] = [
  "status",
  "category",
  "brand",
  "price",
  "color",
];

const Filters = ({ filters }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const params = new URLSearchParams();
      const sort = searchParams.get("sort");

      for (const [key, value] of formData.entries()) {
        params.append(key, value.toString());
      }

      if (sort) params.set("sort", sort);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <form ref={formRef}>
      <Accordion type="multiple" defaultValue={titles}>
        {titles.map((title) => (
          <AccordionItem key={title} value={title} className="not-lg:mb-4">
            <AccordionTrigger className="capitalize">{title}</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {title !== "price" && title !== "color" && (
                <>
                  {filters[title].map(({ label, count }) => (
                    <div key={label} className="flex items-center space-x-3">
                      <Checkbox
                        key={searchParams.getAll(title).toString()}
                        id={label}
                        name={title}
                        value={label}
                        onCheckedChange={handleChange}
                        defaultChecked={searchParams
                          .getAll(title)
                          .includes(label)}
                        disabled={count.toString() === "0"}
                      />
                      <Label htmlFor={label} className="grow">
                        <span>{label}</span>
                        <span className="text-muted-foreground ml-auto">
                          ({count})
                        </span>
                      </Label>
                    </div>
                  ))}
                </>
              )}
              {title === "price" && (
                <PriceSlider
                  onValueCommit={handleChange}
                  price={searchParams.getAll("price")}
                  key={searchParams.getAll("price").toString()}
                />
              )}
              {title === "color" && (
                <div className="flex flex-wrap gap-4 p-1">
                  {filters.color.map((color) => (
                    <Fragment key={color.colorName}>
                      <Color
                        key={searchParams.getAll(title).toString()}
                        id={color.colorName}
                        name={title}
                        value={color.colorName}
                        onCheckedChange={handleChange}
                        defaultChecked={searchParams
                          .getAll(title)
                          .includes(color.colorName)}
                        item={color}
                      />
                    </Fragment>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </form>
  );
};

export default Filters;

const PriceSlider = ({
  onValueCommit,
  price,
}: {
  onValueCommit: (value: number[]) => void;
  price: string | string[] | undefined;
}) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>(() => {
    return Array.isArray(price) && price.length > 1
      ? [parseInt(price[0]), parseInt(price[1])]
      : [0, SLIDER_MAX_PRICE];
  });

  return (
    <>
      <p>
        Price: {formatPrice(sliderValue[0])} - {formatPrice(sliderValue[1])}
      </p>
      <Slider
        id="price"
        name="price"
        step={10000}
        max={SLIDER_MAX_PRICE}
        minStepsBetweenThumbs={1}
        onValueCommit={onValueCommit}
        onValueChange={(value) => setSliderValue(value as [number, number])}
        value={sliderValue}
      />
    </>
  );
};
