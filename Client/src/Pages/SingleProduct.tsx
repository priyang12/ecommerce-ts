import ProductDetails from "../Components/ProductDetails";
import { useParams } from "react-router-dom";
import { useFetch } from "../Utils/CustomHooks";
import Reviews from "../Components/Reviews";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, Err, FetchData } = useFetch(`/api/products/product/${id}`);

  if (loading) return <div data-testid="Loading">Loading</div>;

  if (Err) return <div className="Error">{Err}</div>;

  if (!FetchData) return null;

  return (
    <div>
      <ProductDetails Product={FetchData} />
      <Reviews reviews={FetchData?.reviews} />
    </div>
  );
};

export default SingleProduct;
