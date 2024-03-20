import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rental from './Rental';


const UAVList = () => {
    const [uavList, setUAVList] = useState([]);
    const [filteredUAVList, setFilteredUAVList] = useState([]);
    const [isRentalModalVisible, setIsRentalModalVisible] = useState(false);
    const [selectedUAVId, setSelectedUAVId] = useState('');
    const [filterParams, setFilterParams] = useState({
        model_name: '',
        max_flight_time_gt: '',
        max_flight_time_lt: '',
        weight_gt: '',
        weight_lt: '',
        communication_tech: '',
        operational_altitude_gt: '',
        operational_altitude_lt: '',
        max_speed_gt: '',
        max_speed_lt: '',
        payload_capacity_gt: '',
        payload_capacity_lt: '',
        endurance_gt: '',
        endurance_lt: '',
        control_system: ''
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/uav/')
            .then(response => {
                setUAVList(response.data.results);
                setFilteredUAVList(response.data.results);
            })
            .catch(error => console.error('Error fetching UAV data:', error));
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterParams({ ...filterParams, [name]: value });
    };

    const showRentalModal = (uavId) => {
        setSelectedUAVId(uavId);
        setIsRentalModalVisible(true);
    };

    const hideRentalModal = () => {
        setIsRentalModalVisible(false);
    };

    const applyFilters = () => {
        let filteredResults = uavList.filter(uav => {
            for (let key in filterParams) {
                if (filterParams[key] !== '') {
                    if (key.includes('_gt')) {
                        const paramKey = key.replace('_gt', '');
                        if (uav[paramKey] <= parseFloat(filterParams[key])) {
                            return false;
                        }
                    } else if (key.includes('_lt')) {
                        const paramKey = key.replace('_lt', '');
                        if (uav[paramKey] >= parseFloat(filterParams[key])) {
                            return false;
                        }
                    } else {
                        if (!uav[key].toString().toLowerCase().includes(filterParams[key].toLowerCase())) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
        setFilteredUAVList(filteredResults);
    };

    const resetFilters = () => {
        setFilterParams({
            model_name: '',
            max_flight_time_gt: '',
            max_flight_time_lt: '',
            weight_gt: '',
            weight_lt: '',
            communication_tech: '',
            operational_altitude_gt: '',
            operational_altitude_lt: '',
            max_speed_gt: '',
            max_speed_lt: '',
            payload_capacity_gt: '',
            payload_capacity_lt: '',
            endurance_gt: '',
            endurance_lt: '',
            control_system: ''
        });
        setFilteredUAVList(uavList);
    };

    return (
        <div className="container mx-auto mt-5">
            <div className="mb-5">
                <h1 className="text-3xl font-bold">UAV List</h1>
                <div className="flex flex-wrap items-center space-y-2 md:space-y-0 md:space-x-2">
                    <input type="text" name="model_name" placeholder="Model Name" value={filterParams.model_name} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="max_flight_time_gt" placeholder="Max Flight Time GT" value={filterParams.max_flight_time_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="max_flight_time_lt" placeholder="Max Flight Time LT" value={filterParams.max_flight_time_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="weight_gt" placeholder="Weight GT" value={filterParams.weight_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="weight_lt" placeholder="Weight LT" value={filterParams.weight_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="communication_tech" placeholder="Communication Tech" value={filterParams.communication_tech} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="operational_altitude_gt" placeholder="Operational Altitude GT" value={filterParams.operational_altitude_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="operational_altitude_lt" placeholder="Operational Altitude LT" value={filterParams.operational_altitude_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="max_speed_gt" placeholder="Max Speed GT" value={filterParams.max_speed_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="max_speed_lt" placeholder="Max Speed LT" value={filterParams.max_speed_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="payload_capacity_gt" placeholder="Payload Capacity GT" value={filterParams.payload_capacity_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="payload_capacity_lt" placeholder="Payload Capacity LT" value={filterParams.payload_capacity_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="endurance_gt" placeholder="Endurance GT" value={filterParams.endurance_gt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="endurance_lt" placeholder="Endurance LT" value={filterParams.endurance_lt} onChange={handleFilterChange} className="p-2 border rounded" />
                    <input type="text" name="control_system" placeholder="Control System" value={filterParams.control_system} onChange={handleFilterChange} className="p-2 border rounded" />
                    <button onClick={applyFilters} className="p-2 bg-blue-500 text-white rounded">Apply Filters</button>
                    <button onClick={resetFilters} className="p-2 bg-gray-500 text-white rounded">Reset Filters</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUAVList.map(uav => (
                    <div key={uav.id} className="border p-4">
                        <h2 className="text-xl font-bold">{uav.model_name}</h2>
                        <p><span className="font-bold">Max Flight Time:</span> {uav.max_flight_time}</p>
                        <p><span className="font-bold">Weight:</span> {uav.weight}</p>
                        <p><span className="font-bold">Communication Tech:</span> {uav.communication_tech}</p>
                        <p><span className="font-bold">Operational Altitude:</span> {uav.operational_altitude}</p>
                        <p><span className="font-bold">Max Speed GT:</span> {uav.max_speed_gt}</p>
                        <p><span className="font-bold">Max Speed LT:</span> {uav.max_speed_lt}</p>
                        <p><span className="font-bold">Payload Capacity:</span> {uav.payload_capacity}</p>
                        <p><span className="font-bold">Endurance:</span> {uav.endurance}</p>
                        <p><span className="font-bold">Control System:</span> {uav.control_system}</p>
                        <p><span className="font-bold">Applications:</span> {uav.applications}</p>
                        <p><span className="font-bold">Onboard Computers:</span> {uav.onboard_computers}</p>
                        <p><span className="font-bold">Payment:</span> {uav.payment}</p>
                        <button onClick={() => showRentalModal(uav.id)} className="mt-2 p-2 bg-blue-500 text-white rounded">Kiralama</button>
                    </div>
                ))}
            </div>
            {isRentalModalVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <button onClick={hideRentalModal} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <Rental selectedUavId={selectedUAVId} onClose={hideRentalModal} />
                    </div>
                </div>
            )}        </div>
    );
};

export default UAVList;


