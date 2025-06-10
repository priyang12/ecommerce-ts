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
    background-color: var(--assertive-color);
    border-radius: 12px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
    padding: 0.5rem 0;
    z-index: 1000;
    list-style: none;
    min-width: 180px;
  }
  ${media.mobile} {
    right: -100;
    left: auto;
    border-radius: 0;
  }
`;

export const StyledUserName = styled.div`
  color: var(--bg-contrast-color);
  font-size: 1.5rem;
  margin: 0;
`;

export const StyledDropDownButton = styled.button`
  cursor: pointer;
  font-size: 1.5rem;
  background-color: transparent;
  color: var(--bg-contrast-color);
  border-radius: 50%;
  border-color: var(--secondary-color);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--assertive-color);
  }
  &:focus ~ .dropdown-content,
  & ~ .dropdown-content:hover {
    display: block;
  }
`;

export const StyledListItem = styled.div`
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  text-align: left;

  a {
    color: var(--secondary-color);
    text-decoration: none;
    display: block;
    width: 100%;
  }

  &:hover {
    background-color: var(--primary-color);
    a {
      color: #fff;
    }
  }
`;
