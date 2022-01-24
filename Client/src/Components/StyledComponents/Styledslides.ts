import styled from "styled-components";

export const StyledslidesContainer = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  .slides {
    display: grid;
    > .slide {
      grid-area: 1 / -1;
    }

    > button {
      cursor: pointer;
      appearance: none;
      background: transparent;
      border: none;
      color: white;
      position: absolute;
      font-size: 5rem;
      width: 5rem;
      height: 5rem;
      top: 30%;
      transition: opacity 0.3s;
      opacity: 0.7;
      z-index: 5;
      top: 70%;
      &:hover {
        opacity: 1;
      }
      &:focus {
        outline: none;
      }
      &:first-child {
        left: 10%;
      }
      &:last-child {
        right: 10%;
      }
    }
  }
  .slideContent {
    width: 30vw;
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
  }

  .slideContentInner {
    transform-style: preserve-3d;
    transform: translateZ(2rem);
    transition: opacity 0.3s linear;
    text-shadow: 0 0.1rem 1rem #000;
    opacity: 0;

    .slideSubtitle,
    .slideTitle {
      font-size: 2rem;
      font-weight: normal;
      letter-spacing: 0.2ch;
      text-transform: uppercase;
      margin: 0;
    }

    .slideSubtitle::before {
      content: "— ";
    }

    .slideDescription {
      margin: 0.5em;
      font-size: 1.2rem;
      letter-spacing: 0.2ch;
    }
  }

  .slideBackground {
    transition: opacity 0.3s linear, transform 0.3s ease-in-out;
    pointer-events: none;
    transform: translateX(calc(10% * var(--dir)));
  }

  .slide[data-active] {
    z-index: 2;
    pointer-events: auto;

    .slideBackground {
      opacity: 0.2;
      transform: none;
    }

    .slideContentInner {
      opacity: 1;
    }

    .slideContent {
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
  }
`;
