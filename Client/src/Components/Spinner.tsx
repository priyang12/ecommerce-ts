import styled from "styled-components";

const StyledCenter = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100vw;
  img {
    width: 200px;
    margin: 5rem auto;
  }
`;

const Spinner = () => {
  return (
    <StyledCenter data-testid='Loading'>
      <img src='./images/loading.gif' alt='Loading Please Wait' />
    </StyledCenter>
  );
};

export default Spinner;
