import { styled } from "@linaria/react";
import { media } from "../../Utils/Variables";

export const StyledFooter = styled.footer`
  background-color: var(--bg-surface);
  color: var(--text-primary);
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${media.tablet} {
    padding: 1rem 0.5rem;
    gap: 1.5rem;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  flex-wrap: wrap;

  & .footer-item {
    flex: 1;
    min-width: 250px;
  }
`;

export const ContactInfo = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    svg {
      margin-right: 10px;
      color: var(--primary-500);
    }

    a {
      margin-left: 5px;
      color: #ffffff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: var(--primary-500);
      }
    }
  }
`;

export const ContentInfo = styled.ul`
  list-style: none;
  padding: 0;
  li {
    margin-bottom: 10px;
    a {
      color: var(--text-primary);
      text-decoration: none;
      &:hover {
        color: var(--primary-500);
      }
    }
  }
`;

export const HorizontalContentInfo = styled(ContentInfo)`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  li {
    margin-bottom: 0;
  }
`;

export const FooterItem = styled.div`
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h4 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--primary-500);
  }

  p {
    line-height: 1.6;
    color: var(--text-secondary);
  }
`;

export const FooterLogo = styled.div`
  margin-top: 2rem;
  img {
    width: 120px;
    height: auto;
  }
  ${media.tablet} {
    margin-top: 0;
  }
`;
