// @ts-nocheck
import { useTilt } from "./Carousel";

const Slide = ({ slide, offset }) => {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className='slide'
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className='slideBackground'
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />
      <div
        className='slideContent'
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <div className='slideContentInner'>
          <h2 className='slideTitle'>{slide.title}</h2>
          <p className='slideDescription'>{slide.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Slide;
