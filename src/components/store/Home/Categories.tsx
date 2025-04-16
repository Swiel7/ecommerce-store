import { getCategories } from "@/actions/products";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

const Categories = async () => {
  // const categories = await getCategories();
  const categories = await cache(getCategories)();

  return (
    <section>
      <div className="wrapper">
        <h2 className="section-title">Shop By Category</h2>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {categories.map(({ name, image, id }) => (
            <li key={id}>
              <Link
                href={`/products?category=${name.toLowerCase()}`}
                className="bg-muted grid gap-8 rounded-lg p-6"
              >
                <div className="relative aspect-square h-full">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                    alt="Category logo"
                    fill
                    className="mx-auto !w-auto object-contain"
                    sizes="(max-width: 500px) 100vw, (max-width: 740px) 50vw, (max-width: 990px) 33vw, (max-width: 1230px) 25vw, 20vw"
                  />
                </div>
                <span className="block text-center text-lg font-medium">
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
