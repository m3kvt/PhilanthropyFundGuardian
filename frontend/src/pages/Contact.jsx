import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin } from "react-icons/fa";
import "/src/styles/Contact.css";
const Contact = () => {
  return (
    <footer className="footer" id="contact">
    <Navbar/>
      <div className="footer-content">
        <div className="left-side">
          <h3>Aidify</h3>
          <p>1456 Park Avenue New Delhi, Delhi 110001<br/>India</p>
        </div>
        <div className="right-side">
          <h4>Connect with us</h4>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebook />
            <FaLinkedin />
          </div>
        </div>
      </div>
      <div className="bottom-line"></div>
      <div className="crafted-with-love">
        <h5>Crafted with <FaHeart className="heart"/></h5>
        <h6>©Aidify 2024</h6>
      </div>
    </footer>
  );
};

export default Contact;
