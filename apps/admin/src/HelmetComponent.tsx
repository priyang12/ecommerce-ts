import React from "react";
import { Helmet } from "react-helmet-async";

function HelmetComponent({ children }: { children: React.ReactNode }) {
  /* @ts-ignore */
  return <Helmet>{children}</Helmet>;
}

export default HelmetComponent;
