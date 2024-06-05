import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext.js';
import PrivateRoute from './components/PrivateRoute';
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
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Corousel />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          {/* Organizer routes */}
          <Route path="/eo" element={<PrivateRoute role="event_organizer"><Event /></PrivateRoute>} />
          <Route path="/eo/approved" element={<PrivateRoute role="event_organizer"><Approved /></PrivateRoute>} />
          <Route path="/eo/declined" element={<PrivateRoute role="event_organizer"><Declined /></PrivateRoute>} />
          <Route path="/eo/knowStat" element={<PrivateRoute role="event_organizer"><KnowStatus /></PrivateRoute>} />
          {/* Admin routes */}
          <Route path="/admin" element={<PrivateRoute role="admin"><List /></PrivateRoute>} />
          <Route path="/admin/reports" element={<PrivateRoute role="admin"><Reports /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
