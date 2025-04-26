import {
  Banners,
  BestDeal,
  Brands,
  Categories,
  FeaturedProducts,
  Hero,
  OnSaleProducts,
  Testimonials,
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
      <Testimonials />
    </>
  );
};

export default Home;
