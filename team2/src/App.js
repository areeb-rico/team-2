import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./Users";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/users">Users</Link>
      </nav>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>
    </Router>
  );
};

export default App;