import { getFilters } from "@/actions/filters";
import { getFilteredProducts } from "@/actions/products";
import { Filters, ProductList } from "@/components/shared/Product";
import SectionBreadcrumb, {
  BreadcrumbsItemType,
} from "@/components/shared/SectionBreadcrumb";
import { getFilterSearchParams } from "@/lib/utils";
import { TFilterURLSearchParams } from "@/types";
import { cache } from "react";

export const metadata = { title: "Products" };

const items: BreadcrumbsItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products" },
];

const Products = async (props: {
  searchParams: Promise<TFilterURLSearchParams>;
}) => {
  const searchParams = getFilterSearchParams(await props.searchParams);

  // const  {products,total,totalPages} = await getFilteredProducts(searchParams);
  const { products, total, totalPages } = await cache(() =>
    getFilteredProducts(searchParams),
  )();
  const filters = await cache(() => getFilters(searchParams))();

  // const filters = await getFilters(searchParams);

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-10 xl:gap-16">
            <div className="w-full max-w-[300px] not-lg:hidden">
              <Filters filters={filters} />
            </div>
            <ProductList
              products={products}
              totalProducts={total}
              totalPages={totalPages}
              filters={filters}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
