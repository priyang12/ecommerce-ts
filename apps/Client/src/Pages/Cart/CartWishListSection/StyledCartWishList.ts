// import { styled } from "@linaria/react";
// import { media } from "../../../Utils/Variables";

// export const StyledWishlistProduct = styled.article`
//   display: grid;
//   grid-template-columns: 1fr 1fr 1fr;
//   gap: 1rem;
//   padding: 1em;
//   ${media.tablet} {
//     grid-template-columns: 1fr 1fr;
//   }
//   ${media.mobile} {
//     grid-template-columns: 1fr;
//   }
// `;

// export const StyledWishlistItem = styled.div`
//   p {
//     color: var(--bg-contrast-color);
//   }
//   p:first-child {
//     font-size: 1.5rem;
//   }
// `;

import { styled } from "@linaria/react";
import { media } from "../../../Utils/Variables";

export const StyledWishlistProduct = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;

  background-color: var(--bg-light);
  border-radius: 8px;

  ${media.tablet} {
    padding: 1.5rem;
    gap: 1rem;
  }

  ${media.mobile} {
    padding: 1rem;
  }
`;

export const StyledWishlistItem = styled.div`
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: var(--bg-white);
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  p {
    text-align: start;
    color: var(--bg-contrast-color);
    margin: 0.25rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  p:first-child {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`;

export const StyledImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f5f5f5;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const WishlistButton = styled.button`
  background-color: var(--danger-color);
  color: #fff;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: darken(var(--danger-color), 10%);
  }
`;
