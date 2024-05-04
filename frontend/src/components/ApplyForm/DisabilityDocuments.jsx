import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import "./DisabilityDocuments.css"
import { FaCircle } from "react-icons/fa";

const DisabilityDocuments = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [idProof, setIdProof] = useState(null);
  const [medicalCertificate, setMedicalCertificate] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState(null);
  const [incomeCertificate, setIncomeCertificate] = useState(null);

  const handleIdProofChange = (e) => {
    setIdProof(e.target.files[0]);
  };

  const handleMedicalCertificateChange = (e) => {
    setMedicalCertificate(e.target.files[0]);
  };

  const handleMedicalRecordsChange = (e) => {
    setMedicalRecords(e.target.files[0]);
  };

  const handleIncomeCertificateChange = (e) => {
    setIncomeCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("idProof", idProof);
      formData.append("medicalCertificate", medicalCertificate);
      formData.append("medicalRecords", medicalRecords);
      formData.append("incomeCertificate", incomeCertificate);

      const response = await axios.post(
        `http://localhost:3001/api/upload-disability/${applicationId}`,
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
  <form onSubmit={handleSubmit} id="form-container" style={{textAlign:"center"}}>
    <label>
      Proof of Identity (ID Proof):
      <input
        type="file"
        name="idProof"
        onChange={handleIdProofChange}
        accept=".pdf, .jpeg, .jpg"
        required
      />
    </label>
    <label>
      Medical Certificate:
      <input
        type="file"
        name="medicalCertificate"
        onChange={handleMedicalCertificateChange}
        accept=".pdf, .jpeg, .jpg"
        required
      />
    </label>
    <label>
      Medical Records:
      <input
        type="file"
        name="medicalRecords"
        onChange={handleMedicalRecordsChange}
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

export default DisabilityDocuments;