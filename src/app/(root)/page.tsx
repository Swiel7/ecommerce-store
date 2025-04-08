import {
  Banners,
  BestDeal,
  Brands,
  Categories,
  FeaturedProducts,
  Hero,
  OnSaleProducts,
} from "@/components/store/Home";

const Home = () => {
  return (
    <>
      <Hero />
      <Brands />
      <Categories />
      <Banners />
      <FeaturedProducts />
      <BestDeal />
      <OnSaleProducts />
    </>
  );
};

export default Home;
