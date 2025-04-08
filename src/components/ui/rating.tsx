"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  initialRating: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
}

export const Rating = ({
  initialRating,
  size = 20,
  onRatingChange,
  disabled = false,
  ...props
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState(initialRating);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const starIndex = parseInt(
      (event.currentTarget as HTMLDivElement).dataset.starIndex || "0",
    );
    setCurrentRating(starIndex);
    setHoverRating(null);
    onRatingChange?.(starIndex);
  };

  const displayRating = disabled
    ? initialRating
    : (hoverRating ?? currentRating);

  const fullStars = Math.floor(displayRating);
  const fillPercentage =
    displayRating % 1 < 0.3 ? 0 : displayRating % 1 > 0.7 ? 1 : 0.5;

  const partialStar =
    displayRating % 1 > 0 ? (
      <PartialStar fillPercentage={fillPercentage} size={size} />
    ) : null;

  return (
    <div
      className={cn("flex items-center", {
        "pointer-events-none": disabled,
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {[...Array(fullStars)].map((_, i) => (
        <div
          key={i}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          data-star-index={i + 1}
        >
          <Star size={size} className="text-chart-4 fill-current stroke-0" />
        </div>
      ))}
      <div>{partialStar}</div>
      {[...Array(Math.max(0, 5 - fullStars - (partialStar ? 1 : 0)))].map(
        (_, i) => (
          <div
            key={i + fullStars + 1}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            data-star-index={i + fullStars + 1}
          >
            <Star size={size} className="fill-border stroke-0" />
          </div>
        ),
      )}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
}

const PartialStar = (props: PartialStarProps) => {
  const { fillPercentage, size, className } = props;

  return (
    <div className="relative">
      <Star size={size} className={cn("fill-border stroke-0", className)} />
      <div
        className="absolute top-0 overflow-hidden"
        style={{ width: `${fillPercentage * 100}%` }}
      >
        <Star size={size} className={cn("fill-chart-4 stroke-0", className)} />
      </div>
    </div>
  );
};
