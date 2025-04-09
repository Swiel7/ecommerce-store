import { ReviewItem } from "@/components/shared/Review";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/db";
import { reviews, users } from "@/db/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { cache } from "react";

const Testimonials = async () => {
  // const sq = db
  //   .selectDistinctOn([users.email], {
  //     ...getTableColumns(reviews),
  //     firstName: users.firstName,
  //     lastName: users.lastName,
  //     image: users.image,
  //   })
  //   .from(reviews)
  //   .innerJoin(users, eq(reviews.userId, users.id))
  //   .where(eq(reviews.rating, 5))
  //   .orderBy(users.email, desc(sql<number>`length(${reviews.description})`))
  //   .as("sq");

  // const testimonials = await db
  //   .select()
  //   .from(sq)
  //   .orderBy(desc(sql<number>`length(${sq.description})`))
  //   .limit(6)

  const getData = cache(async () => {
    const sq = db
      .selectDistinctOn([users.email], {
        ...getTableColumns(reviews),
        firstName: users.firstName,
        lastName: users.lastName,
        image: users.image,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.rating, 5))
      .orderBy(users.email, desc(sql<number>`length(${reviews.description})`))
      .as("sq");

    return await db
      .select()
      .from(sq)
      .orderBy(desc(sql<number>`length(${sq.description})`))
      .limit(6);
  });

  const testimonials = await getData();

  return (
    <section className="bg-muted pt-16 pb-10 lg:pt-20 lg:pb-14">
      <div className="wrapper">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 lg:pb-10">
            <h2 className="section-title pb-0">Our Happy Clients</h2>
            <div className="flex gap-4">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </div>
          <CarouselContent>
            {testimonials.map((review) => (
              <CarouselItem
                key={review.id}
                className="grid sm:basis-1/2 lg:basis-1/3"
              >
                <ReviewItem review={review} className="group" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
