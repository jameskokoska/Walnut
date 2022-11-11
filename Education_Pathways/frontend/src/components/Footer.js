import React from "react";
import footer from "./img/footer.png";

const Footer = () => (
  <footer className="footer">
    {/* {logo} */}
    <img src={footer} alt="" />{" "}
    <p style = {{textAlign: "right"}} className = "footer-description-copyright">
      © 2021 Walnut
    </p>
  </footer>
);

export default Footer;
