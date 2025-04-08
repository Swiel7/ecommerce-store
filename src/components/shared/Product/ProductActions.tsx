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
};

const ProductActions = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Action
        content="Add to cart"
        icon={ShoppingCart}
        action={() => console.log("add to cart")}
      />
      <Action
        content="Add to wishlist"
        icon={Heart}
        action={() => console.log("add to wishlist")}
      />
      <Action
        content="Quick view"
        icon={Eye}
        action={() => console.log("Quick view")}
      />
    </div>
  );
};

export default ProductActions;

const Action = (props: ActionProps) => {
  const { content, action } = props;

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
      <TooltipContent side="left">{content}</TooltipContent>
    </Tooltip>
  );
};
