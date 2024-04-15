import React from "react";
import "/src/styles/Apply.css";
import image1 from "/src/assets/image1.png";
import image2 from "/src/assets/image2.png";
import image3 from "/src/assets/image3.png";
import Navbar from "../components/Navbar/Navbar";
import { Link } from "react-router-dom";
const Donation = () => {
  const name=localStorage.getItem("name")
  console.log("donation name:",name)
  return (
    <div id="apply">
      <Navbar />
      <h1>Make a Contribution</h1>
      <div className="apply-container">
        <div className="apply-box">
          <img src={image1} alt="Image 1" />
          <p>Some text describing Box 1</p>
          <Link to={`/donate/${name}/1`} className="apply-btn">Donate</Link>
        </div>
        <div className="apply-box">
          <img src={image2} alt="Image 2" height="150px" />
          <p>Some text describing Box 2</p>
          <Link to={`/donate/${name}/2`} className="apply-btn">Donate</Link>
        </div>
        <div className="apply-box">
          <img src={image3} alt="Image 3" className="image3" height="150px" />
          <p>Some text describing Box 3</p>
          <Link to={`/donate/${name}/3`} className="apply-btn">Donate</Link>
        </div>
      </div>
    </div>
  );
};

export default Donation;
