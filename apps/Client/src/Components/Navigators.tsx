import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LinkContainer } from "./StyledComponents/StyledPayment";

const Navigators = () => {
  const { pathname } = useLocation();

  if (pathname === "/checkout/paypal") return null;

  return (
    <LinkContainer>
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
    </LinkContainer>
  );
};

export default Navigators;
