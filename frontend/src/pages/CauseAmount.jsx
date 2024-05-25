import React, { useEffect, useState } from "react";
import axios from "axios";
import "/src/styles/CauseAmount.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CauseAmount = () => {
  const [sum1, setSum1] = useState(null);
  const [sum2, setSum2] = useState(null);
  const [sum3, setSum3] = useState(null);
  const username = localStorage.getItem("adminusername");

  useEffect(() => {
    const fetchSum = async (causeId) => {
      try {
        const response = await axios.get(`https://philanthropyfundguardian.onrender.com/api/sum-amount/${causeId}`);
        switch (causeId) {
          case 1:
            setSum1(response.data.sum);
            break;
          case 2:
            setSum2(response.data.sum);
            console.log(response.data.sum)
            break;
          case 3:
            setSum3(response.data.sum);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSum(1);
    fetchSum(2);
    fetchSum(3);
  }, []);

  return (
    <div id="causeamount">
      <h1><Link to={`/admin/${username}`}>
          <FaArrowCircleLeft color="#000" />
        </Link> Cause Amounts</h1>
      <div className="wrapper">
        <div className="cause-box">
          <h3>Girl Child Education</h3>
          <img src="/src/assets/image1.png" alt="Cause 1" className="cause-image" />
          {sum1 ? (
            <p>Total amount: {sum1}</p>
          ) : (
            <p>Zero balance</p>
          )}
        </div>
        <div className="cause-box">
          <h3>Disability Support</h3>
          <img src="/src/assets/image2.png" alt="Cause 2" className="cause-image" width=""/>
          {sum2 ? (
            <p>Total amount: {sum2}</p>
          ) : (
            <p>Zero balance</p>
          )}
        </div>
        <div className="cause-box">
          <h3>Old Age Home</h3>
          <img src="/src/assets/image3.png" alt="Cause 3" className="cause-image" />
          {sum3 ? (
            <p>Total amount: {sum3}</p>
          ) : (
            <p>Zero balance</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CauseAmount;
