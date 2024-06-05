import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./Reports.css";

const Reports = () => {
  const [approvedEvents, setApprovedEvents] = useState([]);
  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const response = await fetch("https://uems-topaz.vercel.app/events/approved");
        if (response.ok) {
          const data = await response.json();
          setApprovedEvents(data);
        } else {
          console.error("Failed to fetch approved events");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchApprovedEvents();
  }, []);

  // Filter events based on conditions
  const filteredEvents = approvedEvents.filter((event) => {
    const dateString = event.date.split('T')[0];
    const eventDateTime = new Date(dateString + "T" + event.timeOut);
    const currentDateTime = new Date();
    return event.approved && eventDateTime <= currentDateTime;
  });

  // Sort events by date
  filteredEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "100px" }}>
        <h4><center><b>Conducted Events: </b></center></h4><br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={event._id} className={index % 2 === 0 ? 'light-row' : 'dark-row'}>
                <td style={{ width: "50%" }}>{event.name}</td>
                <td style={{ width: "15%" }}>{event.date.split('T')[0]}</td>
                <td style={{ width: "15%" }}>{event.venue}</td>
                <td style={{ width: "20%" }}>{event.participants}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
