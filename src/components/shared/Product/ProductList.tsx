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
import { TProduct, TSortValue } from "@/types";
import { LayoutGrid, LayoutList } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";

type Props = {
  products: TProduct[];
  totalPages: number;
  totalProducts: number;
};

const sortValues = sortOptions.map(({ value }) => value);

const ProductList = ({ products, totalPages, totalProducts }: Props) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "default";
  const currentPage = Number(searchParams.get("page") || "1");

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex grow flex-col gap-12">
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
        <Select
          value={sortValues.includes(sort as TSortValue) ? sort : "default"}
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
      {/* tags */}

      {/* grid */}
      <ul className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default ProductList;
