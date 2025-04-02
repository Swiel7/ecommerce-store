import Image from "next/image";
import * as brands from "public/brands";

const Brands = () => {
  return (
    <section className="pt-4 max-lg:pb-2 lg:pt-6">
      <div className="wrapper">
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from(Object.values(brands)).map((brand, index) => (
            <li key={index}>
              <Image src={brand} alt="Brand logo" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;
