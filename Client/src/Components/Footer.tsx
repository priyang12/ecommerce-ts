import LogoImage from "../Assets/Logo.png";
import { Footer as StyledFooter } from "./StyledComponents/StyledFooter";

const Footer = () => {
  return (
    <StyledFooter>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="footer-item">
          <div className="footer-logo">
            <a href="index.html">
              <img src={LogoImage} alt="logo" />
            </a>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris.
            <br />
            <br />
            Mauris at nulla quam.
          </p>
          <ul className="contact-info">
            <li>
              <i className="fa fa-map-marker" />
              Address: 20/F Green Road, Dhanmondi, Dhaka
            </li>
            <li>
              <i className="fa fa-phone" />
              Phone: +88 01911 854 378
            </li>
            <li>
              <i className="fa fa-envelope" />
              Email:
              <a href="mailto:patelpriyang95@gmail.com">sad @gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-6">
        <div className="footer-item">
          <h4>Useful Links</h4>
          <ul className="links">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="services.html">Services</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
            <li>
              <a href="elements.html">Elements</a>
            </li>
          </ul>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
