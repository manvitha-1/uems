import React, { useState, useEffect } from "react";
import Header from "./Header";

const Approved = () => {
    const [declinedEvents, setdeclinedEvents] = useState([]);

    useEffect(() => {
        fetchdeclinedEvents();
    }, []);

    const fetchdeclinedEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/events/declined");
            if (response.ok) {
                const data = await response.json();
                setdeclinedEvents(data);
            } 
            else {
                console.error("Failed to fetch approved events");
            }
        } 
        catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container-fluid" style={{paddingTop: "80px"}}>
                <div className="row">
                    {declinedEvents.map(event => (
                        <div key={event._id} className="col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text"><strong>Name:</strong> {event.eventName}</p>
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
