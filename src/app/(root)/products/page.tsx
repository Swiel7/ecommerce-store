import { getFilters } from "@/actions/filters";
import { getFilteredProducts } from "@/actions/products";
import { Filters, ProductList } from "@/components/shared/Product";
import SectionBreadcrumb, {
  BreadcrumbsItemType,
} from "@/components/shared/SectionBreadcrumb";
import { sortValues } from "@/data";
import { formQueryString } from "@/lib/utils";
import { TFilters, TSortValue } from "@/types";
import { redirect } from "next/navigation";
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
  const { page = "1", sort = "default", ...rest } = searchParams;

  console.log(page, sort);
  if (!sortValues.includes(sort as TSortValue)) {
    redirect(
      formQueryString(searchParams as Record<string, string>, [
        { key: "sort", value: "default" },
      ]),
    );
  }

  const { products, totalPages, totalProducts } = await cache(() =>
    getFilteredProducts({ page, sort, ...rest }),
  )();
  // const { products, totalPages, totalProducts } = await getFilteredProducts({
  //   page,
  //   sort,
  //   ...rest,
  // });

  if (!(Number(page) > 0 && Number(page) <= totalPages)) {
    redirect(
      formQueryString(searchParams as Record<string, string>, [
        { key: "page", value: "1" },
      ]),
    );
  }

  const filters = await cache(getFilters)();
  // const filters = await getFilters();

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-10 xl:gap-16">
            <div className="w-full max-w-[300px] not-lg:hidden">
              <Filters
                filters={filters}
                searchParams={{ page, sort, ...rest }}
              />
            </div>
            <ProductList
              products={products}
              totalProducts={totalProducts}
              totalPages={totalPages}
              searchParams={{ page, sort, ...rest }}
              filters={filters}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
