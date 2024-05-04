import React from "react";
import "/src/styles/Apply.css";
import image1 from "/src/assets/image1.png";
import image2 from "/src/assets/image2.png";
import image3 from "/src/assets/image3.png";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
const Apply = () => {
  const name=localStorage.getItem("name")
  console.log("apply name:",name)
  return (
    <div id="apply">
      <Navbar />
      <h1>Search Funds</h1>
      <div className="apply-container">
        <div className="apply-box">
          <img src={image1} alt="Image 1" />
          <h2>Girl Child Education</h2>
          <p> We believe that every girl deserves access to quality education. </p>
          <Link to={`/apply/1`} className="apply-btn">Apply</Link>
        </div>
        <div className="apply-box">
          <img src={image2} alt="Image 2" height="150px" />
          <h2>Disability Support</h2>
          <p>We are committed to empowering individuals with disabilities to lead fulfilling and independent lives.</p>
          <Link to={`/apply/2`} className="apply-btn">Apply</Link>
        </div>
        
      </div>
    </div>
  );
};

export default Apply;
