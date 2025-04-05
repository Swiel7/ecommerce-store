import { db } from "@/db";
import { categories } from "@/db/schema";
import { isNotNull } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const data = await db
    .select()
    .from(categories)
    .where(isNotNull(categories.image));

  return (
    <section>
      <div className="wrapper">
        <h2 className="section-title">Shop By Category</h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {data.map(({ name, image, id }) => (
            <li key={id}>
              <Link
                href={`/products?category=${name.toLowerCase()}`}
                className="bg-muted grid justify-items-start gap-8 rounded-lg p-6"
              >
                <div className="aspect-square w-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                    alt="Category logo"
                    fill
                    className="!static mx-auto !w-auto object-contain"
                  />
                </div>
                <span className="inline-block rounded-lg bg-white px-8 py-4 font-medium">
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
