import React, { useState, useEffect } from "react";
import Header from "./Header";

const List = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {fetchEvents();}, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5000/events");
            if (response.ok) {
                const data = await response.json();
                // Filter out the events that are already approved or declined
                const filteredEvents = filterEvents(data);
                setEvents(filteredEvents); // Update the events state with the filtered data
            } else {
                console.error("Failed to fetch events");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const filterEvents = (events) => {
        // Get the approved and declined event IDs from local storage
        const approvedEvents = JSON.parse(localStorage.getItem("approvedEvents")) || [];
        const declinedEvents = JSON.parse(localStorage.getItem("declinedEvents")) || [];
        
        // Filter out the events that are already approved or declined
        const filteredEvents = events.filter(event => !approvedEvents.includes(event._id) && !declinedEvents.includes(event._id));
        return filteredEvents;
    };

    const approveEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}/approve`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}), // No need to send any data in the body
            });
            if (response.ok) {
                // Update local storage to mark the event as approved
                const approvedEvents = JSON.parse(localStorage.getItem("approvedEvents")) || [];
                localStorage.setItem("approvedEvents", JSON.stringify([...approvedEvents, eventId]));

                // Remove the event from the state after approval
                setEvents(prevEvents =>
                    prevEvents.filter(event => event._id !== eventId)
                );
                console.log("Event approved successfully!");
            } else {
                console.error("Failed to approve event");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const declineEvent = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:5000/events/${eventId}/decline`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({}), // No need to send any data in the body
            });
            if (response.ok) {
                // Update local storage to mark the event as declined
                const declinedEvents = JSON.parse(localStorage.getItem("declinedEvents")) || [];
                localStorage.setItem("declinedEvents", JSON.stringify([...declinedEvents, eventId]));

                // Remove the event from the state after declining
                setEvents(prevEvents =>
                    prevEvents.filter(event => event._id !== eventId)
                );
                console.log("Event declined successfully!");
            } else {
                console.error("Failed to decline event");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
 
    return (
        <div>
            <Header />
            <div className="container-fluid" style={{ paddingTop: "80px" }}>
                <div className="row">
                    {events.map(event => (
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
                                    <button onClick={() => approveEvent(event._id)} className="btn btn-success mr-3">Accept</button>
                                    <button onClick={() => declineEvent(event._id)} className="btn btn-danger">Decline</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default List;
