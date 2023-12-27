import React, { useState } from "react";
import '../css/form.css';


function Form() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phoneNumber: "",
    address: "",
    message: "",
  });

  const [apiResponse, setApiResponse] = useState(null);

  async function addToDatabase(user) {
    try {
      const response = await fetch("http://localhost:8000/userInput", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error sending data:", errorData);
        setApiResponse({ success: false, message: errorData.message });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data sent successfully", data);
  
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = [];

    if (formData.name === "") {
      errors.push("Name");
    }

    if (formData.gender === "") {
      errors.push("Gender");
    }

    if (formData.nationality === "") {
      errors.push("Nationality");
    }

    if (formData.email === "") {
      errors.push("Email");
    }

    if (formData.phoneNumber === "" || formData.phoneNumber.length !== 10 || !/^\d+$/.test(formData.phoneNumber)) {
      errors.push("Valid Phone Number (10 digits)");
    }

    if (formData.address === "") {
      errors.push("Address");
    }

    if (formData.message === "") {
      errors.push("Message");
    }

    if (errors.length > 0) {
      alert(`Please enter valid values for the following fields: ${errors.join(", ")}`);
      return;
    }else{
      addToDatabase(formData);
    }

    setFormData({
      name: "",
      gender: "",
      nationality: "",
      email: "",
      phoneNumber: "",
      address: "",
      message: "",
    });
  }

  return (
    <div className="Form">
      <header>
        <nav>
          <div className="header">
            <h1>User Form</h1>
          </div>
        </nav>
      </header>
      <main>
        <form onSubmit={handleSubmit} >
          <div className="input-field">
            <label>Enter your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
            />
          </div>

          <div className="input-field">
            <label>Enter your Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="option"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-field">
            <label>Enter your Nationality</label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Enter your Nationality"
            />
          </div>

          <div className="input-field">
            <label>Enter your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>

          <div className="input-field">
            <label>Enter your Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="input-field">
            <label>Enter your Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Address"
            />
          </div>

          <div className="input-field">
            <label>Enter your Message</label>
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your Message"
            />
          </div>
          
          <div className="log-in">
            <small>Want to See All Data <a href="/log-in">Log In</a></small>
          </div>

          <input type="submit" value="Add Data" />

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

export default Form;
