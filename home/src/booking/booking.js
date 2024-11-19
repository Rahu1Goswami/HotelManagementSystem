import React, { useEffect, useState } from 'react';
import '../css/booking.css'
import { useNavigate } from 'react-router-dom';
const Book = () => {
 const navigate=useNavigate()
  const [data, setData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    identityProof: '',
    checkin: '',
    checkout: '',
    tier: '',
    MaximumOccupency: ''
  });
  
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const randomRoom = availableRooms[0]; 

      if (!randomRoom) {
        throw new Error('No available room selected.');
      }

      const bookingData = {
        ...data,
        roomId: randomRoom.id,  // Send the room's ID or any other relevant room data
              };
    try {
      const response = await fetch('/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Booking failed. Please try again.');
      }

      await response.json();
      setData({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        gender: '',
        phone: '',
        email: '',
        identityProof: '',
        checkin: '',
        checkout: '',
        tier: '',
        MaximumOccupency: ''
      });
      alert('Booking successful!');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (!data.tier || !data.MaximumOccupency) return;
      
      try {
        // Use URL parameters instead of request body for GET request
        const queryParams = new URLSearchParams({
          tier: data.tier,
          occupancy: data.MaximumOccupency // Ensure server expects this key
        });
    
        const response = await fetch(`/rooms?tier=${data.tier}&occupancy=${data.MaximumOccupency}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res=>res.json)
        .then(data=>console.log(data))
    
        if (!response.ok) {
          throw new Error('Failed to fetch available rooms');
        }

        const rooms = await response.json();
        const matchingRooms = rooms.filter(room =>
          room.tier === data.tier &&
          room.status === "available" &&
          room.MaximumOccupency >= parseInt(data.MaximumOccupency)
        );
        
        if (matchingRooms.length > 0) {
          const randomRoom = matchingRooms[Math.floor(Math.random() * matchingRooms.length)];
          setAvailableRooms([randomRoom]); // Update the state to hold only the selected room
        } else {
          setAvailableRooms([]);
        }
      } catch (error) {
        setError('Error checking room availability');
      }
    };

    fetchRooms();
  }, [data.tier, data.MaximumOccupency]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md" id='ff'>
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          {/* <label className="block text-sm font-medium">ID: </label>
          <input
            type="text"
            name="id"
            className="w-full p-2 border rounded"
            placeholder="ID"
            onChange={handleChange}
            value={data.id}
          /> */}
        </div>
        <br />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">First Name: </label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded"
              placeholder="First Name"
              onChange={handleChange}
              value={data.firstName}
              required
            />
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Middle Name: </label>
            <input
              type="text"
              name="middleName"
              className="w-full p-2 border rounded"
              placeholder="Middle Name"
              onChange={handleChange}
              value={data.middleName}
            />
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Last Name: </label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded"
              placeholder="Last Name"
              onChange={handleChange}
              value={data.lastName}
              required
            />
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date of Birth: </label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.dob}
              required
            />
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Gender: </label>
            <select
              name="gender"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.gender}
              required
            >
              <option value="">Select Gender: </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="X">Other</option>
            </select>
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Phone Number: </label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded"
              placeholder="Phone Number"
              onChange={handleChange}
              value={data.phone}
              required
            />
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email: </label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              required
            />
          </div>
        </div>
        <br />
        <div className="space-y-2">
          <label className="block text-sm font-medium">Identity Proof: </label>
          <input
            type="text"
            name="identityProof"
            className="w-full p-2 border rounded"
            placeholder="Aadhar Number"
            onChange={handleChange}
            value={data.identityProof}
            required
          />
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Check-in Date: </label>
            <input
              type="date"
              name="checkin"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.checkin}
              required
            />
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Check-out Date: </label>
            <input
              type="date"
              name="checkout"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.checkout}
              required
            />
          </div>
        </div>
        <br />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Room Tier: </label>
            <select
              name="tier"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.tier}
              required
            > <br />
              <option value="">Select Tier: </option>
              <option value="Gold">Gold</option>
              <option value="Delux">Delux</option>
              <option value="Executive">Executive</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <br />
          <div className="space-y-2">
            <label className="block text-sm font-medium">Maximum Occupancy: </label>
            <select
              name="MaximumOccupency"
              className="w-full p-2 border rounded"
              onChange={handleChange}
              value={data.MaximumOccupency}
              required
            >
              <option value="">Select Occupancy</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
            </select>
          </div>
        </div>

        {availableRooms.length > 0 && (
          <div className="p-4 bg-green-50 rounded">
            <p className="text-green-700">
              {availableRooms.length} room(s) available. Room(s): {availableRooms.map(room => room.id).join(', ')}
            </p>
          </div>
        )}
 <br /> <br />
        <button
        onClick={()=>navigate('/')}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Submit Booking'}
        </button>
      </form>
    </div>
  );
};

export default Book;