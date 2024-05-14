import React, { useState, useEffect } from 'react';
import './Provider.css';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import "./home.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Provider() {
    const navigate = useNavigate();
    const [services, setServices] = useState([
        { id: 1, service_type: 'fight club' },
        { id: 2, service_type: 'financial advisement' },
        { id: 3, service_type: 'home flavors' }
    ]);
    const [classTypes, setClassTypes] = useState([]);
    const [address, setAddress] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedClassType, setSelectedClassType] = useState('');
    const [selectedClassName, setSelectedClassName] = useState('');
    const [classCost, setClassCost] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        const types = {
            'fight club': ['muay thai', 'kickboxing', 'bjj'],
            'financial advisement': ['investments', 'taxes', 'retirement'],
            'home flavors': ['mediterranean', 'southasian', 'mexican']
        };
        setClassTypes(types[selectedService] || []);
    }, [selectedService]);

    const handleExcel = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/report/download-excel');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading Excel:', error);
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication token not found. Please log in.');
            return;
        }

        // Format date and time
        const formattedStartTime = `${date.split('-').join('-')} ${startTime}:00`;
        const formattedEndTime = `${date.split('-').join('-')} ${endTime}:00`;

        try {
            const response = await fetch('http://localhost:3001/api/providers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    serviceType: selectedService,
                    classType: selectedClassType,
                    addressId: address,
                    className: selectedClassName,
                    cost: classCost,
                    startTime: formattedStartTime,
                    endTime: formattedEndTime
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                console.log('Class created successfully:', data);
                navigate('/C');
                alert('Class created successfully: ' + data.classId);
            } else {
                console.log('Error creating class:', data.message);
                alert(data.message || 'Failed to create class');
            }
            
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error, unable to create class');
        }
    };

    return (
        <div className="home-header">
      <header className="navbarContainer home-navbar-interactive">
        <span className="logo">Life Balance</span>
        <div className="home-desktop-menu">
          <nav className="home-links">
            <span className="home-nav" onClick={() => navigate('/')}>Home</span>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">
                Services
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/FurssanFC')}>Furssan FC</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/HomeFlavors')}>Home Flavors</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/FinanceFuel')}>Finance Fuel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="home-nav" onClick={() => navigate('/schedule')}>Book Appointment</span>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer"  style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="home-nav">Contact Us</span>
            </a>
          </nav>
          <button className="home-login buttonFlat" onClick={() => navigate('/login')}>Logout</button>
        </div>
      </header>
      <div className="New_Class">
          <h1>Create a Class</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  Service:
                  <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                      <option value="">Select a Service</option>
                      {services.map(service => (
                          <option key={service.id} value={service.service_type}>{service.service_type}</option>
                      ))}
                  </select>
              </label>
              <label>
                  Class Type:
                  <select value={selectedClassType} onChange={e => setSelectedClassType(e.target.value)}>
                      <option value="">Select a Class Type</option>
                      {classTypes.map(ct => (
                          <option key={ct} value={ct}>{ct}</option>
                      ))}
                  </select>
              </label>
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
          <div className="container">
                <button onClick={handleExcel}>Download Reporting</button>
            </div>
      </div>
      </div>
  );
}

export default Provider;
