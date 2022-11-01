import { useNavigate } from "react-router-dom";
import { useSuggestProduct } from "../../API/ProductAPI";
import ErrorCatch from "../../Components/ErrorCatch";
import Rating from "../../Components/Rating";
import { StyledImageContainer } from "./Styled/StyledSingleProduct";
import {
  StyledProductItem,
  StyledProductList,
  StyledRating,
  StyleSuggestion,
} from "./Styled/StyledSuggestion";

function SuggestBrand({
  brand,
  EnterProduct,
}: {
  brand: string;
  EnterProduct: any;
}) {
  const { data: SuggestedBrand } = useSuggestProduct(
    JSON.stringify({
      brand: brand,
    })
  );

  if (!SuggestedBrand) return null;

  return (
    <>
      <h2>
        Brand : <span>{brand}</span>
      </h2>
      <StyledProductList>
        {SuggestedBrand?.products.map((item) => (
          <StyledProductItem
            key={item._id}
            tabIndex={0}
            data-testid={`brand-${item._id}`}
            onKeyDown={(e) => EnterProduct(e, item._id)}
          >
            <h3>{item.name}</h3>
            <StyledRating id="sd">
              <Rating value={item.rating} text={`${item.numReviews} reviews`} />
            </StyledRating>
            <StyledImageContainer>
              <img src={item.image} alt={item.name} loading="lazy" />
            </StyledImageContainer>
          </StyledProductItem>
        ))}
      </StyledProductList>
    </>
  );
}

function SuggestCate({
  category,
  EnterProduct,
}: {
  category: string;
  EnterProduct: any;
}) {
  const { data: SuggestedCate } = useSuggestProduct(
    JSON.stringify({
      category: category,
    })
  );

  return (
    <>
      <h2>
        Category : <span>{category}</span>
      </h2>
      <StyledProductList>
        {SuggestedCate?.products.map((item) => (
          <StyledProductItem
            key={item._id}
            tabIndex={0}
            data-testid={`category-${item._id}`}
            onKeyDown={(e) => EnterProduct(e, item._id)}
          >
            <h3>{item.name}</h3>
            <StyledRating id="sd">
              <Rating value={item.rating} text={`${item.numReviews} reviews`} />
            </StyledRating>
            <StyledImageContainer>
              <img src={item.image} alt={item.name} loading="lazy" />
            </StyledImageContainer>
          </StyledProductItem>
        ))}
      </StyledProductList>
    </>
  );
}

function SuggestionProducts({
  brand,
  category,
}: {
  brand: string;
  category: string;
}) {
  const Navigate = useNavigate();

  const EnterProduct = (e: React.KeyboardEvent<any>, ProductID: string) => {
    if (e.key === "Enter") {
      Navigate(`/product/${ProductID}`);
    }
  };
  return (
    <StyleSuggestion>
      <h1>Product Suggestions</h1>
      <ErrorCatch>
        <SuggestBrand brand={brand} EnterProduct={EnterProduct} />
      </ErrorCatch>
      <br />
      <ErrorCatch>
        <SuggestCate category={category} EnterProduct={EnterProduct} />
      </ErrorCatch>
    </StyleSuggestion>
  );
}

export default SuggestionProducts;
