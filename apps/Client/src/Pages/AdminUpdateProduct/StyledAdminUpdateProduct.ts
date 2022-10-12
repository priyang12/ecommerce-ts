import styled from "styled-components";

export const StyledEditProduct = styled.section`
  display: flex;
  form {
    width: 100%;
  }
  img {
    width: 20rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2em;
    img {
      width: 100%;
    }
  }
`;

export const StyledImageContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  h2 {
    margin: 1rem 0;
  }
  input {
    height: 3rem;
    width: 70%;
    border: none;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    font-size: 1.5rem;
  }
  .btn {
    width: 70%;
    height: 40%;
  }
`;
