
// import React, { useEffect, useState } from 'react';
// import '../css/ReservationsTable.css';
// import axios from 'axios'
// const ReservationsTable = () => {
// const [data,setData]=useState([])
// useEffect(()=>{
//   const fetchInfo=async()=>{
//     const response= await axios.get('/')
//     console.log(response);
//     setData(response.data)
//   }
//   fetchInfo()
// },[])
//   return (
//     <div className="reservations-table">
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Id</th>
//             <th>Room</th>
//             <th>Guests</th>
//             <th>Check-In</th>
//             <th>Check-Out</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length>0? data.map((i) => (
//             <tr key={i.id}>
//               <td>{i.room_id}</td>
//               <td>{i.guest_id}</td>
//               <td>{i.FirstName}</td>
//               <td>{i.check_in}</td>
//               <td>{i.check_out}</td>
//               <td>{i.status}</td>
//             </tr>
//           )):(<h1>No Guests</h1>)}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationsTable;
