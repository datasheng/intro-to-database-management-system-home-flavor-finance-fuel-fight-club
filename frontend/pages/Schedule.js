import React, { useState } from 'react';
import '../styles/Schedule.css';

function Schedule() {
  const [service, setService] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [email, setEmail] = useState('');

  const classesByService = {
    service1: ['A', 'B', 'C'],
    service2: ['D', 'E', 'F'],
    service3: ['G', 'H', 'I']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingInfo = {
      service,
      selectedClass,
      date,
      hour,
      email
    };
    console.log("Submitted Booking Info:", bookingInfo);
    alert("Booking Submitted! Check console for details.");
  };

  const availableClasses = service ? classesByService[service] : [];

  return (
    <div className="Schedule">
      <h1>Booking Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <select value={service} onChange={e => setService(e.target.value)}>
            <option value="">Select a service</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </label>
        {service && (
          <label>
            Class:
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              <option value="">Select a class</option>
              {availableClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          Date:
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Hour:
          <input 
            type="time" 
            value={hour} 
            onChange={e => setHour(e.target.value)} 
            required 
          />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <div class="container">
          <button type="submit">Submit Booking</button>
      </div>
      </form>
    </div>
  );
}

export default Schedule;
