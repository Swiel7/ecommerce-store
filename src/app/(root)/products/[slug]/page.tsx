import { getProductBySlug } from "@/actions/products";
import { ProductDetails, ProductImages } from "@/components/shared/Product";
import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { cache } from "react";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  return { title: product?.name };
};

const SingleProduct = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  // const product = await getProductBySlug(slug);
  const product = await cache(() => getProductBySlug(slug))();

  // if (!product) notFound();
  if (!product) return <div>Product not found</div>;

  const items: TBreadcrumbsItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product?.name || "" },
  ];

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="space-y-16">
            <div className="grid gap-16 lg:grid-cols-2">
              <ProductImages product={product} />
              <ProductDetails product={product} />
            </div>
            {/* tabs */}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;
