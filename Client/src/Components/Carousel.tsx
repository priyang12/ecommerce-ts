// @ts-nocheck
import { FC, useReducer, useRef, useEffect } from "react";
import { DetailedProduct } from "../interfaces";
import { Products } from "../Pages/Testdata/Data";
import Slide from "./Slide";
import { StyledslidesContainer } from "./StyledComponents/Styledslides";

export function useTilt(active: any) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e: any) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state: any, event: any) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % Products.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? Products.length - 1 : state.slideIndex - 1,
    };
  }
};

const Carousel: FC<{ products: any }> = ({ products }: any) => {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  return (
    <StyledslidesContainer>
      <div className='slides'>
        <button onClick={() => dispatch({ type: "PREV" })}>{"<"}</button>

        {[...Products, ...Products, ...Products].map((slide, i) => {
          let offset = Products.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT" })}>{">"}</button>
      </div>
    </StyledslidesContainer>
  );
};

export default Carousel;
