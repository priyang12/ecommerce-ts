import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useLoadTopProducts } from "../../API/ProductAPI";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlideButton,
  StyledSlidesContainer,
} from "./StyledCarousel";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const initialState = {
  slideIndex: 0,
};
export type SlidesState = typeof initialState;

const slidesReducer = (
  state: SlidesState,
  event: { type: string; length: number }
): SlidesState => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? event.length - 1 : state.slideIndex - 1,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % event.length,
    };
  }
  return state;
};

const MemoedSlide = memo(Slide);

function Carousel() {
  const { data: products } = useLoadTopProducts();

  const DisplayProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products, ...products, ...products];
  }, [products]);
  const productsLength = useMemo(() => products?.length || 0, [products]);

  const [state, dispatch] = useReducer(slidesReducer, initialState);
  const [Hover, setHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT", length: productsLength });
    }, 3000);
    if (Hover) clearInterval(interval);
    return () => clearInterval(interval);
  }, [Hover]);

  const handleHover = useCallback(() => {
    setHover(true);
  }, []);

  const handleLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <StyledSlidesContainer data-testid="CarouselContainer">
      <StyledSlide>
        <StyledSlideButton
          onClick={() => dispatch({ type: "PREV", length: productsLength })}
          tabIndex={0}
          aria-label="Previous Slide"
          aria-describedby="Previous Slide"
        >
          <FaChevronCircleLeft />
        </StyledSlideButton>

        {DisplayProducts.map((slide, i) => {
          const offset = productsLength + (state.slideIndex - i);
          return (
            <MemoedSlide
              data-testid={`slide-${offset}`}
              slide={slide}
              offset={offset}
              DisplayProductsLength={productsLength}
              key={i}
              onMouseEnter={handleHover}
              onFocus={handleHover}
              onMouseLeave={handleLeave}
              dispatch={dispatch}
            />
          );
        })}
        <StyledSlideButton
          onClick={() => dispatch({ type: "NEXT", length: productsLength })}
          tabIndex={0}
          aria-label="Next Slide"
          aria-describedby="Next Slide"
        >
          <FaChevronCircleRight />
        </StyledSlideButton>
      </StyledSlide>
    </StyledSlidesContainer>
  );
}

export default Carousel;
