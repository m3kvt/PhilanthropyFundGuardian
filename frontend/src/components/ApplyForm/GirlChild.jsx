import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
// import { v4 as uuidv4 } from 'uuid';

const GirlChild = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        contact: {
          phoneNumber: "",
          email: "",
        },
        address: "",
        currentEducation: {
          institution: "",
          highestQualification: "",
        },
        reasonsForFunds: "",
        guardianOrParentDetails: {
          guardianOrParentName: "",
          relationshipWithApplicant: "",
          employmentDetails: "",
        },
        annualHouseholdIncome: "",
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
        "http://localhost:3001/api/submitgirlchild",
        formData
      );
      console.log("data:", response.data);
      if (response.status === 201) {
        const applicationId = response.data.applicationId;
        navigate(`/apply/1/${applicationId}`);
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
    
    <div>
    
      <h2>Form</h2>
      <div style={{ display: 'flex',width:"100%" ,justifyContent:"center"}}>
    <FaCircle color="#ccc" />
    <span style={{ marginLeft: '10px' }}>
      <FaCircle />
    </span>
  </div>
      <form onSubmit={handleInput}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Contact</h4>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="contact.phoneNumber"
            value={formData.contact.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label> Email:</label>
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <h4>Education</h4>
        <div>
          <label>Institution:</label>
          <input
            type="text"
            name="currentEducation.institution"
            value={formData.currentEducation.institution}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Highest Qualification:</label>
          <input
            type="text"
            name="currentEducation.highestQualification"
            value={formData.currentEducation.highestQualification}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reasons for Funds:</label>
          <textarea
            name="reasonsForFunds"
            value={formData.reasonsForFunds}
            onChange={handleChange}
            required
          />
        </div><h4>Guardian or Parent Information</h4>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="guardianOrParentDetails.guardianOrParentName"
            value={formData.guardianOrParentDetails.guardianOrParentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Relationship with Applicant:</label>
          <input
            type="text"
            name="guardianOrParentDetails.relationshipWithApplicant"
            value={
              formData.guardianOrParentDetails.relationshipWithApplicant
            }
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employment Details:</label>
          <input
            type="text"
            name="guardianOrParentDetails.employmentDetails"
            value={formData.guardianOrParentDetails.employmentDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Annual Household Income:</label>
          <input
            type="number"
            name="annualHouseholdIncome"
            value={formData.annualHouseholdIncome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bank Details:</label>
          <input
            type="text"
            name="bankDetails"
            value={formData.bankDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default GirlChild;
