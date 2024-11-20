
import React, { useEffect, useState } from 'react';
import '../css/ReservationsTable.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const GuestDetails = () => {
    const navi=useNavigate()

const [data,setData]=useState([])
useEffect(()=>{
  const fetchInfo=async()=>{
    const response= await axios.post('/guests')
    console.log(response);
    setData(response.data)
  }
  fetchInfo()
},[])
  return (
    <div className="reservations-table">
      <table>
        <thead>
          <tr>
            <th>Guest Id</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Email ID</th>
            <th>ID Proof Number</th>
          </tr>
        </thead>
        <tbody>
          {data.length>0? data.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{`${i.FirstName} ${i.MiddleName} ${i.LastName}`}</td>
              <td>{i.DOB.substring(0,10)}</td>
              <td>{i.Gender}</td>
              <td>{i.PhoneNo}</td>
              <td>{i.EmailId}</td>
              <td>{i.IdProof}</td>
            </tr>
          )):(<h1>No Guests</h1>)}
        </tbody>
      </table>
      
    </div>
  );
};

export default GuestDetails;
