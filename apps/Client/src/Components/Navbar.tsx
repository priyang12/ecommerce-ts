import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../Context/Authentication/AuthActions";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { FaCaretDown } from "react-icons/fa";
import {
  StyledNavbar,
  Logo,
  StyledLinks,
  DropDown,
  StyledDropDownButton,
  StyledSecondaryNav,
  StyledUserName,
  StyledSkipNav,
} from "./StyledComponents/StyledNavbar";
import { FaShoppingCart } from "react-icons/fa";
import LogoImage from "../Assets/Logo.png";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const onLogout = () => {
    Logout(dispatch);
  };

  const GuestLink = (
    <>
      <Link to="/Auth/login" className="Auth">
        Login/Register
      </Link>
    </>
  );

  const AuthLink = (
    <>
      {user && (
        <DropDown>
          <StyledUserName>{user.name}</StyledUserName>
          <StyledDropDownButton
            role={"button"}
            className="Dropdown-btn"
            aria-label="Dropdown"
            aria-labelledby="Dropdown"
          >
            <FaCaretDown />
          </StyledDropDownButton>
          <div className="dropdown-content" tabIndex={0}>
            <li>
              <Link to="/Profile">
                <span className="hide-sm">Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/OrderStatus">
                <span className="hide-sm">Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/Wishlist">
                <span className="hide-sm">Wishlist</span>
              </Link>
            </li>
            <li>
              <Link to="/Reviews">
                <span className="hide-sm">Reviews</span>
              </Link>
            </li>
            <li>
              <Link to="/Auth/login" onClick={onLogout}>
                <span className="hide-sm">Logout</span>
              </Link>
            </li>
          </div>
        </DropDown>
      )}
    </>
  );

  return (
    <StyledNavbar>
      <Link to="/">
        <Logo>
          <h1>SHOP IT</h1>
          <img src={LogoImage} alt="" />
        </Logo>
      </Link>
      <StyledSkipNav href="#SkipNav">Skip Navigation</StyledSkipNav>
      <StyledSecondaryNav>
        {user && (
          <StyledLinks>
            <Link to="/Cart">
              <FaShoppingCart /> CART
            </Link>
          </StyledLinks>
        )}
        {user ? AuthLink : GuestLink}
      </StyledSecondaryNav>
      <div id="SkipNav"></div>
    </StyledNavbar>
  );
};

export default Navbar;
