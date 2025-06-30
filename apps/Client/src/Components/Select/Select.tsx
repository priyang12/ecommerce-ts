import React from "react";
import { StyledSelect } from "./StyledSelect";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

/**
 * Styled select input component.
 *
 * Applies consistent theming and styling to native <select> elements,
 * including custom focus state, background color, and disabled state.
 */

function Select({ children, ...props }: SelectProps) {
  return <StyledSelect {...props}>{children}</StyledSelect>;
}

export default Select;
