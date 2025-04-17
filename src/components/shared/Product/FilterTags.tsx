import { TFilterOption, TFilterOptionColor, TFilters } from "@/types";
import { useRouter } from "next/navigation";

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

const FilterTags = ({ filters, searchParams }: Props) => {
  const router = useRouter();

  const removeFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.delete(key, value);
    router.push(`?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    Object.keys(filters).forEach((key) => params.delete(key));
    router.push(`?${params.toString()}`);
  };

  return;
};

export default FilterTags;
