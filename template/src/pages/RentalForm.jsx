import React, { useState } from 'react';
import axios from 'axios';

const RentalForm = ({ uavId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [user, setUser] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/rental/rentals/', {
        start_date: startDate,
        end_date: endDate,
        uav: uavId,
        user: user
      });
      console.log('Rental request successful:', response.data);
    } catch (error) {
      console.error('Error submitting rental request:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Rental Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-gray-700">Start Date:</label>
          <input type="date" id="startDate" value={startDate} onChange={handleStartDateChange} className="border rounded px-4 py-2" required />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-gray-700">End Date:</label>
          <input type="date" id="endDate" value={endDate} onChange={handleEndDateChange} className="border rounded px-4 py-2" required />
        </div>
        <div className="mb-4">
          <label htmlFor="user" className="block text-gray-700">User:</label>
          <input type="text" id="user" value={user} onChange={handleUserChange} className="border rounded px-4 py-2" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
};

export default RentalForm;
