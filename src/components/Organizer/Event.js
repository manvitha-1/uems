import React, { useState } from "react";
import Header from "./Header";
import Swal from "sweetalert2";
import {useNavigate} from "react";
const Event = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    participants: "",
    description: "",
    date: "",
    timeIn: "",
    timeOut: "",
    venue: "",
    refreshments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire({
          title: 'Submitted!',
          text: 'Your request has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'Close'
        });
        // Reset form fields
        setFormData({
          eventName: "",
          participants: "",
          description: "",
          date: "",
          timeIn: "",
          timeOut: "",
          venue: "",
          refreshments: "",
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: 'Failed!',
        text: 'Failed to submit your request. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    }
  };
  

  return (
    <div>
      <Header />
      <div className="container-fluid" style={{paddingTop:"80px"}}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="eventName" className="form-label">
              Name of the Event
            </label>
            <input
              type="text"
              name="eventName"
              className="form-control"
              id="eventName"
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="participants" className="form-label">
              Number of Participants
            </label>
            <input
              type="number"
              name="participants"
              className="form-control"
              id="participants"
              value={formData.participants}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={formData.date}
                onChange={handleChange}
                name="date" // Ensure that the name attribute is set to "date"
              />
            </div>
            <div className="col">
              <label htmlFor="timeIn" className="form-label">
                Time In
              </label>
              <input
                type="time"
                className="form-control"
                id="timeIn"
                value={formData.timeIn}
                onChange={handleChange}
                name="timeIn" // added name attribute
              />
            </div>
            <div className="col">
              <label htmlFor="timeOut" className="form-label">
                Time Out
              </label>
              <input
                type="time"
                className="form-control"
                id="timeOut"
                value={formData.timeOut}
                onChange={handleChange}
                name="timeOut" // added name attribute
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="venue" className="form-label">
              Venue
            </label>
            <select
              className="form-control"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            >
              <option>Select Venue</option>
              <option>Venue 1</option>
              <option>Venue 2</option>
              <option>Venue 3</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Refreshments</label>
            <div className="row">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="refreshments"
                    id="refreshments1"
                    value="Yes"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="refreshments1">
                    Yes
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="refreshments"
                    id="refreshments2"
                    value="No"
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="refreshments2">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Event;

