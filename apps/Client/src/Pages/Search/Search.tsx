import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchProduct } from "../../API/ProductAPI";
import { Helmet } from "react-helmet-async";
import { Pagination, PaginationButton } from "./Styled";
import SearchBar from "../../Components/SearchBar";
import {
  StyledDisplay,
  StyledProducts,
} from "../../Components/StyledComponents/Products";
import ProductCard from "../../Components/ProductCard";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import { Product } from "../../interfaces";

function Home() {
  const { keyword, pageNumber }: any = useParams();
  const page: number = pageNumber ? parseInt(pageNumber) : 1;

  const Navigate = useNavigate();
  const [Url, setUrl] = useState(
    pageNumber
      ? `?keyword=${keyword}&page=${pageNumber}`
      : `?keyword=${keyword}`
  );

  useEffect(() => {
    if (pageNumber) setUrl(`?keyword=${keyword}&page=${pageNumber}`);
    else setUrl(`?keyword=${keyword}`);
  }, [keyword, pageNumber]);

  const { data: ProductData, isLoading, error: Err } = useSearchProduct(Url);

  if (isLoading) return <Spinner />;

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={"Something Went Wrong"} type={false} />;
  const NextPage = () => {
    Navigate(`/search/name=${keyword}/${page + 1}`);
  };
  const PreviousPage = () => {
    Navigate(`/search/name=${keyword}/${page - 1}`);
  };

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
        <SearchBar searchedValue={keyword} />
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

export default Home;
