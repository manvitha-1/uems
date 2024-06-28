import React, { useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password, role };

    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      const response = await fetch("https://uems-topaz.vercel.app/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token // Add token to headers
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
        });
        // Reset the form inputs
        setUsername("");
        setPassword("");
        setRole("");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Server error',
      });
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div style={{ paddingTop: 100, paddingBottom: 50 }}>
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-header py-3">
                <h5 className="text-dark m-0 fw-bold">Create User</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="event_organizer">Event Organizer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-center mt-4 mb-2">
                    <button className="btn btn-dark" type="submit">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
