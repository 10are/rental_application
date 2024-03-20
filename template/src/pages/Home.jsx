import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Rental = () => {
  const [uavs, setUavs] = useState([]);
  const [selectedUavId, setSelectedUavId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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
      console.log('Rental successful:', response.data);
    } catch (error) {
      console.error('Rental failed', error);
    }
  };

  return (
    <div>
      <h2>UAV Kiralama</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="uavSelect">UAV Seçin:</label>
          <select id="uavSelect" onChange={handleSelectUav} required>
            <option value="">UAV Seçin</option>
            {uavs.map((uav) => (
              <option key={uav.id} value={uav.id}>
                {uav.model_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Başlangıç Tarihi:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Bitiş Tarihi:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            required
          />
        </div>
        <button type="submit">Kirala</button>
      </form>
    </div>
  );
};

export default Rental;
