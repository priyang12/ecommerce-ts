import React from "react";
import AlertDisplay from "../Components/AlertDisplay";
import DisplayProducts from "../Components/DisplayProducts";
import Spinner from "../Components/Spinner";
import { useFetch } from "../Utils/CustomHooks";
import { StyledHome } from "./StyledPages/StyledHome";

const Carousel = React.lazy(() => import("../Components/Carousel"));

const Home = () => {
  const [ProductsData, Err, loading] = useFetch("/api/products");

  if (loading) return <Spinner />;

  if (Err) return <AlertDisplay msg={Err} type={false} />;

  if (!ProductsData) return null;

  return (
    <StyledHome>
      <React.Suspense fallback={<Spinner />}>
        <Carousel products={ProductsData.products.slice(0, 4)} />
      </React.Suspense>
      <DisplayProducts
        Products={ProductsData?.products}
        title="Products Display"
      />
    </StyledHome>
  );
};

export default Home;
