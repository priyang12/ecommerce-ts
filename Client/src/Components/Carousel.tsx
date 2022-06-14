import { FC, useEffect, useReducer } from "react";
import { LoadTopProducts } from "../API/ProductAPI";
import Slide from "./Slide";
import {
  StyledSlide,
  StyledSlidesContainer,
} from "./StyledComponents/Styledslides";

const initialState = {
  slideIndex: 0,
};

const Carousel: FC = () => {
  const { data: Products } = LoadTopProducts();

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
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "NEXT" });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!Products) return null;

  return (
    <StyledSlidesContainer>
      <StyledSlide>
        <button onClick={() => dispatch({ type: "PREV" })}>
          <i className="fas fa-chevron-left"></i>
        </button>

        {[...Products, ...Products, ...Products].map((slide, i) => {
          let offset = Products.length + (state.slideIndex - i);
          // Products.map((slide: any, i: number) => {
          //   let offset = state.slideIndex - i;
          //   // New Effect
          //   // if (offset < 0) offset += Products.length;
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
