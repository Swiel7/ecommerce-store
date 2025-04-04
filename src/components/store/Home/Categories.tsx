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
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {data.map(({ name, image, id }) => (
            <li key={id}>
              <Link href={}></Link>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                alt="Category logo"
                fill
              />
              {/* <IKImage
                  // path={image as string}
                  alt="Category logo"
                  // fill
                  loading="lazy"
                  // lqip={{ active: true }}
                  // className="rounded-sm object-fill"
                  // urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                /> */}
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
