import { FC, useEffect, useReducer } from "react";
import { useLoadTopProducts } from "../API/ProductAPI";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlidesContainer,
} from "./StyledComponents/Styledslides";

const initialState = {
  slideIndex: 0,
};

const Carousel: FC = () => {
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
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT" });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledSlidesContainer>
      <StyledSlide>
        <button onClick={() => dispatch({ type: "PREV" })}>
          <i className="fas fa-chevron-left"></i>
        </button>

        {[...DisplayProducts, ...DisplayProducts, ...DisplayProducts].map(
          (slide, i) => {
            let offset = DisplayProducts.length + (state.slideIndex - i);
            // Products.map((slide: any, i: number) => {
            //   let offset = state.slideIndex - i;
            //   // New Effect
            //   // if (offset < 0) offset += Products.length;
            return (
              <Slide
                slide={slide}
                offset={offset}
                key={i}
                dispatch={dispatch}
              />
            );
          }
        )}
        <button onClick={() => dispatch({ type: "NEXT" })}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </StyledSlide>
    </StyledSlidesContainer>
  );
};

export default Carousel;
