import {
  getRatingCounts,
  getReviewsByProductId,
  getReviewsCount,
} from "@/lib/services/review";
import {
  ProductDetails,
  ProductImages,
  ProductTabs,
} from "@/components/shared/Product";
import SectionBreadcrumb, {
  TBreadcrumbsItem,
} from "@/components/shared/SectionBreadcrumb";
import { FeaturedProducts } from "@/components/store/Home";
import { REVIEWS_PER_PAGE } from "@/lib/constants";
import { cache } from "react";
import { getProductBySlug } from "@/lib/services/product";

export const generateMetadata = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  return { title: product?.name };
};

const SingleProduct = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { slug } = await props.params;
  const { page } = await props.searchParams;
  // const product = await getProductBySlug(slug);
  const product = await cache(() => getProductBySlug(slug))();

  // if (!product) notFound();
  if (!product) return <div>Product not found</div>;
  // const reviews = await getReviewsByProductSlug(slug);
  const [reviews, { totalPages, totalReviews }, ratingCounts] = await cache(
    () =>
      Promise.all([
        getReviewsByProductId(product.id, Number(page) || 1, REVIEWS_PER_PAGE),
        getReviewsCount(product.id),
        getRatingCounts(product.id),
      ]),
  )();

  const items: TBreadcrumbsItem[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  return (
    <>
      <SectionBreadcrumb items={items} />
      <section>
        <div className="wrapper">
          <div className="space-y-8 lg:space-y-16">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              <ProductImages product={product} />
              <ProductDetails product={product} />
            </div>
            <ProductTabs
              product={product}
              reviews={reviews}
              totalPages={totalPages}
              totalReviews={totalReviews}
              ratingCounts={ratingCounts}
            />
          </div>
        </div>
      </section>
      <FeaturedProducts />
    </>
  );
};

export default SingleProduct;
