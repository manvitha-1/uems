import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Corousel from './components/LandingPage';
import About from './components/About';
import Login from './components/Login';
import Event from './components/Organizer/Event';
import Approved from './components/Organizer/Approved';
import Declined from './components/Organizer/Declined';
import KnowStatus from './components/Organizer/KnowStatus';
import List from './components/Admin/List';
import Reports from './components/Admin/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Corousel />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/eo" element={<Event />} />
        <Route path="/eo/approved" element={<Approved />} />
        <Route path="/eo/declined" element={<Declined />} />
        <Route path="/eo/knowStat" element={<KnowStatus />} />
        <Route path="/admin" element={<List />} />
        <Route path="/admin/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
