import { Fragment, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Logout } from "../Context/AuthActions";
import { AuthContext } from "../Context/AuthContext";
import {
  StyledNavbar,
  Logo,
  SearchBar,
  SerachInput,
  SerchButton,
  StyledLinks,
  DropDown,
  StyledDropDownButton,
} from "./StyledComponents/navbar";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = () => {
    if (searchValue !== "") {
      let path = `/keyword=${searchValue}`;
      history.push(path);
    }
  };

  const onLogout = () => {
    Logout(dispatch);
    window.location.reload();
  };

  const GuestLink = (
    <Fragment>
      <Link to='/Auth' className='Auth'>
        Login/Register
      </Link>
    </Fragment>
  );

  const AuthLink = (
    <Fragment>
      {user && (
        <DropDown>
          <div>{user.name}</div>
          <StyledDropDownButton>
            <i className='fas fa-caret-down'></i>
          </StyledDropDownButton>
          <div className='dropdown-content'>
            <li>
              <Link to='/OrderStatus'>
                <span className='hide-sm'>Orders</span>
              </Link>
            </li>
            <li>
              <Link to='/Auth' onClick={onLogout}>
                <span className='hide-sm'>Logout</span>
              </Link>
            </li>
          </div>
        </DropDown>
      )}
    </Fragment>
  );

  return (
    <StyledNavbar>
      <Logo>
        <Link to='/'>
          <h1>SHOP IT</h1>
        </Link>
      </Logo>
      <SearchBar>
        <SerachInput
          type='text'
          placeholder='Search Product'
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <SerchButton onClick={search}>Find</SerchButton>
      </SearchBar>

      {user && (
        <StyledLinks>
          <Link to='/cart' className='cart link'>
            <i className='fas fa-shopping-cart'></i> CART
          </Link>
        </StyledLinks>
      )}
      {user?.isAdmin && (
        <Link to='/adminDashboard' className='AdminIcon link'>
          AdminDashboard
        </Link>
      )}
      {user ? AuthLink : GuestLink}
    </StyledNavbar>
  );
};

export default Navbar;
