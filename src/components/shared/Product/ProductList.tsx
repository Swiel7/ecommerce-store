"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "@/data";
import { TFilterOption, TFilterOptionColor, TFilters, TProduct } from "@/types";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import { cn, formQueryString } from "@/lib/utils";
import MobileFilters from "./MobileFilters";
import FilterTags from "./FilterTags";

type Props = {
  products: TProduct[];
  totalPages: number;
  totalProducts: number;
  searchParams: Record<
    TFilters | "page" | "sort",
    string | string[] | undefined
  >;
  filters: {
    status: TFilterOption[];
    category: TFilterOption[];
    brand: TFilterOption[];
    color: TFilterOptionColor[];
  };
};

const ProductList = ({
  products,
  totalPages,
  totalProducts,
  searchParams,
  filters,
}: Props) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const router = useRouter();

  const currentPage = Number(searchParams.page as string);

  const setSort = (value: string) => {
    const url = formQueryString(searchParams as Record<string, string>, [
      { key: "sort", value },
      { key: "page", value: "1" },
    ]);
    router.replace(url, { scroll: false });
  };

  return (
    <div className="flex grow flex-col gap-8 lg:gap-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <LayoutGrid />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setView("list")}
            >
              <LayoutList />
            </Button>
          </div>
          <p>
            Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
            {Math.min(currentPage * PRODUCTS_PER_PAGE, totalProducts)} of{" "}
            {totalProducts} results
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <MobileFilters filters={filters} searchParams={searchParams} />
          <Select
            value={searchParams.sort as string}
            onValueChange={(value) => setSort(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(({ name, value }) => (
                <SelectItem key={value} value={value}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <FilterTags filters={filters} searchParams={searchParams} />
      <ul
        className={cn(
          "grid gap-6",
          view === "grid" ? "grid-cols-2 sm:grid-cols-3" : "sm:grid-cols-2",
        )}
      >
        {products.map((product) => (
          <li key={product.id} className="grid">
            <ProductCard
              product={product}
              variant={view === "grid" ? "vertical" : "horizontal"}
            />
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default ProductList;
