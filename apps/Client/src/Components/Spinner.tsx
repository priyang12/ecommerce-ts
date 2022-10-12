import styled from "styled-components";
import Img from "../Assets/loading.gif";

const StyledCenter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  img {
    width: 200px;
    margin: 5rem auto;
  }
`;

const Spinner = () => {
  return (
    <StyledCenter data-testid="Loading">
      <img src={Img} alt="Loading Please Wait" />
    </StyledCenter>
  );
};

export default Spinner;
