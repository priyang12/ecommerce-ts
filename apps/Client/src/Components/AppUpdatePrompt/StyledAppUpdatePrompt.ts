import { styled } from "@linaria/react";

export const UpdateToast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 16px;
`;

export const UpdateButton = styled.button`
  background: var(--success);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  width: 50%;
  cursor: pointer;

  &:hover {
    background: #45a045;
  }
`;
