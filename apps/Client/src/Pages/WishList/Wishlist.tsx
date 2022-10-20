import {
  useLoadWishListQuery,
  useRemoveWishlistQuery,
} from "../../API/WishListAPI";
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
  const { WishList, isFetched, isLoading } = useLoadWishListQuery();
  const {
    isError: DeleteError,
    isLoading: Deleting,
    isSuccess: DeleteSuccess,
    mutate: DeleteProduct,
    error,
  } = useRemoveWishlistQuery();

  if (isLoading || !isFetched) {
    return <Spinner />;
  }

  if (WishList?.length === 0 && isFetched) {
    return <div>No Products in WishList</div>;
  }

  return (
    <div>
      {DeleteError && (
        <AlertDisplay msg={error.msg} type={"error"}>
          <div>Server Problem Please try again later</div>
        </AlertDisplay>
      )}
      <StyledHeading>Wishlist</StyledHeading>
      {DeleteSuccess && (
        <AlertDisplay msg={"Product Deleted"} type={"warning"} />
      )}
      {Deleting && <AlertDisplay msg="Deleting...." type={"warning"} />}
      <StyledProducts>
        {WishList.map((product: Product) => (
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
