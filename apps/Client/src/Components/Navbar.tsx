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
} from "./StyledComponents/StyledNavbar";
import LogoImage from "../Assets/Logo.png";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const onLogout = () => {
    Logout(dispatch);
    window.location.reload();
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
          <div className="dropdown-content">
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
              <Link to="/Auth" onClick={onLogout}>
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

      <StyledSecondaryNav>
        {user && (
          <StyledLinks>
            <Link to="/Cart">
              <i className="fas fa-shopping-cart"></i> CART
            </Link>
          </StyledLinks>
        )}
        {user ? AuthLink : GuestLink}
      </StyledSecondaryNav>
    </StyledNavbar>
  );
};

export default Navbar;
