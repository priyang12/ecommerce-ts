import { Link, useLocation } from "react-router-dom";
import LogoImage from "../../Assets/Logo.png";
import {
  ContactInfo,
  StyledFooter,
  FooterContainer,
  FooterItem,
  FooterLogo,
  HorizontalContentInfo,
} from "./StyledFooter";
import { FaMapMarker, FaPhone, FaEnvelope } from "react-icons/fa";

/**
 * Footer component
 *
 * @description
 * The Footer component renders a styled footer section containing company information, contact 
 * details, navigation links, and a logo. It is conditionally hidden on specific routes 
 * where a footer would be inappropriate or clutter the UI, such as authentication or 
 * checkout-related pages.

 * @return {*} 
 */
const Footer = () => {
  const location = useLocation();
  const isAuth =
    location.pathname == "/Auth/login" || location.pathname == "/Auth/register";
  const isPlaceOrder = location.pathname === "/PlaceOrder";
  const isPaypal = location.pathname === "/PayPal";

  if (isAuth || isPlaceOrder || isPaypal) return null;

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterItem>
          <FooterLogo>
            <Link to="/home">
              <img src={LogoImage} alt="logo" />
            </Link>
          </FooterLogo>
          <p>
            ECommerce, also known as electronic commerce or internet commerce,
            refers to the buying and selling of goods or services using the
            internet, and the transfer of money and data to execute these
            transactions.
            <br />
            <br />
            Whereas e-business refers to all aspects of operating an online
            business, ecommerce refers specifically to the transaction of goods
            and services.
          </p>
        </FooterItem>
        <FooterItem>
          <h4>Links</h4>
          <HorizontalContentInfo>
            <li>
              <Link to={`/StillWorking`}>Home</Link>
            </li>
            <li>
              <Link to={`/StillWorking`}>About</Link>
            </li>
            <li>
              <Link to={`/StillWorking`}>Services</Link>
            </li>
            <li>
              <Link to={`/StillWorking`}>Contact</Link>
            </li>
          </HorizontalContentInfo>

          <ContactInfo>
            <li>
              <FaMapMarker />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
              ex!
            </li>
            <li>
              <FaPhone />
              <span>Phone: +88 01911 854 xxx</span>
            </li>
            <li>
              <FaEnvelope />
              <span>Email:</span>
              <a href="mailto:patelpriyang95@gmail.com">shopitTeam@gmail.com</a>
            </li>
          </ContactInfo>
        </FooterItem>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
