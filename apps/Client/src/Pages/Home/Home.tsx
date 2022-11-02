import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from "../../Components/Spinner";
import SearchBar from "../../Components/SearchBar";
import ErrorCatch from "../../Components/ErrorCatch";
import { StyledHeroContainer, StyledHero } from "./StyledHero";
import DisplayProducts from "./DisplayProducts";

const Carousel = React.lazy(() => import("../../Components/Carousel"));
const HeroImage = React.lazy(() => import("./HeroImage"));

const Home = () => {
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
      <ErrorCatch>
        <React.Suspense fallback={<Spinner />}>
          <Carousel />
        </React.Suspense>
      </ErrorCatch>
      <DisplayProducts title="Products Display" />
    </>
  );
};

export default Home;
