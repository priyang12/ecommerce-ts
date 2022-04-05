import AlertDisplay from "../Components/AlertDisplay";
import Carousel from "../Components/Carousel";
import DisplayProducts from "../Components/DisplayProducts";
import { useFetch } from "../Utils/CustomHooks";
import { StyledHome } from "./StyledPages/StyledHome";

const Home = () => {
  const [ProductsData, Err, loading] = useFetch("/api/products");

  if (Err) return <AlertDisplay msg={Err} type={false} />;

  return (
    <StyledHome>
      {/* <Carousel products={Products} /> */}
      <DisplayProducts
        Products={ProductsData?.products}
        loading={loading}
        title="Products Display"
      />
    </StyledHome>
  );
};

export default Home;
