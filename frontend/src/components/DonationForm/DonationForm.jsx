import React, { useRef, useState } from "react";
import "./DonationForm.css";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
// import Certificate from "../../pages/Certificate";
import html2canvas from "html2canvas";

const DonationForm = () => {
  
  const { causeId } = useParams();
  console.log("CauseId:", causeId);
  const name=localStorage.getItem("name");

  const formRef = useRef();
  const generateCertificate = (name, amount) => {
    // Remove existing content of the body
    document.body.innerHTML = "";

    // Append the navbar to the body
    // document.body.appendChild(<Navbar />);

    const container = document.createElement("div");
    container.id = "certificate-container";
    container.style.position = "fixed";
    container.style.top = 0;
    container.style.left = 0;
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = " rgb(157, 182, 153)";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    // Create a new div element to hold the certificate content
    const certificate = document.createElement("div");
    certificate.id = "certificate";
    certificate.style.backgroundColor = " #fff";
    certificate.style.padding = "20px";
    // certificate.style.borderRadius = "10px";
    certificate.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
    certificate.style.border = "15px solid #00715d";
    certificate.style.backgroundImage = "url(/certificate.png)";
    certificate.style.backgroundSize = "1000px"; // Adjust background size to cover entire div
    certificate.style.backgroundPosition = "center";
    certificate.style.backgroundRepeat = "no-repeat";
    // Generate a unique certificate ID
    const certificateId = generateCertificateId();
    // Get the current date
    const currentDate = new Date().toLocaleDateString();
    certificate.innerHTML = `
      <h1>CERTIFICATE OF APPRECIATION</h1>
      <p>is hereby granted to <strong>${name}</strong> for your generous contribution of ₹${amount}.
      Your support is helping us make a difference in the world.</p>
    
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: left;">
            <h6>Certificate ID: ${certificateId}</h6>
            <h6>Issued Date: ${currentDate}</h6>
        </div>
        <div style="margin-left: auto;">
            <img src="/signature.png" alt="Signature" height="70px"/>
            <h5>Administrator</h5>
        </div>
    </div>    

    `;

    function generateCertificateId() {
      // Generate a random ID
      const randomId = Math.floor(Math.random() * 1000000);
      // Format the ID (you can customize the format as per your requirements)
      const formattedId = `CERT-${randomId}`;
      return formattedId;
    }

    // Append the certificate div to the body
    container.appendChild(certificate);
    document.body.appendChild(container);

    html2canvas(certificate).then((canvas) => {
      // Store the canvas for future use
      const certificateCanvas = canvas;
      const downloadButton = document.createElement("button");
      downloadButton.textContent = "Download Certificate";
      // Add click event listener to download button
      downloadButton.addEventListener("click", () => {
        // Create a temporary link element to trigger the download
        const a = document.createElement("a");
        a.href = certificateCanvas.toDataURL();
        a.download = "certificate.png";
        a.click();
        const homeLink = document.createElement("a");
        homeLink.href = `/${name}`;
        homeLink.click();
        // Remove the container div
        document.body.removeChild(container);
      });
      container.appendChild(downloadButton);
    });

    // Add the download button to the certificate div

    // Convert the certificate div to a canvas element
    // html2canvas(document.querySelector("#certificate")).then((canvas) => {
    //   // Create a new URL for the canvas image
    //   const url = canvas.toDataURL();

    //   // Create a new img element to display the certificate
    //   const img = document.createElement("img");
    //   img.src = url;

    //   // Add a download button to the page
    //   const downloadButton = document.createElement("button");
    //   downloadButton.textContent = "Download Certificate";
    //   downloadButton.addEventListener("click", () => {
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "certificate.png";
    //     a.click();

    //     // Remove the existing content of the body
    //     document.body.innerHTML = "";

    //     // Append the navbar to the body
    //     document.body.appendChild(<Navbar />);

    //     // Append the donation form to the body
    //     document.body.appendChild(<DonationForm />);
    //   });

    //   // Add the certificate and download button to the page
    //   document.body.appendChild(img);
    //   document.body.appendChild(downloadButton);

    //   // Remove the certificate div
    //   document.body.removeChild(certificate);
    // });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const contactNo = formData.get("contact");
    const address = formData.get("address");
    const amount = formData.get("amount");
    
    // Make a POST request to the /donate/:causeId endpoint
    fetch(`https://philanthropyfundguardian.onrender.com/donate/${causeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, contactNo, address, amount }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error saving donor details");
      })
      .then((data) => {
        // Handle successful response
        console.log(data);
        // Generate certificate
        generateCertificate(name, amount);
        console.log(name, amount);

        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        // Show error message to user
      });
  };

  return (
    <div id="donorform">
      <Navbar />
      <div className="donor-left">
        <img src="/src/assets/donate.png" alt="Donate Image" />
      </div>
      <div className="donor-right">
        <h2>Donate Now</h2>
        <form ref={formRef} onSubmit={handleFormSubmit} action="#">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="contact">Contact No:</label>
          <input type="tel" id="contact" name="contact" required />
          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" required></textarea>
          <label htmlFor="amount">Amount to be Donated:</label>
          <input type="number" id="amount" name="amount" required />
          <button type="submit">Donate</button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
