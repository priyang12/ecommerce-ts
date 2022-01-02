import styled from "styled-components";

export const Alert = styled.div`
  background-color: ${(props) => props.theme.bg}; /* background-color */
  color: ${(props) => props.theme.alertTextColor}; /* text color */
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1rem;
  text-align: center;
`;
