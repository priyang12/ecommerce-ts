import React, { Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTilt } from "../../../Hooks/useTilt";
import {
  StyledContentInner,
  StyledSlideContent,
  StyledShowMore,
  StyledSlide,
  StyledSlideTitle,
  StyledSlideDescription,
} from "./StyledSlide";
import type { Product } from "../../../Types/interfaces";

/**
 * Slide Component
 *
 * Represents a single slide in a carousel, with interactive tilt effects and navigation logic.
 * Displays product details such as image, name, and description.
 * Allows user to navigate using touch gestures and view more details via a link.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Product} props.slide - The product data used to render the slide.
 * @param {number} props.offset - The slide's position relative to the current active slide (0 = active).
 * @param {function} props.onMouseEnter - Callback triggered on mouse enter (used for interaction).
 * @param {function} props.onMouseLeave - Callback triggered on mouse leave (used for interaction).
 * @param {function} props.onFocus - Callback triggered when slide receives keyboard focus.
 * @param {Dispatch<any>} props.dispatch - Dispatch function to change slides (NEXT / PREV).
 *
 * @returns {JSX.Element} The rendered slide component.
 */
const Slide = ({
  slide,
  offset,
  DisplayProductsLength,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  dispatch,
}: {
  slide: Product;
  offset: number;
  DisplayProductsLength: number;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  onFocus: React.FocusEventHandler<HTMLDivElement>;
  dispatch: Dispatch<any>;
}) => {
  const active = offset === 0 ? true : false;
  const ref = useTilt(active);

  // set the title container width to the relative to the slide width.
  // the title ellipsis with nowrap so it will break the container space if
  // we do not set the width explicity.
  useEffect(() => {
    const el = ref.current;
    const updateWidth = () => {
      if (el) {
        const width = el.offsetWidth;
        el.style.setProperty("--title-container-width", `${width}px`);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const moveSlideOnTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length >= 1) {
      if (offset === 1) {
        dispatch({ type: "NEXT", length: DisplayProductsLength });
      }
      if (offset === -1) {
        dispatch({ type: "PREV", length: DisplayProductsLength });
      }
    }
  };

  return (
    <StyledSlide
      ref={ref}
      data-active={active}
      className="slide"
      onMouseEnter={onMouseEnter}
      onFocus={onFocus}
      onMouseLeave={onMouseLeave}
      onTouchMove={moveSlideOnTouch}
      role="presentation"
      aria-label={`Slide for ${slide.name}`}
      aria-roledescription="slide"
      style={
        {
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
          transform: `perspective(1000px)
            rotateX(calc((0.5 - var(--py)) * 20deg))
            rotateY(calc((var(--px) - 0.5) * 20deg))`,
        } as React.CSSProperties
      }
    >
      <StyledSlideContent
        style={{
          backgroundImage: `url('${slide.image}')`,
          opacity: active ? 1 : 0.7,
        }}
        className={active ? "active" : ""}
      >
        <StyledContentInner
          style={{
            opacity: active ? 1 : 0,
          }}
        >
          <StyledSlideTitle>{slide.name}</StyledSlideTitle>
          <br />
          <StyledSlideDescription>{slide.description}</StyledSlideDescription>
        </StyledContentInner>
        <StyledShowMore
          style={{
            display: active ? "block" : "none",
          }}
        >
          <Link to={`/product/${slide._id}`}>Show More</Link>
        </StyledShowMore>
      </StyledSlideContent>
    </StyledSlide>
  );
};

export default Slide;
