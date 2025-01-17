import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
// import { v4 as uuidv4 } from 'uuid';
import "./GirlChild.css";
import Navbar from "../Navbar/Navbar";
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
        "https://philanthropyfundguardian.onrender.com/api/submitgirlchild",
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
    <div id="girlchild">
    <Navbar/>
      <h2>GIRL CHILD EDUCATION</h2>
      <br />
      <div className="progress">
        <FaCircle />
        <span>
          <FaCircle color="#ccc" />
        </span>
      </div>
      <br/>
      <div className="content">
        <div className="details">
          <h3>Eligibility to apply for the scheme</h3><br/>
          <p>
            1. Applicant's Gender: The funding is available for girls and young
            women.
          </p>
          <p>
            2. Age Requirement: Applicants should fall within the specified age
            of not less than 18 range for educational support .
          </p>
          <p>
            3. Financial Need: Applicants must demonstrate financial need,
            usually by providing documentation of household income.
          </p>
          <p>
            4. Educational Enrollment: Applicants should be enrolled in an
            educational institution, such as a school(Primary or secondary) or
            vocational training program.
          </p><br/><br/>
          <h3>Documents to uploaded :</h3><br/>
          <p>
            1. Proof of Identity: Scanned copy of government-issued
            identification -birth certificate , Aadhar Card
          </p>
          <p>
            2. Proof of Residence: Utility bill, rental agreement, or any
            official document indicating the applicant's current residential
            address.
          </p>
          <p>
            3. Educational Documentation: Enrollment letter or school records,
            tuition fee receipts, or any other educational documentation.
          </p>
          <p>
            4. Financial Statement: Recent bank statements, income tax returns,
            or any other financial documentation to demonstrate the applicant's
            financial situation.
          </p>
          <p>
            5. Bank Details: Account Holder Name, Bank Name, Account Number IFSC
            Code, Branch Name.
          </p>
        </div>
        <div className="image">
        <img src="/src/assets/girl.png"/>
        </div>
      </div>
      <br/>
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
        <h4>Contact</h4>
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
        <h4>Education</h4>
        <div className="formdetails">
          <label>Institution:</label>
          <input
            type="text"
            name="currentEducation.institution"
            value={formData.currentEducation.institution}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formdetails">
          <label>Highest Qualification:</label>
          <input
            type="text"
            name="currentEducation.highestQualification"
            value={formData.currentEducation.highestQualification}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formdetails">
          <label>Reasons for Funds:</label>
          <textarea
            name="reasonsForFunds"
            value={formData.reasonsForFunds}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <h4>Guardian or Parent Information</h4>

        <div className="formdetails">
          <label>Name:</label>
          <input
            type="text"
            name="guardianOrParentDetails.guardianOrParentName"
            value={formData.guardianOrParentDetails.guardianOrParentName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formdetails">
          <label>Relationship with Applicant:</label>
          <input
            type="text"
            name="guardianOrParentDetails.relationshipWithApplicant"
            value={formData.guardianOrParentDetails.relationshipWithApplicant}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formdetails">
          <label>Employment Details:</label>
          <input
            type="text"
            name="guardianOrParentDetails.employmentDetails"
            value={formData.guardianOrParentDetails.employmentDetails}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formdetails">
          <label>Annual Household Income:</label>
          <input
            type="number"
            name="annualHouseholdIncome"
            value={formData.annualHouseholdIncome}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="Submit">
        <button type="submit">Next</button>
        </div>
      </form>
      <br />
      <br />
    </div>
  );
};

export default GirlChild;
