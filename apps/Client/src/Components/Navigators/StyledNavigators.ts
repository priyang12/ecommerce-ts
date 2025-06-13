import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledNavigators = styled.ul`
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
  align-items: center;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  background-color: var(--bg-surface);
  border: 2px solid rgba(0, 0, 0, 0.1);
  list-style: none;
  font-size: 1.6rem;

  li {
    position: relative;
  }

  a {
    color: var(--text-primary, #fff);
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: color 0.3s ease;
  }

  .Link-border a {
    font-weight: 600;
    padding-bottom: 20px;
    border-bottom: 4px solid sandybrown;
    border-radius: 5px;
  }
  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  @media (prefers-color-scheme: dark) {
    border: 2px solid rgba(255, 255, 255, 0.1);
  }
`;
