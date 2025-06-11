import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledSlidesContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  margin: 10% 5%;
`;

export const StyledSlide = styled.div`
  display: grid;
  > .slide {
    grid-area: 1 / -1;
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
