import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../Context/Authentication/AuthActions";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import LogoImage from "../../Assets/Logo.png";
import DropDown from "./DropDown/DropDown";

import {
  StyledNavbar,
  Logo,
  StyledLinks,
  StyledSecondaryNav,
  StyledSkipNav,
} from "./StyledNavbar";

const GuestLink = () => {
  return (
    <StyledLinks>
      <Link to="/Auth/login" className="Auth">
        Login/Register
      </Link>
    </StyledLinks>
  );
};

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const onLogout = () => {
    Logout(dispatch);
  };

  return (
    <StyledNavbar>
      <Link to="/">
        <Logo>
          <h1>SHOP IT</h1>
          <img src={LogoImage} alt="Shop It Logo" loading="lazy" />
        </Logo>
      </Link>
      <StyledSkipNav href="#SkipNav">Skip Navigation</StyledSkipNav>
      <StyledSecondaryNav>
        {user && (
          <StyledLinks>
            <Link to="/Cart">
              To Cart <FaShoppingCart />
            </Link>
          </StyledLinks>
        )}
        {user ? <DropDown user={user} onLogout={onLogout} /> : <GuestLink />}
      </StyledSecondaryNav>
      <div id="SkipNav"></div>
    </StyledNavbar>
  );
};

export default Navbar;
