import React, { Dispatch } from "react";
import { Link } from "react-router-dom";
import { useTilt } from "../Utils/CustomHooks";
import {
  StyledContentInner,
  StyledSlideBackground,
  StyledSlideContent,
  StyledShowMore,
} from "./StyledComponents/Styledslides";

const Slide = ({
  slide,
  offset,
  onMouseEnter,
  onMouseLeave,
  dispatch,
}: {
  slide: any;
  offset: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  dispatch: Dispatch<any>;
}) => {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onTouchMove={(e) => {
        if (e.touches.length >= 1) {
          if (offset === 1) {
            dispatch({ type: "NEXT" });
          }
          if (offset === -1) {
            dispatch({ type: "PREV" });
          }
        }
      }}
      style={
        {
          "--offset": offset,
          "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
        } as React.CSSProperties
      }
    >
      <StyledSlideBackground
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />
      <StyledSlideContent
        style={{
          backgroundImage: `url('${slide.image}')`,
          opacity: active ? 1 : 0.7,
        }}
        // className={active ? "active" : ""}
      >
        <StyledContentInner
          style={{
            opacity: active ? 1 : 0,
          }}
        >
          <h2 className="slideTitle">{slide.title}</h2>
          <p className="slideDescription">{slide.description}</p>
        </StyledContentInner>
        <StyledShowMore
          style={{
            display: active ? "block" : "none",
          }}
        >
          <Link to={`/product/${slide._id}`}>Show More</Link>
        </StyledShowMore>
      </StyledSlideContent>
    </div>
  );
};

export default Slide;
