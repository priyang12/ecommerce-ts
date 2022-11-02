import { Helmet } from "react-helmet-async";
import {
  useLoadWishListQuery,
  useRemoveWishlistQuery,
} from "../../API/WishListAPI";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import {
  StyledHeading,
  StyledProduct,
  StyledProductDescription,
  StyledProductPrice,
  StyledProducts,
  StyledProductTitle,
} from "./StyledWishList";

function Wishlist() {
  const { data: WishList, isFetched, isLoading } = useLoadWishListQuery();
  const {
    isError: DeleteError,
    isLoading: Deleting,
    isSuccess: DeleteSuccess,
    mutate: DeleteProduct,
    error,
  } = useRemoveWishlistQuery();

  if (isLoading || !isFetched) return <Spinner />;

  if (WishList?.products.length === 0 && isFetched) {
    return <div>No Products in WishList</div>;
  }

  return (
    <>
      <Helmet>
        <title>WishList</title>
        <meta
          name="description"
          content={`
        WishList
        ${WishList?.products.map((product) => product.name)}
        `}
        />
      </Helmet>
      {DeleteError && (
        <AlertDisplay msg={error.msg} type={"error"}>
          <div>Server Problem Please try again later</div>
        </AlertDisplay>
      )}
      <StyledHeading>Wishlist</StyledHeading>
      {DeleteSuccess && <AlertDisplay msg={"Product Deleted"} type={"error"} />}
      {Deleting && <AlertDisplay msg="Deleting...." type={"warning"} />}
      <StyledProducts>
        {WishList?.products.map((product) => (
          <StyledProduct key={product._id} tabIndex={0}>
            <StyledProductTitle>{product.name}</StyledProductTitle>
            <StyledProductDescription>
              {product.description}
            </StyledProductDescription>
            <img src={product.image} alt={product.name} />
            <StyledProductPrice>
              <span>$</span> {product.price}
            </StyledProductPrice>
            <button
              data-testid={`Delete-${product._id}`}
              className="btn"
              onClick={() => {
                DeleteProduct(product._id);
              }}
            >
              Delete
            </button>
          </StyledProduct>
        ))}
      </StyledProducts>
    </>
  );
}

export default Wishlist;
