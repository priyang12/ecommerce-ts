import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 5rem;
  }
`;

const StillWorking = () => {
  return (
    <section>
      <StyledContainer>
        <h1>Still Working On Features</h1>
        <p>Sorry For Your Inconvenience </p>
      </StyledContainer>
    </section>
  );
};

export default StillWorking;
