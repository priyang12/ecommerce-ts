import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Spinner from "../../Components/Spinner";
import SearchBar from "../../Components/SearchBar";
import DisplayProducts from "./DisplayProducts";
import CarouselBoundary from "../../Components/Carousel/CarouselBoundary";
import {
  StyledHeroContainer,
  StyledHero,
  StyledHeroImgContainer,
} from "./StyledHero";

const Carousel = React.lazy(() => import("../../Components/Carousel/Carousel"));
const HeroImage = React.lazy(() => import("./HeroImage"));

const info = {
  tagline: "Adventure Starts Here.",
  para: "Discover top-quality gear, curated essentials, and exciting deals for your next journey. Whether you're hiking, traveling, or just exploring — we've got you covered.",
  cta: {
    label: "Shop Now",
    href: "#Products",
  },
  features: [
    "Free Shipping over $50 ✔️",
    "24/7 Customer Support ✔️",
    "Easy 30-day Returns ✔️",
  ],
};

function HeroComponent() {
  return (
    <StyledHeroContainer>
      <StyledHero>
        <h1>{info.tagline}</h1>
        <p>{info.para}</p>
        <div>
          <a href={info.cta.href}>{info.cta.label}</a>
        </div>
        <ul>
          {info.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </StyledHero>
      <StyledHeroImgContainer>
        <Suspense fallback={<Spinner />}>
          <HeroImage />
        </Suspense>
      </StyledHeroImgContainer>
    </StyledHeroContainer>
  );
}

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
      <HeroComponent />
      <CarouselBoundary>
        <React.Suspense fallback={<Spinner />}>
          <Carousel />
        </React.Suspense>
      </CarouselBoundary>
      <DisplayProducts title="Top Products" />
    </>
  );
};

export default Home;
