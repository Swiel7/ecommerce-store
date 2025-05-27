import { ProductCard } from "@/components/shared/Product";

import { CardTitle } from "@/components/ui/card";
import { getProductsFromWishlist } from "@/lib/services/user";

export const metadata = { title: "Wishlist" };

const WishlistPage = async () => {
  const products = await getProductsFromWishlist();

  return (
    <section>
      <div className="wrapper">
        <CardTitle className="mb-6">Wishlist</CardTitle>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WishlistPage;
