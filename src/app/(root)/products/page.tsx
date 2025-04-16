import { getFilters } from "@/actions/filters";
import { getFilteredProducts } from "@/actions/products";
import { Filters, ProductList } from "@/components/shared/Product";
import SectionBreadcrumb, {
  BreadcrumbsItemType,
} from "@/components/shared/SectionBreadcrumb";
import { TFilters } from "@/types";
import { cache } from "react";

export const metadata = { title: "Products" };

const items: BreadcrumbsItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products" },
];

type SearchParams = Promise<
  Record<TFilters | "page" | "sort", string | string[] | undefined>
>;

const Products = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  // const filters = await getFilters();
  const filters = await cache(getFilters)();
  // const data = await getFilteredProducts(searchParams);
  const data = await cache(() => getFilteredProducts(searchParams))();

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-16">
            <div className="w-full max-w-[300px]">
              <Filters filters={filters} searchParams={searchParams} />
            </div>
            <ProductList {...data} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
