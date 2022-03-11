import { Fragment, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Logout } from "../Context/Authentication/AuthActions";
import { AuthContext } from "../Context/Authentication/AuthContext";
import {
  StyledNavbar,
  Logo,
  SearchBar,
  SerachInput,
  SerchButton as SerachButton,
  StyledLinks,
  DropDown,
  StyledDropDownButton,
  StyledSecondaryNav,
} from "./StyledComponents/navbar";

const Navbar = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>("");

  const search = () => {
    if (searchValue !== "") {
      let path = `/search/name=${searchValue}`;
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
          <StyledDropDownButton className='Dropdown-btn'>
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
          name='search'
          onKeyUp={(e: any) => {
            setSearchValue(e.target.value);
            if (e.key === "Enter") {
              search();
            }
          }}
        />
        <SerachButton onClick={search}>Find</SerachButton>
      </SearchBar>

      <StyledSecondaryNav>
        {user && (
          <StyledLinks>
            <Link to='/Cart'>
              <i className='fas fa-shopping-cart'></i> CART
            </Link>
          </StyledLinks>
        )}
        {user?.isAdmin && (
          <StyledLinks>
            <Link to='/AdminDashboard'>AdminDashboard</Link>
          </StyledLinks>
        )}
        {user ? AuthLink : GuestLink}
      </StyledSecondaryNav>
    </StyledNavbar>
  );
};

export default Navbar;
