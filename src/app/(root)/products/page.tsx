import { getFilters } from "@/actions/filters";
import { Filters } from "@/components/shared/Product";
import SectionBreadcrumb, {
  BreadcrumbsItemType,
} from "@/components/shared/SectionBreadcrumb";
import { cache } from "react";

export const metadata = { title: "Products" };

const items: BreadcrumbsItemType[] = [
  { label: "Home", href: "/" },
  { label: "Products" },
];

const Products = async () => {
  // const filters = await getFilters();
  const filters = await cache(getFilters)();

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="flex gap-16">
            <div className="w-full max-w-[300px]">
              <Filters filters={filters} />
            </div>
            <div className="flex grow flex-col gap-12">
              header
              {/* header */}
              {/* grid */}
              {/* paginacja */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
