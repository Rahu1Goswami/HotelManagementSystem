
import React, { useEffect, useState } from 'react';
import '../css/Sidebar.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const EmployeeDetails = () => {
    const navi=useNavigate()

const [data,setData]=useState([])
useEffect(()=>{
  const fetchInfo=async()=>{
    const response= await axios.post('/employee')
    console.log(response);
    setData(response.data)
  }
  fetchInfo()
},[])
  return (
    <> 

    <div className="reservations-table">
    <button classname='ghd'style={{backgroundColor: "#00c1ee", fontSize:"130%",textAlign:"center",justifyContent:"center", color: "white"}} onClick={()=>navi('/emp')}>ADD EMPLOYEE</button>

      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Email ID</th>
            <th>Address</th>
            <th>job</th>
            <th>salary</th>
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
              <td>{i.Address}</td>
              <td>{i.jobtitle}</td>
              <td>{i.salary}</td>
            </tr>
          )):(<h1>No Employee</h1>)}
        </tbody>
      </table>  
    </div>
  </>)
};
export default EmployeeDetails;
