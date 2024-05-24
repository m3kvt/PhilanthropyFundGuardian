import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
// import { v4 as uuidv4 } from 'uuid';
import "./Disability.css";
import Navbar from "../Navbar/Navbar";
const Disability = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    contact: {
      phoneNumber: "",
      email: "",
    },
    address: "",
    typeOfDisability: "",
    severityOfDisability: "",
    mobilityAids: "",
    dailyAssistance: "",
    employmentStatus: "",
    annualIncome: "",
    supportNeeded: "",
    bankDetails: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parts = name.split(".");

    if (parts.length === 2) {
      setFormData((prevState) => ({
        ...prevState,
        [parts[0]]: { ...prevState[parts[0]], [parts[1]]: value },
      }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleInput = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/submitdisability",
        formData
      );
      console.log("data:", response.data);
      if (response.status === 201) {
        const applicationId = response.data.applicationId;
        navigate(`/apply/2/${applicationId}`);
      } else {
        throw new Error("Error submitting application");
      }
    } catch (error) {
      console.error("Error :", error);
      alert(
        "An error occurred while submitting the application. Please try again."
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div id="disabilitysupport">
      <Navbar />
      <h2>DISABILITY SUPPORT</h2>
      <div
        className="progress"
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        <FaCircle />
        <span style={{ marginLeft: "10px" }}>
          <FaCircle color="#ccc" />
        </span>
      </div>
      <div className="Content">
        <div className="Eligibility">
          <h3>Eligibility to apply for the scheme</h3>
          <br />
          <p>
            1. Applicant's Disability: The funding is available for individuals
            with disabilities.
          </p>
          <p>
            2. Financial Need: Applicants must demonstrate financial need,
            usually by providing documentation of household income.
          </p>
          <p>
            3. Medical Diagnosis: Applicants should provide medical
            documentation verifying their disability and need for support.
          </p>
          <p>
            4. Description of Need: Applicants should provide a detailed
            description of the specific disability-related need for which
            funding is being requested.
          </p>
          <br />
          <h3>Documents to uploaded :</h3>
          <br />
          <p>
            1. Proof of Identity: Scanned copy of government-issued
            identification-birth certificate , Aadhar Card .
          </p>
          <p>
            2. Proof of Residence: Utility bill, rental agreement, or any
            official document indicating the applicant's current residential
            address.
          </p>
          <p>
            3. Medical Documentation: Medical reports, disability certificates,
            or letters from healthcare professionals.
          </p>
          <p>
            4. Financial Statement: Recent bank statements, income tax returns,
            or any other financial documentation to demonstrate the applicant's
            financial situation.
          </p>
        </div>
        <div className="image">
          <img src="/src/assets/disability.png" />
        </div>
      </div>
      <br />
      <br />
      <hr />
      <form className="form" onSubmit={handleInput}>
        <div className="formdetails">
          <label>Full Name:</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Date of Birth:</label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <h3>Contact</h3>

        <div className="formdetails">
          <label>Phone Number:</label>

          <input
            type="tel"
            name="contact.phoneNumber"
            value={formData.contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label> Email:</label>
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Type of Disability:</label>

          <input
            type="text"
            name="typeOfDisability"
            value={formData.typeOfDisability}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Severity of Disability:</label>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="severityOfDisability"
                value="high"
                checked={formData.severityOfDisability === "high"}
                onChange={handleChange}
                required
              />
              <label htmlFor="high">High</label>
            </div>
            <div>
              <input
                type="radio"
                name="severityOfDisability"
                value="moderate"
                checked={formData.severityOfDisability === "moderate"}
                onChange={handleChange}
                required
              />
              <label htmlFor="moderate">Moderate</label>
            </div>
            <div>
              <input
                type="radio"
                name="severityOfDisability"
                value="low"
                checked={formData.severityOfDisability === "low"}
                onChange={handleChange}
                required
              />
              <label htmlFor="low">Low</label>
            </div>
          </div>
        </div>
        <br />
        <div className="formdetails">
          <label>Mobility Aids:</label>

          <input
            type="text"
            name="mobilityAids"
            value={formData.mobilityAids}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Daily Assistance:</label>

          <input
            type="text"
            name="dailyAssistance"
            value={formData.dailyAssistance}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Employment Status:</label>
          <input
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Annual Income:</label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Support Needed:</label>

          <input
            type="text"
            name="supportNeeded"
            value={formData.supportNeeded}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="formdetails">
          <label>Bank Details:</label>

          <input
            type="text"
            name="bankDetails"
            value={formData.bankDetails}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="button">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Disability;
