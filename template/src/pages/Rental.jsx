import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rental = () => {
  const [uavs, setUavs] = useState([]);
  const [selectedUavId, setSelectedUavId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUavs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/uav/');
        setUavs(response.data.results);
      } catch (error) {
        console.error('UAV fetch failed', error);
      }
    };
    fetchUavs();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('key');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/dj-rest-auth/user/user/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          localStorage.setItem('userId', response.data.pk); 
        } catch (error) {
          console.error('Kullanıcı bilgileri alınamadı', error);
        }
      }
    };
    
    fetchUserInfo();
  }, []);

  const handleSelectUav = (event) => {
    setSelectedUavId(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('key');
      const userId = localStorage.getItem('userId'); 
      const response = await axios.post('http://127.0.0.1:8000/rental/', {
        start_date: startDate,
        end_date: endDate,
        uav: selectedUavId,
        user: userId, 
      }, {
        headers: {
          Authorization: `Token ${token}`,
        }
      });
      setSuccessMessage('Kiralama başarılı!');
      console.log('Rental successful:', response.data);
    } catch (error) {
      console.error('Rental failed', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl mb-4">UAV Kiralama</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="uavSelect" className="block mb-2">UAV Seçin:</label>
          <select id="uavSelect" onChange={handleSelectUav} required className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500">
            <option value="">UAV Seçin</option>
            {uavs.map((uav) => (
              <option key={uav.id} value={uav.id}>
                {uav.model_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="startDate" className="block mb-2">Başlangıç Tarihi:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="block mb-2">Bitiş Tarihi:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Kirala</button>
      </form>
      {successMessage && (
        <div className="mt-4 p-4 bg-green-200 text-green-800 rounded">{successMessage}</div>
      )}
    </div>
  );
};

export default Rental;
