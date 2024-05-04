import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './Provider.css';

function Provider() {
  const [services, setServices] = useState([]);
  const [service_type, setService_Type] = useState('');
  const [class_type, setClass_Type] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedClassName, setSelectedClassName] = useState('');
  const [classCost, setClassCost] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

 // const handleSubmit = async (event) => {
   // event.preventDefault();
  //  try {
   //   const response = await fetch('http://localhost:3001/api/providers/selectClassType', {
    //    method: 'POST',
    //    headers: {
    //      'Content-Type': 'application/json',
    //    },
     //   body: JSON.stringify({service_type, class_type}), 
    //  });
      
    //  const data = await response.json();
      
   //   if (response.ok) {
   //     console.log('Class Type Found', data);
   //   } else {
   //     console.log('Class type not found', data.message);
   //     const errorMessage = data.message || 'Failed to find class types';
    //    alert(errorMessage);
    //  }
      
  //  } catch (error) {
  //    console.error('Network error:', error);
  //    alert('Network error, unable to get class types');
  //  }
 // };

  const availableClassType= services ? selectClassType[services] : [];

  const addClass = () => {
    Axios.post('https://localhost:3001/api/providers/createClass', {
      serviceType: selectedService,
      classType: selectedClassType, 
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
            <option value="financial advisement">financial advisement</option>
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
              {availableClassType.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
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

