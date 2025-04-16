"use client";

import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type Props = { totalPages: number } & React.ComponentProps<"nav">;

function Pagination({ className, totalPages, ...props }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  let visiblePages = pages;

  if (totalPages > maxVisiblePages) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1,
      ),
      1,
    );
    visiblePages = pages.slice(start - 1, start + maxVisiblePages - 1);
  }

  const setCurrentPage = (value: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", value.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    >
      <ul
        data-slot="pagination-content"
        className="flex flex-row items-center gap-1"
      >
        <PaginationPrevious
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {visiblePages[0] > 1 && (
          <>
            <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
            {visiblePages[0] > 2 && <PaginationEllipsis />}
          </>
        )}

        {visiblePages.map((page) => (
          <PaginationLink
            key={page}
            onClick={() => setCurrentPage(page)}
            isActive={currentPage === page ? true : false}
          >
            {page}
          </PaginationLink>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <PaginationEllipsis />
            )}
            <PaginationLink onClick={() => setCurrentPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </>
        )}

        <PaginationNext
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </ul>
    </nav>
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Button>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <li data-slot="pagination-item">
      <Button
        aria-current={isActive ? "page" : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        size={size}
        variant={isActive ? "outline" : "ghost"}
        className={className}
        {...props}
      />
    </li>
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <li data-slot="pagination-item">
      <span
        aria-hidden
        data-slot="pagination-ellipsis"
        className={cn("flex size-9 items-center justify-center", className)}
        {...props}
      >
        <MoreHorizontalIcon className="size-4" />
        <span className="sr-only">More pages</span>
      </span>
    </li>
  );
}

export { Pagination };
