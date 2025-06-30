import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";
import { CardBoard } from "../../Components/UI/CardBoard";

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  gap: 1rem;
  padding: 2rem;
  padding-top: 1rem;
  margin: 0rem 10%;
  ${media.tablet} {
    justify-content: center;
  }
`;

export const PaginationButton = styled.button`
  background: none;
  color: var(--primary-500);
  border: 2px solid var(--secondary-500);
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    background: #fff;
    color: var(--secondary-500);
  }
`;

export const StyledHeader = styled(Pagination)`
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 600;
  }
  ${media.laptop} {
    h1 {
      font-size: 2rem;
    }
  }
  ${media.tablet} {
    h1 {
      font-size: 1.5rem;
    }
    button {
      display: none;
    }
  }
`;

export const StyledNoProducts = styled.div`
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  background-color: var(--bg-color-alpha, rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 3rem;
  margin: 2rem auto;
  max-width: 60%;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const StyledDisplay = styled.section`
  text-align: center;
  color: var(--text-primary);
  background-color: var(--bg-contrast);
  background: url("./images/haikei.svg") repeat center/cover;
  margin: 0;
  margin-bottom: 1rem;
`;

export const StyledProducts = styled(CardBoard)`
  backdrop-filter: blur(8px) saturate(142%);
  -webkit-backdrop-filter: blur(8px) saturate(142%);
  background-color: var(--bg-color-alpha);
  border: 1px solid rgba(255, 255, 255, 0.125);
  max-width: 80%;
  width: 100%;
  padding: 5%;
  box-sizing: border-box;
`;
