import React from "react";
import "/src/styles/Apply.css";
import image1 from "/src/assets/image1.png";
import image2 from "/src/assets/image2.png";
import image3 from "/src/assets/image3.png";
import Navbar from "../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
// const Donation = () => {
//   const navigate=useNavigate()
//   const name=localStorage.getItem("name")
//   console.log("donation name:",name)
 
//   return (
//     <div id="apply">
//       <Navbar />
//       <h1>Make a Contribution</h1>
//       <div className="apply-container">
//         <div className="apply-box">
//           <img src={image1} alt="Image 1" />
//           <p>Some text describing Box 1</p>
//           <Link to={`/donate/${name}/1`} className="apply-btn">Donate</Link>
//         </div>
//         <div className="apply-box">
//           <img src={image2} alt="Image 2" height="150px" />
//           <p>Some text describing Box 2</p>
//           <Link to={`/donate/${name}/2`} className="apply-btn">Donate</Link>
//         </div>
//         <div className="apply-box">
//           <img src={image3} alt="Image 3" className="image3" height="150px" />
//           <p>Some text describing Box 3</p>
//           <Link to={`/donate/${name}/3`} className="apply-btn">Donate</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Donation;



const Donation = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  console.log("donation name:", name);

  return (
    <div id="apply">
      <Navbar />
      <h1>Make a Contribution</h1>
      <div className="apply-container">
        <div className="apply-box">
          <img src={image1} alt="Image 1" /><h2>Girl Child Education</h2>
          <p> We believe that every girl deserves access to quality education. </p>
          {name? (
            <Link to={`/donate/${name}/1`} className="apply-btn">
              Donate
            </Link>
          ) : (
            <h4>Please login to donate</h4>
          )}
        </div>
        <div className="apply-box">
          <img src={image2} alt="Image 2" height="150px" />
          <h2>Disability Support</h2>
          <p>We are committed to empowering individuals with disabilities to lead fulfilling and independent lives.</p>
          {name? (
            <Link to={`/donate/${name}/2`} className="apply-btn">
              Donate
            </Link>
          ) : (
            <h4>Please login to donate</h4>
          )}
        </div>
        <div className="apply-box">
          <img src={image3} alt="Image 3" className="image3" height="150px" />
          <h2>Old Age</h2>
          <p>We offer compassionate care and support, ensuring seniors live with dignity and comfort in our old age homes.</p>
          {name? (
            <Link to={`/donate/${name}/3`} className="apply-btn">
              Donate
            </Link>
          ) : (
            <h4>Please login to donate</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donation;