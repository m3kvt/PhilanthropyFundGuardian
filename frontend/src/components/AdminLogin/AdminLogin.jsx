import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"

const AdminLogin = () => {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const handleAdminLogin = async () => {
    try {
      console.log("login:");
      const response = await axios.post(
        "http://localhost:3001/loginadmin",
        loginValues
      );
      console.log("done")
      const data = response.data;
      if (data) {
        console.log("navigating");
        localStorage.setItem("adminData", JSON.stringify(data));
        localStorage.setItem("adminusername", response.data.name);
       console.log("adminusername", response.data.name)
        navigate(`/admin/${data.name}`);
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      alert("Invalid ceredentials")
      console.error("Registration error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit", loginValues);
  };
  return (
    <div id="adminlogin">
      <div className="formbox">
      <div className="header">ADMIN</div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={loginValues.username}
        />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={loginValues.password}
          required
        />
        <br />
        <br />
        <div className="Submit">
        <button type="submit" onClick={handleAdminLogin}>
          Login
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AdminLogin;
