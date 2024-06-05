import React, { useState } from "react";
import Header from "./Header";
import Swal from 'sweetalert2';

const KnowStatus = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [eventDetails, setEventDetails] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/events/search?searchTerm=${searchTerm}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const event = data[0]; // Assuming only one event is returned
                    setEventDetails(event);
                    if (event.approved === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Event Approved!',
                            text: 'This event has been approved.',
                            confirmButtonText: 'Close'
                        });
                    } else if (event.approved === false) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Event Declined!',
                            text: 'This event has been declined.',
                            confirmButtonText: 'Close'
                        });
                    } else {
                        Swal.fire({
                            icon: 'info',
                            title: 'Review Still Under Progress!',
                            text: 'The approval status for this event is still under review.',
                            confirmButtonText: 'Close'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'Event Not Found!',
                        text: 'No event found with the specified title.',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            } else {
                console.error("Failed to fetch event details");
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
                    <div className="col-md-12 mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Title ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {eventDetails && (
                <div className="container-fluid mt-2">
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text"><strong>Title: </strong>{eventDetails.name}</p>
                            <p className="card-text"><strong>Description:</strong> {eventDetails.description}</p>
                            <p className="card-text"><strong>Date:</strong> {eventDetails.date.split('T')[0]}</p>
                            <p className="card-text"><strong>Time In:</strong> {eventDetails.timeIn}</p>
                            <p className="card-text"><strong>Time Out:</strong> {eventDetails.timeOut}</p>
                            <p className="card-text"><strong>Venue:</strong> {eventDetails.venue}</p>
                            <p className="card-text"><strong>Refreshments:</strong> {eventDetails.refreshments}</p>
                            <p className="card-text"><strong>Approved:</strong> {eventDetails.approved ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KnowStatus;
