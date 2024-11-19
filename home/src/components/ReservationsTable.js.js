import React from 'react';
import '../css/ReservationsTable.css';

const ReservationsTable = () => {
  
  const data = [
    { booking: 2319, room: 118, guests: 'David Smith', checkIn: '03.10.23', checkOut: '06.10.23', status: 'Confirmed' },
    { booking: 2318, room: 117, guests: 'Dianne Rusel', checkIn: '03.10.23', checkOut: '05.10.23', status: 'Checked In' },
    // Add more rows here
  ];

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
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.booking}</td>
              <td>{row.room}</td>
              <td>{row.guests}</td>
              <td>{row.checkIn}</td>
              <td>{row.checkOut}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsTable;