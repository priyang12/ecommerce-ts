import { Product } from "../interfaces";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { StyledDisplay, StyledProducts } from "./StyledComponents/Products";

type props = {
  loading: boolean;
  Products: Product[];
  title: string;
};

const DisplayProducts = ({ loading, Products, title }: props) => {
  if (loading) return <Spinner />;

  if (!Products) return null;

  if (!Products.length) return <p>No products found</p>;

  return (
    <div>
      <StyledDisplay>
        <h1>{title}</h1>
        <StyledProducts>
          {Products &&
            Products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </StyledProducts>
      </StyledDisplay>
    </div>
  );
};

export default DisplayProducts;
