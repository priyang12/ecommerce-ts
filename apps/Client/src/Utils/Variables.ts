const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobile: "576px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

export const media = {
  mobile: `@media (max-width: ${size.mobile})`,
  tablet: `@media (max-width: ${size.tablet})`,
  laptop: `@media (max-width: ${size.laptop})`,
  laptopL: `@media (max-width: ${size.laptopL})`,
  desktop: `@media (max-width: ${size.desktop})`,
  LargerThanDesktop: `@media (min-width: ${size.desktop})`,
  LargerThanLLaptop: `@media (min-width: ${size.laptopL})`,
  LargerThanLaptop: `@media (min-width: ${size.laptop})`,
  LargerThanTablet: `@media (min-width: ${size.tablet})`,
  LargerThanMobile: `@media (min-width: ${size.mobile})`,
};
