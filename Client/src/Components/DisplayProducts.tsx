import { Product } from "../interfaces";
import ProductCard from "./ProductCard";
import { StyledDisplay, StyledProducts } from "./StyledComponents/Products";

type props = {
  Products: Product[];
  title: string;
};

const DisplayProducts = ({ Products, title }: props) => {
  if (!Products) return null;

  if (!Products.length) return <p>No products found</p>;

  return (
    <div>
      <StyledDisplay>
        <h1>{title}</h1>
        <StyledProducts id="Products">
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
