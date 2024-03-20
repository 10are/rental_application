import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RentalForm from './RentalForm'; 

const UAVList = () => {
  const [uavData, setUavData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/uav/?page=${currentPage}`);
        const filteredUavData = response.data.results.filter(uav => uav.is_available);
        setUavData(filteredUavData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [currentPage]);
  

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">UAV List</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Model Name</th>
              <th className="border px-4 py-2">Max Flight Time</th>
              <th className="border px-4 py-2">Weight</th>
              <th className="border px-4 py-2">Communication Tech</th>
              <th className="border px-4 py-2">Operational Altitude</th>
              <th className="border px-4 py-2">Max Speed</th>
              <th className="border px-4 py-2">Payload Capacity</th>
              <th className="border px-4 py-2">Endurance</th>
              <th className="border px-4 py-2">Control System</th>
              <th className="border px-4 py-2">Applications</th>
              <th className="border px-4 py-2">Onboard Computers</th>
              <th className="border px-4 py-2">Payment</th>
              <th className="border px-4 py-2">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {uavData.map(uav => (
              <tr key={uav.id}>
                <td className="border px-4 py-2">{uav.id}</td>
                <td className="border px-4 py-2">{uav.model_name}</td>
                <td className="border px-4 py-2">{uav.max_flight_time}</td>
                <td className="border px-4 py-2">{uav.weight}</td>
                <td className="border px-4 py-2">{uav.communication_tech}</td>
                <td className="border px-4 py-2">{uav.operational_altitude}</td>
                <td className="border px-4 py-2">{uav.max_speed}</td>
                <td className="border px-4 py-2">{uav.payload_capacity}</td>
                <td className="border px-4 py-2">{uav.endurance}</td>
                <td className="border px-4 py-2">{uav.control_system}</td>
                <td className="border px-4 py-2">{uav.applications}</td>
                <td className="border px-4 py-2">{uav.onboard_computers}</td>
                <td className="border px-4 py-2">{uav.payment}</td>
                <td className="border px-4 py-2">
                  <RentalForm uavId={uav.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UAVList;
