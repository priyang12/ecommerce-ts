import { useProducts } from "../../API/ProductAPI";
import {
  StyledDisplay,
  StyledProducts,
} from "../../Components/StyledComponents/Products";
import AlertDisplay from "../../Components/AlertDisplay";
import ProductCard from "../../Components/ProductCard";
import Spinner from "../../Components/Spinner";

function DisplayProducts({ title }: { title?: string }) {
  const { data: ProductsData, error: Err, isLoading } = useProducts();

  if (isLoading) return <Spinner />;
  if (Err)
    return (
      <AlertDisplay AxiosErrorState={Err} msg="Server Error" type={"error"} />
    );

  if (!ProductsData) throw Error("No Products Data");

  return (
    <StyledDisplay>
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
