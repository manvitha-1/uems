import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import "./Login.css";
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("https://uems-topaz.vercel.app//login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      localStorage.setItem('token',data.token);
      if (data.valid === true) {
        Swal.fire('SUCCESS', 'Logged in Successfully', 'success');
        login(formData.role); 
        if (formData.role === "event_organizer" && data.role === "event_organizer") {
          navigate("/eo"); 
        } else if (formData.role === "admin" && data.role === "admin") {
          navigate("/admin"); 
        } else {
          Swal.fire('INVALID', 'Invalid Role', 'error');
        }
      } else {
        Swal.fire('INVALID', 'Invalid Credentials', 'error');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Home />
      <div className="container">
        <div className="login-box">
          <h1>Login Here</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <select
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="event_organizer">Event Organizer</option>
              <option value="admin">Admin</option>
            </select>
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
