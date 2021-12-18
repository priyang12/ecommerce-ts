import styled from "styled-components";

export const StyledAuthPage = styled.section`
  width: 100%;
  max-width: 35ch;
  margin: 2em auto;
  .container {
    padding: 1rem 2rem;
    border: 2px solid white;
    background-color: #e4e1f0;
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
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0%;
      left: 0%;
      z-index: -1;
      background-color: #188a9b;
      clip-path: polygon(0 0, 100% 0, 34% 51%, 100% 100%, 0 100%);
    }
  }
  form {
    padding: 1em 0;
    label {
      color: #002227;
    }
  }
  a {
    color: #002227;
  }
  .title {
    display: flex;
    div {
      cursor: pointer;
      color: #333;
      padding: 0rem 1rem;
    }
  }
  .help {
    color: white;
    text-align: center;
    a {
      color: #fff;
      &:hover {
        border-bottom: 3px solid #80d8e4;
      }
    }
  }
  .Link-border {
    padding-bottom: 20px;
    border-bottom: 4px solid sandybrown;
    border-radius: 5px;
  }
`;
