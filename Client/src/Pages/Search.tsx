import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../Utils/CustomHooks";
import { StyledHome } from "./StyledPages/StyledHome";
import AlertDisplay from "../Components/AlertDisplay";
import DisplayProducts from "../Components/DisplayProducts";

const Home = () => {
  const { keyword, pageNumber }: any = useParams();
  const page = pageNumber ? pageNumber : 1;

  const [Url, setUrl] = useState("");

  useEffect(() => {
    if (pageNumber)
      setUrl(`/api/products?keyword=${keyword}&page=${pageNumber}`);
    else setUrl(`/api/products?keyword=${keyword}`);
  }, [keyword, pageNumber]);

  const [ProductData, Err, loading] = useFetch(Url);

  if (!ProductData) return null;

  if (Err) return <AlertDisplay msg={Err} type={false} />;

  return (
    <StyledHome>
      <DisplayProducts
        Products={ProductData?.products}
        loading={loading}
        title={`Search Results for ${keyword}`}
      />
      {ProductData.pages > 1 && (
        <div className='pagination'>
          {ProductData.page !== 1 && (
            <button
              className='pagination-button'
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
            className='pagination-button'
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
