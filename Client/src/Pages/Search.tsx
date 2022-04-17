import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { StyledHome } from "./StyledPages/StyledHome";
import AlertDisplay from "../Components/AlertDisplay";
import DisplayProducts from "../Components/DisplayProducts";
import Spinner from "../Components/Spinner";
import { useQuery } from "react-query";
import { SearchProduct } from "../API/ProductAPI";
import { Helmet } from "react-helmet";

const Home = () => {
  const { keyword, pageNumber }: any = useParams();
  const page = pageNumber ? pageNumber : 1;

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

  return (
    <StyledHome>
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
        <div className="pagination">
          {ProductData.page !== 1 && (
            <button
              className="pagination-button"
              onClick={() => {
                if (page > 1) {
                  <Link
                    to={`/products?keyword=${keyword}&page=${page - 1}`}
                    rel={"prev"}
                  />;
                }
              }}
            >
              Previous
            </button>
          )}

          <button
            className="pagination-button"
            onClick={() => {
              if (page < ProductData.pages) {
                <Link to={`/products?keyword=${keyword}&page=${page + 1}`} />;
              }
            }}
          >
            Next
          </button>
        </div>
      )}
    </StyledHome>
  );
};

export default Home;
