import { useEffect, useState } from "react";
import { LoadWishListQuery, RemoveWishlistQuery } from "../../API/WishListAPI";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import { Product } from "../../interfaces";
import {
  StyledHeading,
  StyledProduct,
  StyledProductDescription,
  StyledProductPrice,
  StyledProducts,
  StyledProductTitle,
} from "./StyledWishList";

function Wishlist() {
  const [Products, setProducts] = useState([]);

  const { WishList, isFetched, isLoading } = LoadWishListQuery();
  const {
    data: deleteResult,
    isError,
    isLoading: Deleting,
    isSuccess,
    mutate: DeleteProduct,
    error,
  } = RemoveWishlistQuery();
  useEffect(() => {
    setProducts(WishList);
  }, [WishList]);

  if (isLoading || !isFetched) {
    return <Spinner />;
  }

  if (Products?.length === 0) {
    return <div>No Products in WishList</div>;
  }
  if (isError) {
    return (
      <AlertDisplay msg={error.msg} type={false}>
        <div>Server Problem Please try again later</div>
      </AlertDisplay>
    );
  }
  return (
    <div>
      <StyledHeading>Wishlist</StyledHeading>
      {isSuccess && <AlertDisplay msg={deleteResult.msg} type={false} />}
      {Deleting && <AlertDisplay msg="Deleting...." type={true} />}
      <StyledProducts>
        {Products.map((product: Product) => (
          <StyledProduct key={product._id}>
            <StyledProductTitle>{product.name}</StyledProductTitle>
            <StyledProductDescription>
              {product.description}
            </StyledProductDescription>
            <img src={product.image} alt={product.name} />
            <StyledProductPrice>{product.price}</StyledProductPrice>
            <button
              data-testid={`Delete-${product._id}`}
              className="btn btn-light"
              onClick={() => {
                DeleteProduct(product._id);
              }}
            >
              Delete
            </button>
          </StyledProduct>
        ))}
      </StyledProducts>
    </div>
  );
}

export default Wishlist;
