import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import '../css/login.css'

function LogIn() {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();

  async function loginToDatabase(user) {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error logging in:", errorData);
        setApiResponse({ success: false, message: errorData.message });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful", data);

      Cookies.set("authToken", data.user._id, { expires: 10 / (24 * 60) });

      navigate(`/all-data/${data.user._id}`);

    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginToDatabase(loginData);
    setLoginData({
      name: "",
      email: "",
      phoneNumber: "",
    });
  }

  return (
    <div className="LogIn">
      <header>
        <nav>
          <div className="header">
            <h1>Login Form</h1>
          </div>
        </nav>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label>Enter your Name</label>
            <input
              type="text"
              name="name"
              value={loginData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
          </div>

          <div className="input-field">
            <label>Enter your Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>

          <div className="input-field">
            <label>Enter your Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={loginData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />
          </div>

          <input type="submit" value="Log In" />

          {apiResponse && !apiResponse.success && (
            <div className="error-message">
              <p>{apiResponse.message}</p>
              <button onClick={() => setApiResponse(null)}>Close</button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

export default LogIn;
