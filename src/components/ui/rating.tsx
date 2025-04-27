"use client";

import { StarHalf, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface RatingProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
}

export const Rating = ({
  value,
  size = 20,
  onRatingChange,
  disabled = false,
  ...props
}: RatingProps) => {
  const [internalValue, setInternalValue] = useState<number>(value ?? 0);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const currentValue = value ?? internalValue;

  const handleSelect = (rating: number) => {
    if (disabled) return;
    setInternalValue(rating);
    onRatingChange?.(rating);
  };

  const getStar = (star: number) => {
    const activeValue = hoveredValue ?? currentValue;
    const diff = activeValue - star;

    const empty = <Star size={size} className="fill-border stroke-0" />;
    const full = <Star size={size} className="fill-chart-4 stroke-0" />;
    const half = (
      <>
        <StarHalf size={size} className="fill-chart-4 stroke-0" />
        <Star
          size={size}
          className="fill-border absolute inset-0 -z-10 stroke-0"
        />
      </>
    );

    if (diff >= -0.25) return full;
    else if (diff >= -0.75) return half;
    else return empty;
  };

  return (
    <div className="flex items-center gap-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <label
          key={star}
          className={cn(
            "cursor-pointer transition-colors",
            disabled && "cursor-default",
          )}
          onMouseEnter={() => !disabled && setHoveredValue(star)}
          onMouseLeave={() => !disabled && setHoveredValue(null)}
        >
          {!disabled && (
            <input
              type="radio"
              value={star}
              checked={currentValue === star}
              onChange={() => handleSelect(star)}
              disabled={disabled}
              className="hidden"
              {...props}
            />
          )}
          <div className="relative">{getStar(star)}</div>
        </label>
      ))}
    </div>
  );
};
