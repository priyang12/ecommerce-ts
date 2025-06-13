import { styled } from "@linaria/react";

export const StyledEmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 50vh;
  h1 {
    font-size: 5rem;
  }
`;

export const StyledHeading = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 2rem 0;
  color: var(--bg-contrast);
`;

export const StyledProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledProduct = styled.article`
  background-color: var(--bg-contrast);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin: 1rem 0;
  }

  button {
    margin-top: auto;
    padding: 0.6rem 1rem;
    background-color: #ef4444;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #dc2626;
    }

    &:focus {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  }
`;

export const StyledProductTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--bg-surface);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 30%;
`;

export const StyledImgContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const StyledProductDescription = styled.p`
  font-size: 0.95rem;
  color: var(--bg-surface);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  height: 30%;
`;

export const StyledProductPrice = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #10b981;
  margin-top: 1rem;
  span {
    font-size: 0.9rem;
    color: var(--neutral-500);
  }
`;
