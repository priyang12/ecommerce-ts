import { Helmet } from "react-helmet-async";
import {
  useLoadWishListQuery,
  useRemoveWishlistQuery,
} from "../../API/WishListAPI";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import {
  StyledHeading as Heading,
  StyledProduct as Product,
  StyledProductDescription as ProductDescription,
  StyledProductPrice as ProductPrice,
  StyledProducts as Products,
  StyledProductTitle as ProductTitle,
  StyledImgContainer as ImgContainer,
  StyledEmptyContainer as EmptyContainer,
} from "./StyledWishList";

/**
 * Wishlist Page Component
 *
 * Renders the user's wishlist, allowing them to view and remove products.
 * Fetches wishlist data from the backend using `useLoadWishListQuery`, and allows
 * product removal via `useRemoveWishlistQuery`.
 *
 * ## Route
 * - `/wishlist`
 *
 * ## UI Features
 * - Styled components via Linaria for clean, responsive design.
 * - Includes SEO-friendly metadata using `react-helmet-async`.
 * - Image container includes object-fit styling for consistent visuals.
 *
 * ## Accessibility
 * - Products are keyboard focusable (`tabIndex={0}`).
 * - Buttons have proper labels and interactions for screen readers.
 */
function Wishlist() {
  const { data: wishList, isFetched, isLoading } = useLoadWishListQuery();

  const {
    isError: DeleteError,
    isLoading: Deleting,
    isSuccess: DeleteSuccess,
    mutate: DeleteProduct,
    error,
  } = useRemoveWishlistQuery();

  if (isLoading || !isFetched) return <Spinner />;

  if (wishList?.products.length === 0 && isFetched) {
    return (
      <>
        <Helmet>
          <title>WishList</title>
          <meta name="description" content="WishList is currently empty" />
        </Helmet>
        <Heading>Wishlist</Heading>
        <EmptyContainer>
          <h1>No Products in WishList</h1>
        </EmptyContainer>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>WishList</title>
        <meta
          name="description"
          content={`
        WishList
        ${wishList?.products.map((product) => product.name)}
        `}
        />
      </Helmet>
      {DeleteError && (
        <AlertDisplay msg={error.msg} type={"error"}>
          <div>Server Problem Please try again later</div>
        </AlertDisplay>
      )}
      <Heading>Wishlist</Heading>
      {DeleteSuccess && <AlertDisplay msg={"Product Deleted"} type={"error"} />}
      {Deleting && <AlertDisplay msg="Deleting...." type={"warning"} />}
      <Products>
        {wishList?.products.map((product) => (
          <Product key={product._id} tabIndex={0}>
            <ProductTitle>{product.name}</ProductTitle>
            <ImgContainer>
              <img src={product.image} alt={product.name} />
            </ImgContainer>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>
              <span>$</span> {product.price}
            </ProductPrice>
            <button
              data-testid={`Delete-${product._id}`}
              className="btn"
              onClick={() => {
                DeleteProduct(product._id);
              }}
            >
              Delete
            </button>
          </Product>
        ))}
      </Products>
    </>
  );
}

export default Wishlist;
