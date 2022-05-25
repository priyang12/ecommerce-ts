import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { SearchProduct } from "../../API/ProductAPI";
import { Helmet } from "react-helmet";
import AlertDisplay from "../../Components/AlertDisplay";
import DisplayProducts from "../../Components/DisplayProducts";
import Spinner from "../../Components/Spinner";
import { Pagination, PaginationButton } from "./Styled";

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
  } = useQuery([`Search/${Url}`, { Url }], SearchProduct, {});

  if (isLoading) return <Spinner />;

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={"Something Went Wrong"} type={false} />;
  const NextPage = () => {
    history.push(`/search/name=${keyword}/${page + 1}`);
  };
  const PreviousPage = () => {
    history.push(`/search/name=${keyword}/${page - 1}`);
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

      <DisplayProducts
        Products={ProductData?.products}
        title={`Search Results for ${keyword}`}
      />
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
