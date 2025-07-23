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

/**
 * SuggestBrand Component
 *
 * Displays a list of product suggestions based on the brand.
 *
 * ## Props
 * @param {string} brand - Brand to filter suggested products by.
 * @param {Function} EnterProduct - Keyboard handler for navigation.
 *
 
 */
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

/**
 * SuggestCate Component
 *
 * Displays a list of product suggestions based on the category.
 *
 * ## Props
 * @param {string} category - Category to filter suggested products by.
 * @param {Function} EnterProduct - Keyboard handler for navigation.
 */
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

/**
 * SuggestionProducts Component
 *
 * Displays a list of suggested products based on the current product's brand and category.
 * Renders two sections:
 * - Suggested products by brand
 * - Suggested products by category
 *
 * ## Props
 * @param {string} brand - The brand of the currently viewed product.
 * @param {string} category - The category of the currently viewed product.
 *
 * ## Features
 * - Fetches related products using `useSuggestProduct`.
 * - Renders each suggestion with product name, rating, and image.
 * - Supports keyboard accessibility (Enter key triggers navigation).
 * - Wraps child components in <ErrorCatch /> to handle API/load errors.
 *
 * ## Accessibility
 * - Each product item is focusable via `tabIndex`.
 * - `Enter` key allows navigation to the product detail page.
 *
 * ## Route Navigation
 * - Navigates to `/product/:id` when a suggested product is selected.
 */
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
