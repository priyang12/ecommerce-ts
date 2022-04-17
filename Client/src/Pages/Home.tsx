import React from "react";
import { useQuery } from "react-query";
import AlertDisplay from "../Components/AlertDisplay";
import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import { StyledHome } from "./StyledPages/StyledHome";
import { LoadProducts } from "../API/ProductAPI";
import {
  StyledDisplay,
  StyledProducts,
} from "../Components/StyledComponents/Products";
import type { Product } from "../interfaces";

const Carousel = React.lazy(() => import("../Components/Carousel"));

const Home = ({ title = "Products Display" }) => {
  const {
    data: ProductsData,
    error: Err,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useQuery(
    ["products"],
    LoadProducts
  );

  if (isLoading) return <Spinner />;

  if (Err) return <AlertDisplay msg={Err} type={false} />;

  if (!ProductsData) return null;

  return (
    <StyledHome>
      <React.Suspense fallback={<Spinner />}>
        <Carousel products={ProductsData?.products.slice(0, 4)} />
      </React.Suspense>
      <StyledDisplay>
        <h1>{title}</h1>
        <StyledProducts>
          {ProductsData?.products &&
            ProductsData?.products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </StyledProducts>
      </StyledDisplay>
    </StyledHome>
  );
};

export default Home;
