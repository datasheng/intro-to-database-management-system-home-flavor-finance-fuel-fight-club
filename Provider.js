import React, { useState, useEffect } from 'react';
import './Provider.css';
import Axios from 'axios';

function Provider() {
  const [services, setServices] = useState([]);
  const [classType, setClassType]= useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [classCost, setClassCost] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    Axios.get('https://localhost:3001/api/providers/selectClassType')
      .then(response => {
        setClassType(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []); 

  const addClass = () => {
    Axios.post('https://localhost:3001/api/providers/createClass', {
      serviceType: selectedService,
      classType: selectedClassType, 
      address: address,
      className: selectedClassName, 
      cost: classCost, 
      startTime: startTime, 
      endTime: endTime
    })
    .then(response => {
      console.log('Class created successfully:', response.data);
      alert('Class Created');
    })
    .catch(error => {
      console.error('Error creating class:', error);
      alert('Failed to create class');
    });
  };

  return (
    <div className="New_Class">
      <h1>Create a Class</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        addClass();
      }}>
        <label>
          Service:
          <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
            <option value="">Select a Service</option>
            <option value="home flavors">home flavors</option>
            <option value="fight club">fight club</option>
            <option value="financial advisement">finance advisement</option>
            {services.map(service => (
              <option key={service.id} value={service.service_type}>{service.service_type}</option>
            ))}
          </select>
        </label>
        {selectedService && (
          <label>
            Class Type:
            <select value={selectedClassType} onChange={e => setSelectedClassType(e.target.value)}>
              <option value="">Select a Class Type</option>
            </select>
          </label>
        )}
        <label>
          Class Name:
          <input type="text" 
          value={selectedClassName} 
          onChange={e => setSelectedClassName(e.target.value)} 
          placeholder="Enter Class Name" />
        </label>
        <label>
          Class Cost:
          <input type="text" 
          value={classCost} 
          onChange={e => setClassCost(e.target.value)}
          placeholder="Enter Class Cost"  />
        </label>
        <label>
          Address:
          <input 
            type="text" 
            value={address} 
            onChange={e => setAddress(e.target.value)} 
            placeholder="Enter address" 
          />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Start Time:
          <input 
            type="time" 
            value={startTime} 
            onChange={e => setStartTime(e.target.value)} 
            required 
          />
        </label>
        <label>
          End Time:
          <input 
            type="time" 
            value={endTime} 
            onChange={e => setEndTime(e.target.value)} 
            required 
          />
        </label>
        <div className="container">
          <button type="submit">Create Class</button>
        </div>
      </form>
    </div>
  );
}

export default Provider;

