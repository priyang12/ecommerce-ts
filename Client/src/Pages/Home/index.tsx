import React from "react";
import { Helmet } from "react-helmet-async";
import { useProducts } from "../../API/ProductAPI";
import AlertDisplay from "../../Components/AlertDisplay";
import ProductCard from "../../Components/ProductCard";
import Spinner from "../../Components/Spinner";
import SearchBar from "../../Components/SearchBar";
import ErrorCatch from "../../Components/ErrorCatch";
import { StyledHeroContainer, StyledHero } from "./StyledHero";
import {
  StyledDisplay,
  StyledProducts,
} from "../../Components/StyledComponents/Products";
import type { Product } from "../../interfaces";
const Carousel = React.lazy(() => import("../../Components/Carousel"));

const Home = ({ title = "Products Display" }) => {
  const { data: ProductsData, error: Err, isLoading } = useProducts();

  if (isLoading) return <Spinner />;

  if (Err) return <AlertDisplay msg={Err.message} type={false} />;

  if (!ProductsData) return null;

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Products Page - Browse our products"
        />
      </Helmet>
      <SearchBar />
      <StyledHeroContainer>
        <StyledHero>
          <h1>Shop at your will</h1>
          <p>
            Why not browse our products and see what we have to offer. We have
            everything you need for your next adventure.
          </p>
        </StyledHero>
        <img src={require("../../Assets/vector.png")} alt="" width={400} />
      </StyledHeroContainer>
      <ErrorCatch>
        <React.Suspense fallback={<Spinner />}>
          <Carousel />
        </React.Suspense>
      </ErrorCatch>
      <StyledDisplay>
        <h1>{title}</h1>
        <StyledProducts>
          {ProductsData?.products.length > 0 ? (
            ProductsData?.products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))
          ) : (
            <p>No Products Found</p>
          )}
        </StyledProducts>
      </StyledDisplay>
    </>
  );
};

export default Home;
