import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import '../css/alldata.css';

function AllFormData() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      navigate("/log-in");
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/all-data");
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");

    navigate("/log-in");
  };

  return (
    <div className="Form-Data">
      <h1>Form Data</h1>
      <button onClick={handleLogout}>Logout</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.gender}</td>
                <td>{user.nationality}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address}</td>
                <td>{user.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllFormData;
