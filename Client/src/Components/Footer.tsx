import { Link } from "react-router-dom";
import LogoImage from "../Assets/Logo.png";
import {
  ContactInfo,
  ContentInfo,
  Footer as StyledFooter,
  FooterContainer,
} from "./StyledComponents/StyledFooter";

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContainer>
        <div className="footer-item">
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
          <ContactInfo>
            <li>
              <i className="fa fa-map-marker" />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae,
              ex!
            </li>
            <li>
              <i className="fa fa-phone" />
              Phone: +88 01911 854 xxx
            </li>
            <li>
              <i className="fa fa-envelope" />
              Email:
              <a href="mailto:patelpriyang95@gmail.com">shopitTeam@gmail.com</a>
            </li>
          </ContactInfo>
        </div>
      </FooterContainer>
      <FooterContainer>
        <div className="footer-item">
          <h4>Links</h4>
          <ContentInfo>
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
          </ContentInfo>
          <div className="footer-logo">
            <Link to="/home">
              <img src={LogoImage} alt="logo" />
            </Link>
          </div>
        </div>
      </FooterContainer>
    </StyledFooter>
  );
};

export default Footer;
