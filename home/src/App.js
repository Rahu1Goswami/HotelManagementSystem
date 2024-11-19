import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Header from './components/Header.js';
import ReservationsTable from './components/ReservationsTable.js';
import Book from './booking/booking.js';
import './App.css'; // Ensure you have global styling
import Employee from './booking/employees.js';
function Layout({ children }) {
  const location = useLocation();
  const isAddBookingPage = location.pathname === '/booking';

  return (
    <div className="app-container">
      {!isAddBookingPage && <Sidebar />} {/* Conditionally render Sidebar */}
      <div className={`main-content ${isAddBookingPage ? 'full-width' : ''}`}>
        {!isAddBookingPage && <Header />} {/* Conditionally render Header */}
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ReservationsTable />} />
          <Route path="/booking" element={<Book />} />
          <Route path="/employee" element={<Employee />}  />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
