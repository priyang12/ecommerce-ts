import { useNavigate, useParams } from "react-router-dom";
import { useSearchProduct } from "../../API/ProductAPI";
import { Helmet } from "react-helmet-async";
import { Pagination, PaginationButton } from "./Styled";
import SearchBar from "../../Components/SearchBar";
import ProductCard from "../../Components/ProductCard";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import { Product } from "../../Types/interfaces";
import {
  CardBoard,
  StyledDisplay,
} from "../../Components/UI/CardBoard/StyledCardBoard";
import { styled } from "@linaria/react";

const StyledProducts = styled(CardBoard)`
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: var(--bg-color-alpha);
  border: 1px solid rgba(255, 255, 255, 0.125);
  max-width: 80%;
  width: 100%;
`;

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

  if (isLoading) return <Spinner />;

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={"Something Went Wrong"} type={"error"} />;

  const NextPage = () => {
    Navigate(`/search/${keyword}/${page + 1}`);
  };
  const PreviousPage = () => {
    Navigate(`/search/${keyword}/${page - 1}`);
  };

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
      <StyledDisplay>
        <SearchBar searchedValue={keyword as string} />
        <h1>{`Search Results for ${keyword}`}</h1>
        {ProductData?.products.length > 0 ? (
          <StyledProducts id="Products">
            {ProductData?.products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </StyledProducts>
        ) : (
          <h1>No Products Found</h1>
        )}
      </StyledDisplay>

      {ProductData.pages > 1 && (
        <Pagination>
          {ProductData.page > 1 && (
            <PaginationButton active onClick={PreviousPage}>
              Previous
            </PaginationButton>
          )}
          {ProductData.pages !== page && (
            <PaginationButton active onClick={NextPage}>
              Next
            </PaginationButton>
          )}
        </Pagination>
      )}
    </>
  );
}

export default Search;
