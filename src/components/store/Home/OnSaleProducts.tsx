import { getOnSaleProducts } from "@/actions/products";
import { ProductCard } from "@/components/shared/Product";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cache } from "react";

const OnSaleProducts = async () => {
  // const onSaleProducts = await getOnSaleProducts();
  const onSaleProducts = await cache(getOnSaleProducts)();

  return (
    <section className="pb-16 lg:pb-20">
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
          <h2 className="section-title pb-0">On Sale Products</h2>
          <Button variant="link" className="font-medium" asChild>
            <Link href="/products?status=Featured">
              View All <ArrowRight />
            </Link>
          </Button>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {onSaleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OnSaleProducts;
