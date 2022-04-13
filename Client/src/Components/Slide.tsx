import { Link } from "react-router-dom";
import { useTilt } from "../Utils/CustomHooks";
import {
  StyledContentInner,
  StyledSlideBackground,
  StyledSlideContent,
  StyledShowMore,
} from "./StyledComponents/Styledslides";

const Slide = ({ slide, offset }: { slide: any; offset: number }) => {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);
  return (
    <div
      ref={ref}
      className="slide"
      style={{
        // @ts-ignore
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
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
