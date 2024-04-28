import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
import "/src/styles/ApplicantList.css";
const WaitingList = () => {
  const username = localStorage.getItem("adminusername");
  const [selectedCause, setSelectedCause] = useState(null);
  const [waitingListData, setWaitingListData] = useState([]);
//   const [applicantColor, setApplicantColor] = useState({});
const navigate=useNavigate();
  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value === "option2") {
      setSelectedCause(1);
      navigate(`/display/waiting/1`);
      fetchWaitingListData("/waitinggirl");
      
    } else if (value === "option3") {
      setSelectedCause(2);
      navigate(`/display/waiting/2`);
      fetchWaitingListData("/waitingdisability");
      
    }
  };

  const fetchWaitingListData = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3001/api${url}`);
      console.log("response", response.data.data);
      setWaitingListData(response.data.data);
      if (response.data.data.length===0){
        alert("No applicants in waiting list.")
      }
    } catch (error) {
      console.error("Error fetching waiting list data:", error);
    }
  };

  useEffect(() => {
    if (selectedCause === 1) {
      // Display waiting list data for Cause 1
      
      console.log(waitingListData);
    } else if (selectedCause === 2) {
      // Display waiting list data for Cause 2
      console.log(waitingListData);
    }
  }, [waitingListData]);

  const handleAcceptGirl = async (applicationId) => {
    console.log("applicationId:", applicationId);
    
    try {
      const response = await axios.post(
        `http://localhost:3001/api/acceptgirlchild/${applicationId}`
      );
      console.log("response message:",response.data.message); // Log the response message from the backend

    //   setApplicantColor((prevColors) => ({
    //     ...prevColors,
    //     [applicationId]: "green",
    //   }));
      alert(response.data.message)
    } catch (error) {
      console.error("Error accepting girl application:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleAcceptDisability = async (applicationId) => {
    console.log("applicationId:", applicationId);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/acceptdisability/${applicationId}`
      );
      console.log("response message:",response.data.message); // Log the response message from the backend

    //   setApplicantColor((prevColors) => ({
    //     ...prevColors,
    //     [applicationId]: "green",
    //   }));
    alert(response.data.message)
    } catch (error) {
      console.error("Error accepting disability application:", error);
      // Handle error, show error message, etc.
    }
  };



  return (
    <div id="applicantlist" className="applicantlist">
      <h2 className="text-center">
        <Link to="/display/apply/$causeId">
          <FaArrowCircleLeft color="#000" />
        </Link>
        Waiting List
      </h2>
      <label htmlFor="dropdown" className="dropdown-label">
        Select the cause:
      </label>
      <select id="dropdown" className="dropdown" onChange={handleSelectChange}>
        <option value="option1">select</option>
        <option value="option2">Girl Child Education</option>
        <option value="option3">Disability Support</option>
      </select>
      {selectedCause === 1 && (
        <ul className="applicant-list">
          {/* Display waiting list data for Cause 1 */}
          {waitingListData.map((applicant) => (
            <li
              key={applicant.applicationId}
              className="applicant-item"
            >
              <details className="applicant-details">
                <summary className="applicant-summary">
                  <div className="summary-content">
                    <p className="name">Name: {applicant.fullName}</p>
                    <p className="name">
                      Application Id: {applicant.applicationId}
                    </p>
                    <p className="dob">
                      DOB{""}:{" "}
                      {new Date(applicant.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className="reasons">
                      Reasons for Fund: {applicant.reasonsForFunds}
                    </p>
                  </div>
                </summary>
                <div className="applicant-info">
                  <div className="contact-info">
                    <label className="contact-label">Contact Information</label>
                    <p className="phone">
                      Phone No: {applicant.contact.phoneNumber}
                    </p>
                    <p className="email">Email: {applicant.contact.email}</p>
                    <p className="address">Address: {applicant.address}</p>
                  </div>
                  <div className="education-info">
                    <label className="education-label">
                      Educational Information
                    </label>
                    <p className="institution">
                      Institution:{" "}
                      {applicant.currentEducation?.institution || "N/A"}
                    </p>
                    <p className="qualification">
                      Highest Qualification:{" "}
                      {applicant.currentEducation?.highestQualification ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="guardian-info">
                    <label className="guardian-label">
                      Guardian Information
                    </label>
                    <p className="guardian-name">
                      Name:{" "}
                      {applicant.guardianOrParentDetails
                        ?.guardianOrParentName || "N/A"}
                    </p>
                    <p className="relationship">
                      Relationship:{" "}
                      {applicant.guardianOrParentDetails
                        ?.relationshipWithApplicant || "N/A"}
                    </p>
                    <p className="employment">
                      Job:{" "}
                      {applicant.guardianOrParentDetails?.employmentDetails ||
                        "N/A"}
                    </p>
                    <p className="guardian-contact">
                      Guardian Contact:{" "}
                      {applicant.guardianOrParentDetails?.contactNo || "N/A"}
                    </p>

                    <p className="annual-income">
                      Annual Income: ₹{applicant.annualHouseholdIncome}
                    </p>
                  </div>
                </div>
                <div className="file-urls">
                  <label style={{ fontWeight: "bold" }}>
                    Uploaded Certificates
                  </label>
                  <p>
                    Birth Certificate:
                    <a
                      href={applicant.fileURLs.birthCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    Education Certificate:
                    <a
                      href={applicant.fileURLs.educationCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    Income Certificate:
                    <a
                      href={applicant.fileURLs.incomeCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                </div>
              </details>
              <div className="buttons">
                <button
                  className="button"
                  onClick={() => handleAcceptGirl(applicant.applicationId)}
                >
                  Accept
                </button>

                
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedCause === 2 && (
        <ul className="applicant-list">
          {/* Display waiting list data for Cause 2 */}
          {waitingListData.map((applicant) => (
            <li
              key={applicant.applicationId}
              className="applicant-item"
            >
              <details className="applicant-details">
                <summary className="applicant-summary">
                  <div className="summary-content">
                    <p className="name">Name: {applicant.fullName}</p>
                    <p className="name">
                      Application Id: {applicant.applicationId}
                    </p>
                    <p className="dob">
                      DOB{""}:{" "}
                      {new Date(applicant.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    <p className="reasons">
                      Type of Disability: {applicant.typeOfDisability}
                    </p>
                    <p className="reasons">
                      Severity of Disability: {applicant.severityOfDisability}
                    </p>
                  </div>
                </summary>
                <div className="applicant-info">
                  <div className="contact-info">
                    <label className="contact-label">Contact Information</label>
                    <p className="phone">
                      Phone No: {applicant.contact.phoneNumber}
                    </p>
                    <p className="email">Email: {applicant.contact.email}</p>
                    <p className="address">Address: {applicant.address}</p>
                  </div>
                  <div className="education-info">
                    <label className="education-label">
                      Employment Information
                    </label>
                    <p className="employment">
                      Employment Status: {applicant.employmentStatus}
                    </p>
                    <p className="annual-income">
                      Annual Income: ₹{applicant.annualIncome}
                    </p>
                  </div>
                  <div className="support-info">
                    <label className="support-label">Support Information</label>
                    <p className="support-needed">
                      Support Needed: {applicant.supportNeeded}
                    </p>
                    <p className="bank-details">
                      Bank Details: {applicant.bankDetails}
                    </p>
                  </div>
                </div>
                <div className="file-urls">
                  <label style={{ fontWeight: "bold" }}>
                    Uploaded Certificates
                  </label>
                  <p>
                    ID Proof:
                    <a
                      href={applicant.fileURLs.idProof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    Medical Certificate:
                    <a
                      href={applicant.fileURLs.medicalCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    Medical Records:
                    <a
                      href={applicant.fileURLs.medicalRecords}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                  <p>
                    Income Certificate:
                    <a
                      href={applicant.fileURLs.incomeCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </p>
                </div>
              </details>
              <div className="buttons">
                <button
                  className="button"
                  onClick={() =>
                    handleAcceptDisability(applicant.applicationId)
                  }
                >
                  Accept
                </button>
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaitingList;
