import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h4>About us</h4>
            <p>
              Lorem Ipsum ist einfach Dummy-Text der Druck- und Satzindustrie.
              Lorem Ipsum war der Standard der Branche Lorem Ipsum ist einfach
              Dummy-Text der Druck- und Satzindustrie. Lorem Ipsum war der
              Standard der Branche
            </p>
          </div>

          <div className="col-md-4">
            <h4>Information</h4>
            <ul className="address1">
              <li>
                <i className="fas fa-map-marker"></i> Pnhom Penh
              </li>
              <li>
                <i className="fas fa-envelope"></i
                ><a href="mailto:#"> info@test.com</a>
              </li>
              <li>
                <i className="fas fa-mobile-alt"></i>
                <a href="tel:12 34 56 78 90"> 12 34 56 78 90</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4>Follow us</h4>
            <ul className="social-icon">
              <li>
                <a><i className="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a><i className="fab fa-instagram"></i></a>
              </li>
              <li>
                <a><i className="fab fa-twitter"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;

