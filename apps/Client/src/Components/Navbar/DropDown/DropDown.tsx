import {
  DropDown as StyledDropDown,
  StyledDropDownButton,
  StyledListItem,
  StyledUserName,
} from "./StyledDropDown";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthUser } from "../../../Context/Authentication/AuthContext";
import { useEffect, useRef, useState } from "react";

const DropDown = ({
  user,
  onLogout,
}: {
  user: AuthUser;
  onLogout: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <StyledDropDown ref={dropdownRef}>
      <StyledUserName>{user.name}</StyledUserName>
      <StyledDropDownButton
        role={"button"}
        className="Dropdown-btn"
        aria-label="Dropdown"
        aria-labelledby="Dropdown"
        onClick={toggleDropdown}
      >
        <FaCaretDown />
      </StyledDropDownButton>

      {open && (
        <div className="dropdown-content" tabIndex={0}>
          <StyledListItem>
            <Link to="/Profile">
              <span className="hide-sm">Profile</span>
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to="/OrderStatus">
              <span className="hide-sm">Orders</span>
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to="/Wishlist">
              <span className="hide-sm">Wishlist</span>
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to="/Reviews">
              <span className="hide-sm">Reviews</span>
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Link to="/Auth/login" onClick={onLogout}>
              <span className="hide-sm">Logout</span>
            </Link>
          </StyledListItem>
        </div>
      )}
    </StyledDropDown>
  );
};

export default DropDown;
