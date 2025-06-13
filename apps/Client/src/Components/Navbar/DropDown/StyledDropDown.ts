import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const DropDown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  .dropdown-content {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background-color: var(--primary-500);
    border-radius: 12px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    z-index: 1000;
    list-style: none;
    min-width: 180px;
    border: 3px solid var(--secondary-500);
  }
  ${media.mobile} {
    right: -100;
    left: auto;
    border-radius: 0;
  }
`;

export const StyledUserName = styled.div`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
`;

export const StyledDropDownButton = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 1;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: var(--neutral-100);
  color: var(--primary-700);
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover,
  &:focus-visible {
    background-color: var(--primary-300);
    color: var(--neutral-900);
    transform: scale(1.05);
    outline: none;
  }
  &:active {
    transform: scale(0.95);
    background-color: var(--primary-400);
  }

  &:focus-within ~ .dropdown-content,
  & ~ .dropdown-content:hover {
    display: block;
  }
`;

export const StyledListItem = styled.div`
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  text-align: left;
  a {
    color: var(--text-secondary);
    text-decoration: none;
    display: block;
    width: 100%;
  }

  &:hover {
    background-color: var(--primary-color);
    a {
      color: var(--primary-600);
    }
  }
`;
