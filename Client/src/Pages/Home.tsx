import { useQuery } from "react-query";
import AlertDisplay from "../Components/AlertDisplay";
import Carousel from "../Components/Carousel";
import ProductCard from "../Components/ProductCard";
import { Product } from "../interfaces";
import Spinner from "../Components/Spinner";
import {
  StyledDisplay,
  StyledProducts,
} from "../Components/StyledComponents/Products";
import { StyledHome } from "./StyledPages/StyledHome";
import { LoadProducts } from "../API/ProductAPI";

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
      <Carousel products={ProductsData.products.slice(0, 4)} />
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
