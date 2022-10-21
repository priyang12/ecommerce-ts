import { useEffect, useReducer, useState } from "react";
import { useLoadTopProducts } from "../API/ProductAPI";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlideButton,
  StyledSlidesContainer,
} from "./StyledComponents/Styledslides";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
const initialState = {
  slideIndex: 0,
};

function Carousel() {
  const { data: Products } = useLoadTopProducts();
  const DisplayProducts = Products || [];

  const slidesReducer = (state: any, event: any) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0
            ? DisplayProducts.length - 1
            : state.slideIndex - 1,
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % DisplayProducts.length,
      };
    }
  };
  const [state, dispatch] = useReducer(slidesReducer, initialState);
  const [Hover, setHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT" });
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

  if (DisplayProducts.length === 0) return <div>Loading...</div>;

  return (
    <StyledSlidesContainer>
      <StyledSlide>
        <StyledSlideButton
          onClick={() => dispatch({ type: "PREV" })}
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
                onMouseLeave={handleLeave}
                dispatch={dispatch}
              />
            );
          }
        )}
        <StyledSlideButton
          onClick={() => dispatch({ type: "NEXT" })}
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
