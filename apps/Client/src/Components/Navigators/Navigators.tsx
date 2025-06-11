import { StyledNavigators } from "./StyledNavigators";
import { Link, useLocation } from "react-router-dom";

interface NavigatorsProps {}

/**
 *
 * * A navigation component for checkout process steps.
 * * @description
 * This component renders a list of navigation links for the checkout process:
 * - Address
 * - Payment Method
 * - Place Order
 *
 * @param {NavigatorsProps} {}
 * @return {*}
 *
 * @component
 * @example
 * // Renders the checkout navigator with active link based on current route
 * <Navigators />
 */
function Navigators({}: NavigatorsProps) {
  const { pathname } = useLocation();

  if (pathname === "/checkout/paypal") return null;

  return (
    <StyledNavigators>
      <li className={pathname === "/checkout/address" ? "Link-border" : ""}>
        <Link to="/checkout/address">Address</Link>
      </li>
      <li
        className={pathname === "/checkout/paymentMethod" ? "Link-border" : ""}
      >
        <Link to="/checkout/paymentMethod">Payment</Link>
      </li>
      <li className={pathname === "/checkout/PlaceOrder" ? "Link-border" : ""}>
        <Link to="/checkout/PlaceOrder">Place Order</Link>
      </li>
    </StyledNavigators>
  );
}

export default Navigators;
