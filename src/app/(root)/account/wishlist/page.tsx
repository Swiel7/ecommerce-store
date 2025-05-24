import { ProductCard } from "@/components/shared/Product";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProductsFromWishlist } from "@/lib/services/user";

export const metadata = { title: "Wishlist" };

const WishlistPage = async () => {
  const products = await getProductsFromWishlist();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WishlistPage;
