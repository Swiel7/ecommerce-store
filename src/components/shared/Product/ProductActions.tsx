"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TIcon } from "@/types";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";

type ActionProps = {
  content: ReactNode;
  icon: TIcon;
  action: MouseEventHandler<HTMLButtonElement>;
  variant: "vertical" | "horizontal";
};

const ProductActions = ({
  className,
  variant = "vertical",
}: {
  className?: string;
  variant?: "vertical" | "horizontal";
}) => {
  return (
    <div
      className={cn(
        "flex",
        variant === "vertical" ? "flex-col gap-2" : "gap-3",
        className,
      )}
    >
      <Action
        content="Add to cart"
        icon={ShoppingCart}
        action={() => console.log("add to cart")}
        variant={variant}
      />
      <Action
        content="Add to wishlist"
        icon={Heart}
        action={() => console.log("add to wishlist")}
        variant={variant}
      />
      <Action
        content="Quick view"
        icon={Eye}
        action={() => console.log("Quick view")}
        variant={variant}
      />
    </div>
  );
};

export default ProductActions;

const Action = (props: ActionProps) => {
  const { content, action, variant } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-primary focus-visible:bg-primary hover:text-primary-foreground focus-visible:text-primary-foreground size-10"
          onClick={action}
        >
          <props.icon className="size-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side={variant === "vertical" ? "left" : "top"}>
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
