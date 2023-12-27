import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import LogIn from "./components/LogIn";
import AllFormData from "./components/AllFormData";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/all-data/:id" element={<AllFormData />} />
      </Routes>
    </Router>
  );
}

export default App;
