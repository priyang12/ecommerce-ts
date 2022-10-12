import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
const Home = () => {
  const { keyword, pageNumber }: any = useParams();
  const page: number = pageNumber ? parseInt(pageNumber) : 1;

  const history = useHistory();
  const [Url, setUrl] = useState(
    pageNumber
      ? `?keyword=${keyword}&page=${pageNumber}`
      : `?keyword=${keyword}`
  );

  useEffect(() => {
    if (pageNumber) setUrl(`?keyword=${keyword}&page=${pageNumber}`);
    else setUrl(`?keyword=${keyword}`);
  }, [keyword, pageNumber]);

  const {
    data: ProductData,
    isLoading,
    error: Err,
  }: {
    data: any;
    isLoading: boolean;
    error: any;
  } = useSearchProduct(Url);

  if (isLoading) return <Spinner />;

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={"Something Went Wrong"} type={false} />;
  const NextPage = () => {
    history.push(`/search/name=${keyword}/${page + 1}`);
  };
  const PreviousPage = () => {
    history.push(`/search/name=${keyword}/${page - 1}`);
  };

  if (ProductData?.products?.length === 0)
    return (
      <StyledDisplay>
        <h1>No Products Found</h1>
      </StyledDisplay>
    );
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
        <h1>{`Search Results for ${keyword}`}</h1>
        <SearchBar />
        <StyledProducts id="Products">
          {ProductData?.products &&
            ProductData?.products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
        </StyledProducts>
      </StyledDisplay>

      {ProductData.pages > 1 && (
        <Pagination>
          {parseInt(ProductData.page) > 1 && (
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
};

export default Home;
