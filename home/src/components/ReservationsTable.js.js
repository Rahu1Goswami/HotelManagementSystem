import React, { useEffect, useState } from 'react';
import '../css/ReservationsTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ReservationsTable = () => {
  const [data, setData] = useState([]); // Ensure initial state is an array
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.post('/');
        console.log('API Response:', response.data.data); // Debug API response
        // Handle response if it's nested
        setData(Array.isArray(response.data) ? response.data : []); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Fallback to empty array on error
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="reservations-table">
      <table>
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>Room</th>
            <th>Guests</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.room_id}</td>
                <td>{`${i.FirstName} ${i.MiddleName} ${i.LastName}`}</td>
                <td>{i.check_in.substring(0,10)}</td>
                <td>{i.check_out.substring(0,10)}</td>
                <td>{i.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Guests</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;