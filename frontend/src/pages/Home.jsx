import React from "react";
import bg from "/src/assets/bgimg.png";
import "/src/styles/Home.css";
import Contact from "./Contact";
import Apply from "./Apply";
import Navbar from "../components/Navbar/Navbar";
import { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaArrowCircleUp, FaStar } from "react-icons/fa";
const Home = () => {
  const homeRef = useRef(null);
  const name=localStorage.getItem("name")
  console.log("home name:",name)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.getElementById('home-arrow').style.display = 'block';
      } else {
        document.getElementById('home-arrow').style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing" id="home" ref={homeRef}>
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "100vh",
          margin: 0,
          padding: 0,
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="image"
      >
        <div className="content-container">
          <div className="text-container">
            <h1>GIVE A HAND</h1>
            <p>This is some text on top of the background image.</p>
          </div>
          <div className="button-container">
            <Link to="/donate" className="donate-button">
              Donate
            </Link>
            <Link to="/apply" className="applicant-button">
              Search Funds
            </Link>
          </div>
        </div>
      </div>
      <h1 className="title">
        <span className="line"></span>
        <FaStar size="0.5em" color="00715d" />
        "Charity sees the need, not the cause."
        <FaStar size="0.5em" color="00715d" />
        <span className="line"></span>
      </h1>
      <div className="promo">
        <div className="promobox">
          <h1 className="count">594+</h1>
          <p className="countof">Donation Received</p>
        </div>
        <div className="promobox">
          <h1 className="count">$49M</h1>
          <p className="countof">Money Donated</p>
        </div>
        <div className="promobox">
          <h1 className="count">34+</h1>
          <p className="countof">Active Compaigns</p>
        </div>
        <div className="promobox">
          <h1 className="count">$34M</h1>
          <p className="countof">Charity in last year</p>
        </div>
      </div>
      <div>
        <Apply />
        <div className="arrow-container">
          <div id="home-arrow"
          className="arrow-box"
          onClick={scrollToTop}
          style={{ display: 'none' }}>
            <FaArrowCircleUp className="arrow" />
          </div>
        </div>

        <Contact />
      </div>
    </div>
  );
};

export default Home;
