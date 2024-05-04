import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Home from "../../pages/Home";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSignup = async () => {
    alert("Successfully registered");
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formValues
      );
      const userId = response.data;

      if (response.data.status === "error") {
        alert(`Registration error: ${response.data.error}`);
      } else {
        console.log("Registration successful:", userId);

        alert("Successfully registered");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formValues
      );
      console.log("userId: ", response.data);
      
      console.log("Login response:", response.data.name);
      const name=response.data.name;
      const userData=response.data;
      if (response.data) {
        console.log("navigating");
        localStorage.setItem("userData", JSON.stringify(userData));
      console.log("userData: ", userData);
        localStorage.setItem("name",name );
        navigate(`/${name}`);
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      alert("Invalid Email or Password");
      console.error("Login error:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    
  };

  const validate = (values) => {
    const { name, email, password } = values;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    } else if (!/^[a-zA-Z ]{3,50}$/.test(name)) {
      errors.name = "invalid name";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password && formErrors.password) {
      delete formErrors.password;
    }
    return errors;
  };

  return (
    <div id="signup">
      <form onSubmit={handleSubmit} className="form">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? null : (
            <>
              <div className="input">
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  onChange={handleChange}
                  value={formValues.name}
                  style={{ width: "230px", height: "25px" }}
                />
              </div>
              <p className="error">{formErrors.name}</p>
            </>
          )}
          <div className="input">
            <input
              type="email"
              name="email"
              placeholder="email"
              autoComplete="email"
              onChange={handleChange}
              value={formValues.email}
              style={{ width: "230px", height: "25px" }}
            />
          </div>
          <p className="error">{formErrors.email}</p>
          <div className="input">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              style={{ width: "230px", height: "25px" }}
            />
          </div>
          <p className="error">{formErrors.password}</p>
        </div>
        {action === "Sign Up" ? (
          <div className="forgot">
            Already a user?{" "}
            <span onClick={() => setAction("Login")}>Log in</span>
          </div>
        ) : (
          <div className="forgot">
            No account?{" "}
            <span onClick={() => setAction("Sign Up")}>Create one</span>
          </div>
        )}
        <div className="submit-container">
          {action === "Login" ? (
            <button className="submit" onClick={handleLogin}>
              Login
            </button>
          ) : (
            <button className="submit" onClick={handleSignup}>
              Sign Up
            </button>
          )}
        </div>
        <div>
          {formErrors.signup && <p className="error">{formErrors.signup}</p>}
        </div>
        <div>
          {formErrors.login && <p className="error">{formErrors.login}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
