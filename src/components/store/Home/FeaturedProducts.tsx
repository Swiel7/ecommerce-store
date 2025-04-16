import { getFeaturedProducts } from "@/actions/products";
import { ProductCard } from "@/components/shared/Product";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cache } from "react";

const FeaturedProducts = async () => {
  // const featuredProducts = await getFeaturedProducts();
  const featuredProducts = await cache(getFeaturedProducts)();

  return (
    <section>
      <div className="wrapper">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
          <h2 className="section-title pb-0">Featured Products</h2>
          <Button variant="link" className="font-medium" asChild>
            <Link href="/products?status=Featured">
              View All <ArrowRight />
            </Link>
          </Button>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProducts;
