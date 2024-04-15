import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import CopyToClipboard from "react-copy-to-clipboard";

const DisplayId = () => {
  const { applicationId } = useParams();
  const [copied, setCopied] = useState(false);
const navigate=useNavigate()
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 6000);
  };
  
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: 'rgb(195, 232, 139)',
        textAlign: "center",
        padding:"8rem",
        color: "#000",
        boxShadow:"0px 0px 9px  #000",
        borderRadius:"20px"
      }}
    >
      <h2 style={{textShadow:"0px 0px 2px  #000"}}>Your Application ID:</h2><br/>
      <p style={{ marginBottom: "40px" ,fontSize:"1.2rem",fontWeight:"500",textShadow:"0px 0px 1px  #000",fontStyle:"italic"}}>
        Your application is submitted successfully. Copy paste the following
        application id to view the application status later.
      </p>
      <input
        type="text"
        value={applicationId}
        readOnly
        style={{ width: "270px",textAlign:"center" ,height:"40px"}}
      />
      <CopyToClipboard text={applicationId} onCopy={handleCopy} color="#072">
        <button style={{color:"#fff",backgroundColor:"#000",borderRadius:"20px",width:"50px",height:"30px"}}>Copy</button>
      </CopyToClipboard>
      {copied && <p>Application ID copied to clipboard!</p>}
      <br/><br/>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default DisplayId;
