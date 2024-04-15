import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
// import { v4 as uuidv4 } from 'uuid';

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
        "http://localhost:3001/submitdisability",
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
    <div>
      <h2>Form</h2>
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <FaCircle color="#ccc" />
        <span style={{ marginLeft: "10px" }}>
          <FaCircle />
        </span>
      </div>
      <form onSubmit={handleInput}>
        <div>
          <label>Application ID:</label>
        </div>
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
        <div>
          <label>Type of Disability:</label>
          <input
            type="text"
            name="typeOfDisability"
            value={formData.typeOfDisability}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Severity of Disability:</label>
          <input
            type="text"
            name="severityOfDisability"
            value={formData.severityOfDisability}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobility Aids:</label>
          <input
            type="text"
            name="mobilityAids"
            value={formData.mobilityAids}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Daily Assistance:</label>
          <input
            type="text"
            name="dailyAssistance"
            value={formData.dailyAssistance}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Employment Status:</label>
          <input
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Annual Income:</label>
          <input
            type="number"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Support Needed:</label>
          <input
            type="text"
            name="supportNeeded"
            value={formData.supportNeeded}
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
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Disability;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaCircle } from "react-icons/fa";
// // import { v4 as uuidv4 } from 'uuid';

// const Disability = () => {
//   const [formData, setFormData] = useState({

//     fullName: "",
//     dateOfBirth: "",
//     contact: {
//       phoneNumber: "",
//       email: "",
//     },
//     address: "",
//     typeOfDisability: "",
//     severityOfDisability: "",
//     mobilityAids: "",
//     dailyAssistance: "",
//     employmentStatus: "",
//     annualIncome: "",
//     supportNeeded: "",
//     bankDetails: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const parts = name.split(".");

//     if (parts.length === 2) {
//       setFormData((prevState) => ({
//         ...prevState,
//         [parts[0]]: { ...prevState[parts[0]], [parts[1]]: value },
//       }));
//     } else {
//       setFormData((prevState) => ({ ...prevState, [name]: value }));
//     }
//   };

//   const handleInput = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/submitdisability",
//         formData
//       );
//       console.log("data:", response.data);
//       if (response.status === 201) {
//         const applicationId = response.data.applicationId;
//         navigate(`/apply/2/${applicationId}`);
//       } else {
//         throw new Error("Error submitting application");
//       }
//     } catch (error) {
//       console.error("Error :", error);
//       alert(
//         "An error occurred while submitting the application. Please try again."
//       );
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <h2>Form</h2>
//       <div style={{ display: 'flex',width:"100%" ,justifyContent:"center"}}>
//     <FaCircle color="#ccc" />
//     <span style={{ marginLeft: '10px' }}>
//       <FaCircle />
//     </span>
//   </div>
//       <form onSubmit={handleInput}>
//         <div>
//           <label>Application ID:</label>

//         </div>
//         <div>
//           <label>Full Name:</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <h4>Contact</h4>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="tel"
//             name="contact.phoneNumber"
//             value={formData.contact.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label> Email:</label>
//           <input
//             type="email"
//             name="contact.email"
//             value={formData.contact.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Address:</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
// required
//           />
//         </div>
//         <div>
//           <label>Type of Disability:</label>
//           <input
//             type="text"
//             name="typeOfDisability"
//             value={formData.typeOfDisability}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Severity of Disability:</label>
//           <input
//             type="text"
//             name="severityOfDisability"
//             value={formData.severityOfDisability}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Mobility Aids:</label>
//           <input
//             type="text"
//             name="mobilityAids"
//             value={formData.mobilityAids}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Daily Assistance:</label>
//           <input
//             type="text"
//             name="dailyAssistance"
//             value={formData.dailyAssistance}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Employment Status:</label>
//           <input
//             type="text"
//             name="employmentStatus"
//             value={formData.employmentStatus}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Annual Income:</label>
//           <input
//             type="number"
//             name="annualIncome"
//             value={formData.annualIncome}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Support Needed:</label>
//           <input
//             type="text"
//             name="supportNeeded"
//             value={formData.supportNeeded}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Bank Details:</label>
//           <input
//             type="text"
//             name="bankDetails"
//             value={formData.bankDetails}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Disability;
