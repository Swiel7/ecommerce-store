import { Button } from "@/components/ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import Filters from "./Filters";
import { TFilterOption, TFilterOptionColor, TFilters } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  filters: {
    status: TFilterOption[];
    category: TFilterOption[];
    brand: TFilterOption[];
    color: TFilterOptionColor[];
  };
  searchParams: Record<
    TFilters | "page" | "sort",
    string | string[] | undefined
  >;
};

const MobileFilters = ({ filters, searchParams }: Props) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button>
            <FilterIcon /> Filter
          </Button>
        </SheetTrigger>
        <SheetContent className="w-80">
          <SheetHeader>
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <ScrollArea className="min-h-0 px-4">
            <Filters filters={filters} searchParams={searchParams} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
