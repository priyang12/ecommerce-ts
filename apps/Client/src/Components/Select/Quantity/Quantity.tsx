import { StyledQuantityOptions } from "./StyledQuantity";

interface QuantityProps {
  children?: React.ReactNode;
  countInStock: number;
}

/**
 * Quantity component that renders a list of <option> elements
 * based on the available stock count.
 *
 * Intended to be used inside a <select> element.
 *
 * Props:
 * @param {number} countInStock - Total number of items in stock.
 *
 * Output:
 * - A default placeholder option: "select quantity"
 * - A list of <option> tags from 1 up to countInStock
 */

function Quantity({ children, countInStock }: QuantityProps) {
  return (
    <>
      {children ? (
        children
      ) : (
        <StyledQuantityOptions value={""}>
          select quantity
        </StyledQuantityOptions>
      )}
      {Array.from(Array(countInStock).keys()).map((x) => (
        <StyledQuantityOptions key={x + 1} value={x + 1}>
          {x + 1}
        </StyledQuantityOptions>
      ))}
    </>
  );
}

export default Quantity;
