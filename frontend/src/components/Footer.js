import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-social">
        <a href="https://youtu.be/dQw4w9WgXcQ">
          <i className="fab fa-facebook-square"></i> Facebook
        </a>

        <a href="https://youtu.be/dQw4w9WgXcQ">
          <i className="fab fa-instagram-square"></i> Instagram
        </a>

        <a href="https://youtu.be/dQw4w9WgXcQ">
          <i className="fab fa-twitter-square"></i> Twitter
        </a>
      </div>
      <div className="footer-contact">
        <a href="tel:0000000000">Call us at 00000-00000</a>
        <a href="mailto:care@dhaba.com">E-Mail us at care@dhaba.com</a>
        &copy; Chintu Da Dhaba
      </div>
    </div>
  );
}

export default Footer;
