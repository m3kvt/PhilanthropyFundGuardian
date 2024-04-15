import React from 'react'

const Certificate = ({ url }) => {
    return (
      <div>
        <h2>Certificate of Honor</h2>
        <img src="/" alt="Certificate" />
        <a href={url} download>Download certificate</a>
      </div>
    );
  };
export default Certificate