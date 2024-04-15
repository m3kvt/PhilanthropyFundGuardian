import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "/src/styles/ApplicationStatus.css"
const ApplicationStatus = () => {
    const [applicationId, setApplicationId] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(
          `http://localhost:3001/check-status/${applicationId}`
        );
        setStatusMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setStatusMessage("An error occured or Incorrect application id");
      }
    };
  
    return (
        <div className="check-status-container">
        <h2>Check Application Status</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="applicationId">Enter Application ID:</label>
          <input
            type="text"
            id="applicationId"
            value={applicationId}
            onChange={(event) => setApplicationId(event.target.value)}
          />
          <button type="submit">Check Status</button>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  };

export default ApplicationStatus