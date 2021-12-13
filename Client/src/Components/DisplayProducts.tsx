import { Product } from '../types';
import { useFetch } from '../Utils/CustomHooks';
import ProductCard from './ProductCard';
import { StyledDisplay, StyledProducts } from './StyledComponents/Products';

type props = {
  url: string;
};

const DisplayProducts = ({ url }: props) => {
  const { FetchData, Err, loading } = useFetch(url);
  return (
    <div>
      {loading ? (
        <div className='loading'>Loading</div>
      ) : (
        <StyledDisplay>
          <h1>Product Display</h1>
          <StyledProducts>
            {FetchData &&
              FetchData.products.map((product: Product) => (
                <ProductCard product={product} key={product._id} />
              ))}
            {Err && <div className='Error'>{Err}</div>}
          </StyledProducts>
        </StyledDisplay>
      )}
    </div>
  );
};

export default DisplayProducts;
