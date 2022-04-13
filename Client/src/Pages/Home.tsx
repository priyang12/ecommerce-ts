import AlertDisplay from "../Components/AlertDisplay";
import Carousel from "../Components/Carousel";
import DisplayProducts from "../Components/DisplayProducts";
import Spinner from "../Components/Spinner";
import { useFetch } from "../Utils/CustomHooks";
import { StyledHome } from "./StyledPages/StyledHome";

const Home = () => {
  const [ProductsData, Err, loading] = useFetch("/api/products");

  if (loading) return <Spinner />;

  if (Err) return <AlertDisplay msg={Err} type={false} />;

  if (!ProductsData) return null;

  return (
    <StyledHome>
      <Carousel products={ProductsData.products.slice(0, 3)} />
      <DisplayProducts
        Products={ProductsData?.products}
        title="Products Display"
      />
    </StyledHome>
  );
};

export default Home;
