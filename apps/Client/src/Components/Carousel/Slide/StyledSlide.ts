import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const StyledSlide = styled.div`
  width: 50vw;
  height: 50vh;
  transform: perspective(1000px) translateX(calc(100% * var(--offset)))
    rotateY(calc(-45deg * var(--dir)));
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
  .active {
    &:hover {
      transform: perspective(1000px) rotateX(calc((0.5 - var(--py)) * 20deg))
        rotateY(calc((var(--px) - 0.5) * 20deg));
    }
  }
`;

export const StyledSlideContent = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.7;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

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
`;

export const StyledSlideTitle = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: 0.2ch;
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: var(--title-container-width);
`;

export const StyledSlideDescription = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  line-height: 1.5;
  max-height: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.tablet} {
    width: fit-content;
    white-space: pre-line;
  }
`;

export const StyledShowMore = styled.div`
  margin-top: 1.2rem;
  margin-left: auto;
  margin-right: 1rem;
  a {
    display: inline-block;
    background: rgba(255, 255, 255, 0.85);
    border: 2px solid var(--secondary-500);
    border-radius: 1rem;
    color: #111;
    font-weight: bold;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background 0.3s ease;

    &:hover {
      background: #fff;
    }
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
    outline: 5px solid var(--secondary-500);
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
