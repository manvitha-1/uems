import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const brandStyle = {
        color: 'white'
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
            <Link to="/" className="navbar-brand" style={brandStyle}>University Event Management System</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link mr-5" style={brandStyle}>Requests</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/admin/reports" className="nav-link mr-5" style={brandStyle}>Reports</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            <button className='btn btn-primary'>Logout</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
