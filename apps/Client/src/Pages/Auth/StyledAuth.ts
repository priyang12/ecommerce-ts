import styled from "styled-components";
import { media } from "../../Variables";

export const StyledAuthPage = styled.section`
  width: 100%;
  max-width: 80ch;
  margin: 2em auto;
  .container {
    padding: 1em 2em;
    border: 2px solid white;
    color: var(--bg-contrast-color);
    background-color: var(--bg-color);
    font-size: 1.5rem;
    position: relative;
    z-index: 1;
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0%;
      left: 0%;
      z-index: -1;
      background-color: #80d8e4;
      clip-path: polygon(100% 0, 0 0, 0 100%);
    }
  }
  form {
    padding: 1em 0;
    label {
      color: #002227;
    }
    input:valid ~ label {
      transform: translateY(-104%) translateX(-1%);
      text-align: left;
    }
  }
  a {
    color: #002227;
  }
  .title {
    display: flex;
    h1 {
      font-size: 2rem;
      margin: 0.5em;
    }
    ${media.mobile} {
      flex-direction: column;
    }
  }
  .help {
    text-align: center;
    a {
      color: var(--bg-contrast-color);
      &:hover {
        border-bottom: 3px solid #80d8e4;
      }
    }
  }
  .Link-border {
    border-bottom: 4px solid sandybrown;
  }
`;

export const Waves = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  @keyframes wave {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;
