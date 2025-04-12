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
import { TFilterOption, TFilterOptionColor, TFilters } from "@/types";
import React, { useRef, useState } from "react";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
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

const titles: TFilters[] = ["status", "category", "brand", "price", "color"];

const Filters = ({ filters }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const params = new URLSearchParams();

      for (const [key, value] of formData.entries()) {
        params.append(key, value.toString());
      }

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <form ref={formRef}>
      <Accordion type="multiple" defaultValue={titles}>
        {titles.map((title) => (
          <AccordionItem key={title} value={title}>
            <AccordionTrigger className="capitalize">{title}</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {title !== "price" && title !== "color" && (
                <>
                  {filters[title].map(({ label, count }) => (
                    <div key={label} className="flex items-center space-x-3">
                      <Checkbox
                        id={label}
                        name={title}
                        value={label}
                        onCheckedChange={handleChange}
                        defaultChecked={searchParams
                          .getAll(title)
                          .includes(label)}
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
                  searchParams={searchParams}
                />
              )}
              {title === "color" && (
                <div className="flex flex-wrap gap-4 p-1">
                  {filters.color.map((color) => (
                    <Color
                      key={color.colorName}
                      id={color.colorName}
                      name={title}
                      value={color.colorName}
                      onCheckedChange={handleChange}
                      defaultChecked={searchParams
                        .getAll(title)
                        .includes(color.colorName)}
                      item={color}
                    />
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
  searchParams,
}: {
  onValueCommit: (value: number[]) => void;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const [sliderValue, setSliderValue] = useState<[number, number]>(() => {
    const values = searchParams.getAll("price");
    return values.length > 1
      ? [parseInt(values[0]), parseInt(values[1])]
      : [0, 100];
  });

  const minPrice = formatPrice((sliderValue[0] * SLIDER_MAX_PRICE) / 100);
  const maxPrice = formatPrice((sliderValue[1] * SLIDER_MAX_PRICE) / 100);

  return (
    <>
      <p>
        Price: {minPrice} - {maxPrice}
      </p>
      <Slider
        id="price"
        name="price"
        step={5}
        minStepsBetweenThumbs={1}
        onValueCommit={onValueCommit}
        onValueChange={(value) => setSliderValue(value as [number, number])}
        value={sliderValue}
      />
    </>
  );
};
