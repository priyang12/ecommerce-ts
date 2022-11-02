import styled from "styled-components";
import { media } from "../../Variables";

export const StyledSlidesContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  margin: 10% 5%;
  .active {
    --x: calc(var(--px) - 0.5);
    --y: calc(var(--py) - 0.5);
    opacity: 1;

    transform: perspective(1000px);

    &:hover {
      transition: none;
      transform: perspective(1000px) rotateY(calc(var(--x) * 45deg))
        rotateX(calc(var(--y) * -45deg));
    }
  }
`;

export const StyledSlide = styled.div`
  display: grid;
  > .slide {
    grid-area: 1 / -1;
  }
`;

export const StyledSlideContent = styled.div`
  width: 40vw;
  height: 40vw;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  opacity: 0.7;
  display: grid;
  align-content: center;

  transform-style: preserve-3d;
  transform: perspective(1000px) translateX(calc(100% * var(--offset)))
    rotateY(calc(-45deg * var(--dir)));
  &:hover {
    > button {
      opacity: 1;
    }
  }
`;

export const StyledContentInner = styled.div`
  transform-style: preserve-3d;
  transform: translateZ(2rem);
  transition: opacity 0.3s linear;
  text-shadow: 0 0.1rem 1rem #000;
  opacity: 0;
  text-align: center;

  .slideTitle {
    margin: 0;
    font-size: 2rem;
    font-weight: normal;
    letter-spacing: 0.2ch;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 20vw;
  }

  @media (max-width: 1028px) {
    .slideDescription {
      font-size: 1.5rem;
    }
  }
  ${media.tablet} {
    .slideTitle {
      width: fit-content;
      white-space: pre-line;
    }
    .slideDescription {
      display: none;
    }
  }
`;

export const StyledSlideBackground = styled.div`
  transition: opacity 0.3s linear, transform 0.3s ease-in-out;
  pointer-events: none;
  transform: translateX(calc(10% * var(--dir)));
`;

export const StyledShowMore = styled.button`
  opacity: 0;
  cursor: pointer;
  appearance: none;
  text-align: center;
  font-family: "Arial", sans-serif;
  padding: 0.5em;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #e65d5d;
  border: none;
  color: white;
  font-size: 2.5rem;
  transition: opacity 0.3s;
  &:focus {
    outline: 5px solid var(--primary-color);
  }
  ${media.tablet} {
    font-size: 1rem;
  }
`;

export const StyledSlideButton = styled.button`
  cursor: pointer;
  appearance: none;
  border-radius: 50%;
  border: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-size: 1.5rem;
  width: 5rem;
  height: 5rem;
  transition: opacity 0.3s;
  opacity: 0.7;
  z-index: 5;
  top: 40%;
  &:hover {
    opacity: 1;
  }
  &:focus {
    outline: 5px solid #e65d5d;
  }
  &:first-child {
    left: 10%;
  }
  &:last-child {
    right: 10%;
  }
  ${media.mobile} {
    top: 30%;
    width: 3rem;
    height: 3rem;
  }
`;
