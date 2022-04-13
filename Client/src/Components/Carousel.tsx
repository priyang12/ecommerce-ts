import { FC, useReducer } from "react";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlidesContainer,
} from "./StyledComponents/Styledslides";

const initialState = {
  slideIndex: 0,
};

const Carousel: FC<{ products: any }> = ({ products: Products }: any) => {
  const slidesReducer = (state: any, event: any) => {
    if (event.type === "NEXT") {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? Products.length - 1 : state.slideIndex - 1,
      };
    }
    if (event.type === "PREV") {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % Products.length,
      };
    }
  };

  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <StyledSlidesContainer>
      <StyledSlide>
        <button onClick={() => dispatch({ type: "PREV" })}>
          <i className="fas fa-chevron-left"></i>
        </button>

        {[...Products, ...Products, ...Products].map((slide, i) => {
          let offset = Products.length + (state.slideIndex - i);

          return (
            <Slide slide={slide} offset={offset} key={i} dispatch={dispatch} />
          );
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </StyledSlide>
    </StyledSlidesContainer>
  );
};

export default Carousel;
