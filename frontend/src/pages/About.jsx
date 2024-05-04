import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "/src/styles/About.css";
import aboutus from "/aboutus.png";
import { Link } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import Contact from "./Contact";
const About = () => {
  return (
    <div id="about">
      <Navbar />
      <div className="about">
        <h1>ABOUT US</h1>
        <div className="about-content">
          <div
            className="paragraphs"
            style={{
              // Set width to fit half of the left side
              float: "left", // Float the paragraphs to the left
            }}
          >
            <p className="paras">
              Welcome to Aidify, dedicated to making a positive impact on
              communities in need. Our mission is simple: to address pressing
              social issues with compassion and integrity.
            </p>
            <p className="paras">
              Mission: We're committed to serving humanity with empathy,
              transparency, and collaboration. Our focus is on empowering
              individuals and communities to create a better future.
            </p>
            <Link to="/donate" className="join-community">
              Join Community
            </Link>
          </div>

          <div
            style={{
              // Set width to fit half of the right side
              float: "right", // Float the image to the right
              textAlign: "center", // Adjust height automatically to maintain aspect ratio
            }}
            className="image"
          >
            <img
              src={aboutus}
              alt="About Us"
              style={{
                maxWidth: "75%", // Set image width to 100%
                maxHeight: "100%", // Set image height to 100%
                // objectFit: "cover", // Maintain aspect ratio and cover entire container
              }}
            />
          </div>
        </div>
        <div className="quote-section">
          <h1 className="title">
            <span className="line"></span>"Every act of kindness is a beacon of
            hope, lighting up the lives of those in need."
            <span className="line"></span>
          </h1>
          <p style={{ paddingLeft: "50px", color: "#00725E" }}>Testimonial</p>
          <h2 style={{ paddingLeft: "50px" }}>What People Say About Us</h2>
          <div className="boxes">
            <div className="box">
              <FaQuoteLeft color="#00725E" />
              <h3>Generosity and Compassion</h3>
              <p className="boxpara">
                "As a beneficiary of the programs supported by this trust, I
                can't express enough gratitude for their generosity and
                compassion. They provide crucial assistance to individuals and
                families during difficult times."{" "}
              </p>
              <div class="profile">
                <img
                  src="/prof1.png"
                  alt="Profile Picture"
                  class="profile-image"
                  width="50px"
                />
                <div class="profile-info">
                  <p class="name">Alex Carterc</p>
                  <p class="designation">Program Participant</p>
                </div>
              </div>
            </div>
            <div className="box">
              <FaQuoteLeft color="#00725E" />
              <h3>Trust</h3>
              <p className="boxpara">
                "This trust goes above and beyond to ensure that every dollar
                donated is used effectively and efficiently. Their commitment to
                accountability and their track record of success make them a
                trusted partner in philanthropy."{" "}
              </p>
              <div class="profile">
                <img
                  src="/prof2.png"
                  alt="Profile Picture"
                  class="profile-image"
                  width="50px"
                />
                <div class="profile-info">
                  <p class="name">Jack Harry</p>
                  <p class="designation">supporter </p>
                </div>
              </div>
            </div>
            <div className="box">
              <FaQuoteLeft color="#00725E" />
              <h3>Community</h3>
              <p className="boxpara">
                "I wholeheartedly endorse this charitable trust. Their tireless
                efforts to address pressing social issues and their
                collaborative approach to problem-solving make them an
                invaluable asset to our community."{" "}
              </p>
              <div class="profile">
                <img
                  src="/prof3.png"
                  alt="Profile Picture"
                  class="profile-image"
                  width="50px"
                />
                <div class="profile-info">
                  <p class="name">Sakib Hossain</p>
                  <p class="designation">Community Leader</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default About;
