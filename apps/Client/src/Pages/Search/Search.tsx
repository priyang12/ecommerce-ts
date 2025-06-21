import { useNavigate, useParams } from "react-router-dom";
import { useSearchProduct } from "../../API/ProductAPI";
import { Helmet } from "react-helmet-async";
import {
  Pagination,
  PaginationButton,
  StyledHeader,
  StyledNoProducts,
  StyledDisplay,
  StyledProducts,
} from "./Styled";
import SearchBar from "../../Components/SearchBar";
import ProductCard from "../../Components/ProductCard";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import { Product } from "../../Types/interfaces";

/**
 * Search Page Component
 *
 * This component renders the search results for a given keyword and optional page number.
 * It supports pagination, displays product cards, and shows loading or error states appropriately.
 *
 * ## Route
 * - `/search/:keyword`
 * - `/search/:keyword/:pageNumber`
 *
 * ## Params
 * - `keyword` (string): The term used to search for products.
 * - `pageNumber` (string): Optional page number for pagination (defaults to 1).
 *
 * ## Conditional Rendering
 * - Shows `<ProductCard />` components for each search result.
 * - Renders "No Products Found" message when the result list is empty.
 * - Displays pagination controls if there are multiple pages.
 */
function Search() {
  const { keyword, pageNumber } = useParams<{
    keyword: string;
    pageNumber: string;
  }>();
  const page: number = pageNumber ? parseInt(pageNumber) : 1;
  const Url = pageNumber
    ? `?keyword=${keyword}&page=${pageNumber}`
    : `?keyword=${keyword}`;

  const Navigate = useNavigate();

  const { data: ProductData, isLoading, error: Err } = useSearchProduct(Url);

  const productsLength = ProductData?.products.length;

  const NextPage = () => {
    Navigate(`/search/${keyword}/${page + 1}`);
  };
  const PreviousPage = () => {
    Navigate(`/search/${keyword}/${page - 1}`);
  };

  if (isLoading) return <Spinner />;

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={"Something Went Wrong"} type={"error"} />;

  if (!keyword) Navigate("/");

  return (
    <>
      <Helmet>
        <title>{keyword}</title>
        <meta
          name="description"
          content={`${keyword} - ${ProductData.products.length} results"`}
        />
      </Helmet>
      <StyledDisplay
        style={{
          minHeight: productsLength && productsLength > 0 ? "150vh" : "100vh",
        }}
      >
        <SearchBar searchedValue={keyword as string} />
        <StyledHeader>
          {ProductData.page > 1 ? (
            <PaginationButton tabIndex={0} onClick={PreviousPage}>
              Previous
            </PaginationButton>
          ) : null}
          <h1>{`Search Results for ${keyword}`}</h1>
          {ProductData.pages !== page ? (
            <PaginationButton tabIndex={0} onClick={NextPage}>
              Next
            </PaginationButton>
          ) : null}
        </StyledHeader>
        {productsLength ? (
          <StyledProducts id="Products">
            {ProductData?.products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </StyledProducts>
        ) : (
          <StyledNoProducts>
            <h2>No Products Found</h2>
          </StyledNoProducts>
        )}
      </StyledDisplay>

      {ProductData.pages > 1 && (
        <Pagination>
          {ProductData.page > 1 && (
            <PaginationButton tabIndex={0} onClick={PreviousPage}>
              Previous
            </PaginationButton>
          )}
          {ProductData.pages !== page && (
            <PaginationButton tabIndex={0} onClick={NextPage}>
              Next
            </PaginationButton>
          )}
        </Pagination>
      )}
    </>
  );
}

export default Search;
