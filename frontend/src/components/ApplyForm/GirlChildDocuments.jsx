import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./GirlChildDocuments.css"
import { FaCircle, FaDotCircle, FaStopCircle } from "react-icons/fa";
const GirlChildDocuments = () => {
    const { applicationId } = useParams();
    console.log(applicationId)
  const navigate = useNavigate();

  const [birthCertificate, setBirthCertificate] = useState(null);
  const [educationCertificate, setEducationCertificate] = useState(null);
  const [incomeCertificate, setIncomeCertificate] = useState(null);

  const handleBirthCertificateChange = (e) => {
    setBirthCertificate(e.target.files[0]);
  };

  const handleEducationCertificateChange = (e) => {
    setEducationCertificate(e.target.files[0]);
  };

  const handleIncomeCertificateChange = (e) => {
    setIncomeCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("birthCertificate", birthCertificate);
      formData.append("educationCertificate", educationCertificate);
      formData.append("incomeCertificate", incomeCertificate);
  
      const response = await axios.post(
        `https://philanthropyfundguardian.onrender.com/api/uploadgirl/${applicationId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        alert("Files uploaded successfully");
        navigate(`/apply/display/${applicationId}`);
      } else {
        alert("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Internal server error");
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="form-container" >
    <div style={{ display: 'flex',width:"100%" ,justifyContent:"center"}}>
    <FaCircle color="#ccc" />
    <span style={{ marginLeft: '10px' }}>
      <FaCircle />
    </span>
  </div>
  <h2 style={{textAlign:"center"}}>Upload Necessary Certificates</h2><br/>
  <form onSubmit={handleSubmit} id="form-container">
    <label>
      Proof of gender and DOB (Birth Certificate):
      <input
        type="file"
        name="birthCertificate"
        onChange={handleBirthCertificateChange}
        accept=".pdf, .jpeg, .jpg"
        required
      />
    </label>
    <label>
      Education Certificate (Copies of the child's mark sheets or report cards from previous academic years):
      <input
        type="file"
        name="educationCertificate"
        onChange={handleEducationCertificateChange}
        accept=".pdf, .jpeg, .jpg"
        required
      />
    </label>
    <label>
    Proof of the parents' or guardians' income, if applicable(Income Certificate) :
      <input
        type="file"
        name="incomeCertificate"
        onChange={handleIncomeCertificateChange}
        accept=".pdf, .jpeg, .jpg"
        required
      />
    </label>
    <button type="submit">Upload</button>
  </form>
</div>
  );
};
  

export default GirlChildDocuments