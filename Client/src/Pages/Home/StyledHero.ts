import styled from "styled-components";

export const StyledHeroContainer = styled.section`
  overflow: hidden;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;
  margin: 2rem 0;
  @media (max-width: 568px) {
    width: 100%;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const StyledHero = styled.div`
  display: flex;
  padding-left: 10%;
  flex-direction: column;
  h1 {
    margin: 0rem;
    font-size: 4.5rem;
  }
  p {
    font-size: 1.5rem;
  }
`;
