import React from "react";
import Header from "../components/Layout/Header";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import useGetCart from "../utils/useGetCart";
import useGetWishlist from "../utils/useGetWishlist";
import HeroCarousel from "../components/Route/Hero/HeroCarousel";

const HomePage = () => {
  const wishlist = useGetWishlist();
  const cart = useGetCart();

  return (
    <div>
      <Header activeHeading={1} />
      {/* <Hero /> */}
      <HeroCarousel />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
