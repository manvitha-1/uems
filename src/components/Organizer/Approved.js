import React, { useState, useEffect } from "react";
import Header from "./Header";

const Approved = () => {
    const [approvedEvents, setApprovedEvents] = useState([]);

    useEffect(() => {
        fetchApprovedEvents();
    }, []);

    const fetchApprovedEvents = async () => {
        try {
            const response = await fetch("https://uems-topaz.vercel.app/events/approved");
            if (response.ok) {
                const data = await response.json();
                console.table(data);
                setApprovedEvents(data);
            } else {
                console.error("Failed to fetch approved events");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container-fluid" style={{paddingTop: "80px"}}>
                <div className="row">
                    {approvedEvents.map(event => (
                        <div key={event._id} className="col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text"><strong>Name:</strong> {event.name}</p>
                                    <p className="card-text"><strong>Participants:</strong> {event.participants}</p>
                                    <p className="card-text"><strong>Description:</strong> {event.description}</p>
                                    <p className="card-text"><strong>Date:</strong> {event.date.split('T')[0]}</p>
                                    <p className="card-text"><strong>Time In:</strong> {event.timeIn}</p>
                                    <p className="card-text"><strong>Time Out:</strong> {event.timeOut}</p>
                                    <p className="card-text"><strong>Venue:</strong> {event.venue}</p>
                                    <p className="card-text"><strong>Refreshments:</strong> {event.refreshments}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Approved;
