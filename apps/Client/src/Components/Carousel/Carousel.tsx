import { useEffect, useReducer, useState } from "react";
import { useLoadTopProducts } from "../../API/ProductAPI";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlideButton,
  StyledSlidesContainer,
} from "../StyledComponents/Styledslides";
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

function Carousel() {
  const { data: Products } = useLoadTopProducts();
  const DisplayProducts = Products || [];

  const [state, dispatch] = useReducer(slidesReducer, initialState);
  const [Hover, setHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT", length: DisplayProducts.length });
    }, 3000);
    if (Hover) clearInterval(interval);
    return () => clearInterval(interval);
  }, [Hover]);

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <StyledSlidesContainer>
      <StyledSlide>
        <StyledSlideButton
          onClick={() =>
            dispatch({ type: "PREV", length: DisplayProducts.length })
          }
          tabIndex={0}
          aria-label="Previous Slide"
          aria-describedby="Previous Slide"
        >
          <FaChevronCircleLeft />
        </StyledSlideButton>

        {[...DisplayProducts, ...DisplayProducts, ...DisplayProducts].map(
          (slide, i) => {
            const offset = DisplayProducts.length + (state.slideIndex - i);
            return (
              <Slide
                slide={slide}
                offset={offset}
                key={i}
                onMouseEnter={handleHover}
                onFocus={handleHover}
                onMouseLeave={handleLeave}
                dispatch={dispatch}
              />
            );
          }
        )}
        <StyledSlideButton
          onClick={() =>
            dispatch({ type: "NEXT", length: DisplayProducts.length })
          }
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
