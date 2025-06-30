import { styled } from "@linaria/react";
import { useProducts } from "../../API/ProductAPI";
import AlertDisplay from "../../Components/AlertDisplay";
import ProductCard from "../../Components/ProductCard";
import Spinner from "../../Components/Spinner";
import { CardBoard } from "../../Components/UI/CardBoard/StyledCardBoard";

const StyledDisplay = styled.section`
  text-align: center;
  color: var(--text-primary);
  background-color: var(--bg-contrast);
  background: url("./images/haikei.svg") repeat center/cover;
  margin: 0;
  margin-bottom: 1rem;
  min-height: 150vh;
  h1 {
    margin: 0;
    padding: 1rem;
  }
`;

const StyledProducts = styled(CardBoard)`
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: var(--bg-color-alpha);
  border: 1px solid rgba(255, 255, 255, 0.125);
  max-width: 80%;
  width: 100%;
  padding: 5%;
  box-sizing: border-box;
`;

function DisplayProducts({ title }: { title?: string }) {
  const { data: ProductsData, error: Err, isLoading } = useProducts();
  if (isLoading) return <Spinner />;
  if (Err)
    return (
      <AlertDisplay AxiosErrorState={Err} msg="Server Error" type={"error"} />
    );
  if (!ProductsData) throw Error("No Products Data");
  return (
    <StyledDisplay id="Products">
      <h1>{title}</h1>
      <StyledProducts>
        {ProductsData?.products.length > 0 ? (
          ProductsData?.products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </StyledProducts>
    </StyledDisplay>
  );
}

export default DisplayProducts;
