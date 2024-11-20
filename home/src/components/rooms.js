import React, { useEffect, useState } from 'react';
import '../css/ReservationsTable.css';
import axios from 'axios';

const RoomsDetails = () => {
  const [data, setData] = useState([]); // Ensure initial state is an array

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.post('/room');
        console.log('API Response:', response.data); // Debug API response
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
            <th>Room Number: </th>
            <th>Tier: </th>
            <th>Status</th>
            <th>Maximum Occupancy: </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.tier}</td>
                <td>{i.Status}</td>
                <td>{i.MaximumOccupency}</td>
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

export default RoomsDetails;