import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReviewItem } from "../Review";
import { TProduct, TReview, TUser } from "@/types";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Pagination } from "@/components/ui/pagination";

type Props = {
  product: TProduct;
  reviews: (TReview & Pick<TUser, "firstName" | "lastName" | "image">)[];
  totalPages: number;
  totalReviews: number;
  ratingCounts: Record<number, number>;
};

const ProductTabs = ({
  product,
  reviews,
  totalPages,
  totalReviews,
  ratingCounts,
}: Props) => {
  const {
    brand,
    model,
    category,
    variants,
    dimensions,
    weight,
    description,
    rating,
  } = product;

  const tableData = [
    { title: "Brand", value: brand },
    { title: "Model", value: model },
    { title: "Category", value: category },
    {
      title: "Color",
      value: variants.map(({ colorName }) => colorName).join(",  "),
    },
    { title: "Dimensions", value: dimensions },
    { title: "Weight", value: weight + " g" },
  ];

  return (
    <Tabs defaultValue="description">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specification">Specification</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <p>{description}</p>
      </TabsContent>
      <TabsContent value="specification">
        <Table>
          <TableBody>
            {tableData.map(({ title, value }) => (
              <TableRow key={title} className="hover:bg-background text-base">
                <TableCell className="text-muted-foreground">{title}</TableCell>
                <TableCell className="font-medium">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
      <TabsContent value="reviews">
        <div className="grid items-start gap-x-16 gap-y-8 lg:grid-cols-2">
          <div className="flex gap-6 rounded-lg border p-4 lg:gap-8 lg:p-6">
            <div className="flex flex-col items-center gap-4">
              <span className="text-2xl font-bold">{rating}</span>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-center text-sm">
                  {totalReviews} reviews
                </span>
                <Rating initialRating={Number(rating)} disabled />
              </div>
              <Button variant="outline" size="sm">
                Write A Review
              </Button>
            </div>
            <ul className="flex grow flex-col gap-4">
              {Array.from({ length: 5 }, (_, i) => {
                const number = 5 - i;
                const sliderValue = (ratingCounts[number] * 100) / totalReviews;

                return (
                  <li key={number} className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Star className="fill-chart-4 size-4 stroke-0" />
                      <span>{number}</span>
                    </div>
                    <Progress
                      value={sliderValue}
                      className="*:data-[slot=progress-indicator]:bg-chart-4 grow"
                    />
                    <span>{ratingCounts[number]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-2 lg:gap-6">
            <ul className="divide-y">
              {reviews.map((review) => (
                <li key={review.id} className="first:*:pt-0">
                  <ReviewItem review={review} className="px-0" />
                </li>
              ))}
            </ul>
            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
