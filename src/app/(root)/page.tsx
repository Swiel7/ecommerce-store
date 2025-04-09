import {
  Banners,
  BestDeal,
  Brands,
  Categories,
  FeaturedProducts,
  Features,
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
      <Features />
    </>
  );
};

export default Home;
