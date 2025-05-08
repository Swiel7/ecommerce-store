import { getCategories } from "@/actions/product";
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
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map(({ name, image, id }) => (
            <li key={id}>
              <Link
                href={`/products?category=${name.toLowerCase()}`}
                className="bg-muted block rounded-lg py-6"
              >
                <div className="relative mx-auto aspect-square w-[80%]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}${image}`}
                    alt="Category logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 500px) 100vw, (max-width: 740px) 50vw, (max-width: 990px) 33vw, (max-width: 1230px) 25vw, 20vw"
                  />
                </div>
                <span className="block pt-8 text-center font-medium lg:text-lg">
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
