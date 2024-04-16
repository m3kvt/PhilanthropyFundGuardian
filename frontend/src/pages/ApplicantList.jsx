import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowCircleLeft } from "react-icons/fa";
import "/src/styles/ApplicantList.css";
// import axios from 'axios';

const ApplicantList = () => {
  // const causeId = useParams();
  const [applicants, setApplicants] = useState([]);
  const [selectedCause, setSelectedCause] = useState(null);
  const [applicantColor, setApplicantColor] = useState({});
  const navigate = useNavigate();
  const username = localStorage.getItem("adminusername");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (value === "option1") {
      setSelectedCause(null); // Reset selectedCause to null
      // Optionally, you can navigate to a default route or perform any other action
    } else if (value === "option2") {
      setSelectedCause(1);
      navigate(`/display/apply/1`);
    } else if (value === "option3") {
      setSelectedCause(2);
      navigate(`/display/apply/2`);
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      console.log("selected cause:", selectedCause);
      try {
        if (selectedCause === 1) {
          const response = await axios.get(
            "http://localhost:3001/api/girl-child-applicants"
          );
          console.log("response girl:", response.data.data);
          setApplicants(response.data.data);
        }
        if (selectedCause === 2) {
          const response = await axios.get(
            "http://localhost:3001/api/disability-applicants"
          );
          console.log("response disability:", response.data.data);
          setApplicants(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching applicants");
      }
    };

    fetchApplicants();
  }, [selectedCause]);
  const handleAcceptGirl = async (applicationId) => {
    console.log("applicationId:", applicationId);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/acceptgirlchild/${applicationId}`
      );
      console.log(response.data.message); // Log the response message from the backend

      setApplicantColor((prevColors) => ({
        ...prevColors,
        [applicationId]: "green",
      }));
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
      console.log(response.data.message); // Log the response message from the backend

      setApplicantColor((prevColors) => ({
        ...prevColors,
        [applicationId]: "green",
      }));
    } catch (error) {
      console.error("Error accepting disability application:", error);
      // Handle error, show error message, etc.
    }
  };

  const handleReject = async (applicationId) => {
    console.log("applicationId:", applicationId);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/reject/${applicationId}`
      );
      console.log(response.data.message); // Log the response message from the backend

      setApplicantColor((prevColors) => ({
        ...prevColors,
        [applicationId]: "red",
      }));
    } catch (error) {
      console.error("Error rejecting application:", error);
      // Handle error, show error message, etc.
    }
  };
  return (
    <div id="applicantlist" className="applicantlist">
      <h2 className="text-center">
        <Link to={`/admin/${username}`}>
          <FaArrowCircleLeft color="#000" />
        </Link>
        Applicant List
      </h2>
      <label htmlFor="dropdown" className="dropdown-label">
        Select the cause:
      </label>
      <select id="dropdown" className="dropdown" onChange={handleSelectChange}>
        <option value="option1">select</option>
        <option value="option2">Cause 1</option>
        <option value="option3">Cause 2</option>
      </select>

      {selectedCause === 1 && (
        <ul className="applicant-list">
          {applicants.map((applicant) => (
            <li
              key={applicant.applicationId}
              className={`applicant-item ${
                applicantColor[applicant.applicationId] || ""
              }`}
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

                <button
                  className="button"
                  onClick={() => handleReject(applicant.applicationId)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedCause === 2 && (
        <ul className="applicant-list">
          {applicants.map((applicant) => (
            <li
              key={applicant.applicationId}
              className={`applicant-item ${
                applicantColor[applicant.applicationId] || ""
              }`}
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
                <button
                  className="button"
                  onClick={() => handleReject(applicant.applicationId)}
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicantList;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { FaArrowCircleLeft } from "react-icons/fa";
// import "/src/styles/ApplicantList.css";
// // import axios from 'axios';

// const ApplicantList = () => {
//   // const causeId = useParams();
//   const [applicants, setApplicants] = useState([]);
//   const [selectedCause, setSelectedCause] = useState(null);
//   const [applicantColor, setApplicantColor] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const username = localStorage.getItem("adminusername");
//   const handleSelectChange = (event) => {
//     const value = event.target.value;
//     console.log(value);
//     if (value === "option2") {
//       setSelectedCause(1);
//       navigate(`/display/apply/1`);
//     } else if (value === "option3") {
//       setSelectedCause(2);
//       navigate(`/display/apply/2`);
//     }
//   };

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       setLoading(true);
//       try {
//         if (selectedCause === 1) {
//           const response = await axios.get(
//             `http://localhost:3001/api/girl-child-applicants`
//           );
//           console.log("response girl:", response.data.data);
//           setApplicants(response.data.data);
//         } else if (selectedCause === 2) {
//           const response = await axios.get(
//             `http://localhost:3001/api/disability-applicants`
//           );
//           console.log("response disability:", response.data.data);
//           setApplicants(response.data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching applicants");
//       }
//       setLoading(false);
//     };

//     fetchApplicants();
//   }, [selectedCause]);
//   const handleAcceptGirl = async (applicationId) => {
//     console.log("applicationId:", applicationId);
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/acceptgirlchild/${applicationId}`
//       );
//       console.log(response.data.message); // Log the response message from the backend

//       setApplicantColor((prevColors) => ({
//         ...prevColors,
//         [applicationId]: "green",
//       }));
//     } catch (error) {
//       console.error("Error accepting girl application:", error);
//       // Handle error, show error message, etc.
//     }
//   };

//   const handleAcceptDisability = async (applicationId) => {
//     console.log("applicationId:", applicationId);
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/acceptdisability/${applicationId}`
//       );
//       console.log(response.data.message); // Log the response message from the backend

//       setApplicantColor((prevColors) => ({
//         ...prevColors,
//         [applicationId]: "green",
//       }));
//     } catch (error) {
//       console.error("Error accepting disability application:", error);
//       // Handle error, show error message, etc.
//     }
//   };

//   const handleReject = async (applicationId) => {
//     console.log("applicationId:", applicationId);
//     try {
//       const response = await axios.post(
//         `http://localhost:3001/api/reject/${applicationId}`
//       );
//       console.log(response.data.message); // Log the response message from the backend

//       setApplicantColor((prevColors) => ({
//         ...prevColors,
//         [applicationId]: "red",
//       }));
//     } catch (error) {
//       console.error("Error rejecting application:", error);
//       // Handle error, show error message, etc.
//     }
//   };
//   return (
//     <div id="applicantlist" className="applicantlist">
//     {loading ? (
//         <div>Loading...</div>
//       ) : (
//     <div>
//       <h2 className="text-center">
//         <Link to={`/admin/${username}`}>
//           <FaArrowCircleLeft color="#000" />
//         </Link>
//         Applicant List
//       </h2>

//       <label htmlFor="dropdown" className="dropdown-label">
//         Select the cause:
//       </label>
//       <select id="dropdown" className="dropdown" onChange={handleSelectChange}>
//         <option value="option1">select</option>
//         <option value="option2">Cause 1</option>
//         <option value="option3">Cause 2</option>
//       </select>

//       {selectedCause === 1 && (
//         <ul className="applicant-list">
//           {applicants.map((applicant) => (
//             <li
//               key={applicant.applicationId}
//               className={`applicant-item ${
//                 applicantColor[applicant.applicationId] || ""
//               }`}
//             >
//               <details className="applicant-details">
//                 <summary className="applicant-summary">
//                   <div className="summary-content">
//                     <p className="name">Name: {applicant.fullName}</p>
//                     <p className="name">
//                       Application Id: {applicant.applicationId}
//                     </p>
//                     <p className="dob">
//                       DOB{""}:{" "}
//                       {new Date(applicant.dateOfBirth).toLocaleDateString(
//                         "en-US",
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         }
//                       )}
//                     </p>
//                     <p className="reasons">
//                       Reasons for Fund: {applicant.reasonsForFunds}
//                     </p>
//                   </div>
//                 </summary>
//                 <div className="applicant-info">
//                   <div className="contact-info">
//                     <label className="contact-label">Contact Information</label>
//                     <p className="phone">
//                       Phone No: {applicant.contact.phoneNumber}
//                     </p>
//                     <p className="email">Email: {applicant.contact.email}</p>
//                     <p className="address">Address: {applicant.address}</p>
//                   </div>
//                   <div className="education-info">
//                     <label className="education-label">
//                       Educational Information
//                     </label>
//                     <p className="institution">
//                       Institution: {applicant.currentEducation.institution}
//                     </p>
//                     <p className="qualification">
//                       Highest Qualification:{" "}
//                       {applicant.currentEducation.highestQualification}
//                     </p>
//                   </div>
//                   <div className="guardian-info">
//                     <label className="guardian-label">
//                       Guardian Information
//                     </label>
//                     <p className="guardian-name">
//                       Name:{" "}
//                       {applicant.guardianOrParentDetails.guardianOrParentName}
//                     </p>
//                     <p className="relationship">
//                       Relationship:{" "}
//                       {
//                         applicant.guardianOrParentDetails
//                           .relationshipWithApplicant
//                       }
//                     </p>
//                     <p className="employment">
//                       Job: {applicant.guardianOrParentDetails.employmentDetails}
//                     </p>
//                     <p className="guardian-contact">
//                       Guardian Contact:{" "}
//                       {applicant.guardianOrParentDetails.contactNo}
//                     </p>
//                     <p className="annual-income">
//                       Annual Income: ₹{applicant.annualHouseholdIncome}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="file-urls">
//                   <label style={{ fontWeight: "bold" }}>
//                     Uploaded Certificates
//                   </label>
//                   <p>
//                     Birth Certificate:
//                     <a
//                       href={applicant.fileURLs.birthCertificate}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                   <p>
//                     Education Certificate:
//                     <a
//                       href={applicant.fileURLs.educationCertificate}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                   <p>
//                     Income Certificate:
//                     <a
//                       href={applicant.fileURLs.incomeCertificate}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                 </div>
//               </details>
//               <div className="buttons">
//                 <button
//                   className="button"
//                   onClick={() => handleAcceptGirl(applicant.applicationId)}
//                 >
//                   Accept
//                 </button>

//                 <button
//                   className="button"
//                   onClick={() => handleReject(applicant.applicationId)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       {selectedCause === 2 && (
//         <ul className="applicant-list">
//           {applicants.map((applicant) => (
//             <li
//               key={applicant.applicationId}
//               className={`applicant-item ${
//                 applicantColor[applicant.applicationId] || ""
//               }`}
//             >
//               <details className="applicant-details">
//                 <summary className="applicant-summary">
//                   <div className="summary-content">
//                     <p className="name">Name: {applicant.fullName}</p>
//                     <p className="name">
//                       Application Id: {applicant.applicationId}
//                     </p>
//                     <p className="dob">
//                       DOB{""}:{" "}
//                       {new Date(applicant.dateOfBirth).toLocaleDateString(
//                         "en-US",
//                         {
//                           year: "numeric",
//                           month: "long",
//                           day: "numeric",
//                         }
//                       )}
//                     </p>
//                     <p className="reasons">
//                       Type of Disability: {applicant.typeOfDisability}
//                     </p>
//                     <p className="reasons">
//                       Severity of Disability: {applicant.severityOfDisability}
//                     </p>
//                   </div>
//                 </summary>
//                 <div className="applicant-info">
//                   <div className="contact-info">
//                     <label className="contact-label">Contact Information</label>
//                     <p className="phone">
//                       Phone No: {applicant.contact.phoneNumber}
//                     </p>
//                     <p className="email">Email: {applicant.contact.email}</p>
//                     <p className="address">Address: {applicant.address}</p>
//                   </div>
//                   <div className="education-info">
//                     <label className="education-label">
//                       Employment Information
//                     </label>
//                     <p className="employment">
//                       Employment Status: {applicant.employmentStatus}
//                     </p>
//                     <p className="annual-income">
//                       Annual Income: ₹{applicant.annualIncome}
//                     </p>
//                   </div>
//                   <div className="support-info">
//                     <label className="support-label">Support Information</label>
//                     <p className="support-needed">
//                       Support Needed: {applicant.supportNeeded}
//                     </p>
//                     <p className="bank-details">
//                       Bank Details: {applicant.bankDetails}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="file-urls">
//                   <label style={{ fontWeight: "bold" }}>
//                     Uploaded Certificates
//                   </label>
//                   <p>
//                     ID Proof:
//                     <a
//                       href={applicant.fileURLs.idProof[0]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                   <p>
//                     Medical Certificate:
//                     <a
//                       href={applicant.fileURLs.medicalCertificate[0]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                   <p>
//                     Medical Records:
//                     <a
//                       href={applicant.fileURLs.medicalRecords[0]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                   <p>
//                     Income Certificate:
//                     <a
//                       href={applicant.fileURLs.incomeCertificate[0]}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Download
//                     </a>
//                   </p>
//                 </div>
//               </details>
//               <div className="buttons">
//                 <button
//                   className="button"
//                   onClick={() =>
//                     handleAcceptDisability(applicant.applicationId)
//                   }
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="button"
//                   onClick={() => handleReject(applicant.applicationId)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       </div>
//     )}
//     </div>
//   );
// };

// export default ApplicantList;
