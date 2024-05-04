import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "/src/styles/DonorList.css";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
// import "/src/styles/Admin.css"

const DonorList = () => {
  const causeId = useParams();
  console.log("causeId :", causeId);
  localStorage.setItem("causeId", causeId);
  const username = localStorage.getItem("adminusername");
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value === "option2") {
      navigate("/display/donor/1");
    } else if (value === "option3") {
      navigate("/display/donor/2");
    }
    else if (value === "option4") {
      navigate("/display/donor/3");
    }
  };
  console.log("cause.cause",causeId.causeId)
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/display/${causeId.causeId}`
        );
        setDonors(response.data);
        console.log("data:", response.data);
      } catch (error) {
        console.error("Error fetching donors");
      }
    };
    fetchDonors();
  }, [causeId.causeId]);

  // const [expanded, setExpanded] = useState(null);

  // const toggleExpanded = (id) => {
  //   if (expanded === id) {
  //     setExpanded(null);
  //   } else {
  //     setExpanded(id);
  //   }
  // };

  return (
    <div id="donorlist" classname="donorlist">
      <h2>
        <Link to={`/admin/${username}`}>
          <FaArrowCircleLeft  className="arrow"/>
        </Link>
        Donor List
      </h2>
      <label textAlign="center">Select the cause:</label>
      <select id="dropdown" onChange={handleSelectChange}>
        <option value="option1">select</option>
        <option value="option2">Girl Child Education</option>
        <option value="option3">Disability Support</option>
        <option value="option4">Old Age Funds</option>
      </select>
      <ul>
        {donors.map((donor) => (
          <div key={donor._id}>
            <details>
              <summary>{donor.name}</summary>
              <div className="active">
                <p>Email: {donor.email}</p>
                <p>ContactNo: {donor.contactNo}</p>
                <p>Address: {donor.address}</p>
                <p>Amount Donated: {donor.amount}</p>
              </div>
            </details>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DonorList;
