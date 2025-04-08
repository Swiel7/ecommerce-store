import { products, reviews } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type TProduct = InferSelectModel<typeof products>;
export type TReview = InferSelectModel<typeof reviews>;

export type TIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
