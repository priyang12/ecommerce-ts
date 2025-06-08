import React, { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from "../../Components/Spinner";
import SearchBar from "../../Components/SearchBar";
import { StyledHeroContainer, StyledHero } from "./StyledHero";
import DisplayProducts from "./DisplayProducts";
import CarouselBoundary from "../../Components/Carousel/CarouselBoundary";

const Carousel = React.lazy(() => import("../../Components/Carousel/Carousel"));
const HeroImage = React.lazy(() => import("./HeroImage"));

const Home = () => {
  useEffect(() => {
    console.log("effect");
  }, []); // 🔥 should warn: missing dependency `count`

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Products Page - Browse our products"
        />
      </Helmet>
      <SearchBar searchedValue="" />
      <StyledHeroContainer>
        <StyledHero>
          <h1>Shop at your will</h1>
          <p>
            Why not browse our products and see what we have to offer. We have
            everything you need for your next adventure.
          </p>
        </StyledHero>
        <Suspense fallback={<Spinner />}>
          <HeroImage />
        </Suspense>
      </StyledHeroContainer>
      <CarouselBoundary>
        <React.Suspense fallback={<Spinner />}>
          <Carousel />
        </React.Suspense>
      </CarouselBoundary>
      <DisplayProducts title="Products Display" />
    </>
  );
};

export default Home;
