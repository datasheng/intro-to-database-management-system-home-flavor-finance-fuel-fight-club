import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Schedule.css';
import { jwtDecode as jwt_decode } from 'jwt-decode';

function Schedule() {
  const navigate = useNavigate();
  const [services] = useState(['fight club', 'financial advisement', 'home flavors']);
  const [selectedService, setSelectedService] = useState('');
  const [classTypes, setClassTypes] = useState([]);
  const [selectedClassType, setSelectedClassType] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(''); // ID for the selected class
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cardholderFirstName, setCardholderFirstName] = useState('');
  const [cardholderLastName, setCardholderLastName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const token = localStorage.getItem('token');
  const customer = token ? jwt_decode(token).customer : null;

  // Fetch class types when a service is selected
  useEffect(() => {
      if (selectedService) {
          fetch(`http://localhost:3000/api/users/classes/${encodeURIComponent(selectedService)}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          })
              .then(response => response.json())
              .then(data => {
                  setClassTypes(data);
              })
              .catch(err => console.error('Failed to fetch class types', err));
      } else {
          setClassTypes([]);
      }
  }, [selectedService, token]);

  // Fetch sessions when a class type is selected
  useEffect(() => {
      if (selectedClassType) {
          fetch(`http://localhost:3000/api/users/sessions/${encodeURIComponent(selectedClassType)}`, {
              headers: { 'Authorization': `Bearer ${token}` }
          })
              .then(response => response.json())
              .then(data => {
                  setSessions(data.sessions);
              })
              .catch(err => console.error('Failed to fetch sessions', err));
      } else {
          setSessions([]);
      }
  }, [selectedClassType, token]);

  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!token) {
          alert('No token found, please log in');
          return;
      }

      const bookingData = {
          customer_id: customer.id, // Uses decoded JWT
          service_id: selectedService, // Assuming service ID is resolved backend based on type
          class_id: selectedClassId, // Set from the selected class type
          creditCardNumber,
          cvc,
          expirationDate,
          cardholderFirstName,
          cardholderLastName,
          addressOne,
          addressTwo,
          city,
          state,
          zipcode
      };

      try {
          const response = await fetch('http://localhost:3000/api/users/payment', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(bookingData)
          });

          if (response.ok) {
              const data = await response.json();
              console.log('Booking successful:', data);
              navigate('/Billing');
          } else {
              const errorData = await response.json();
              console.error('Booking failed:', errorData.message);
              alert('Failed to book: ' + errorData.message);
          }
      } catch (error) {
          console.error('Network error:', error);
          alert('Network error, unable to complete booking');
      }
  };

  return (
      <div className="Schedule">
          <h1>Booking Form</h1>
          <form onSubmit={handleSubmit}>
              <label>
                  Service:
                  <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                      <option value="">Select a Service</option>
                      {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                      ))}
                  </select>
              </label>
              {selectedService && (
                  <label>
                      Class Type:
                      <select value={selectedClassType} onChange={e => setSelectedClassType(e.target.value)}>
                          <option value="">Select a Class Type</option>
                          {classTypes.map(ct => (
                              <option key={ct} value={ct}>{ct}</option>
                          ))}
                      </select>
                  </label>
              )}
              {selectedClassType && (
                  <label>
                      Session:
                      <select value={selectedSession} onChange={e => setSelectedSession(e.target.value)}>
                          <option value="">Select a Session</option>
                          {sessions.map(session => (
                              <option key={session.startTime} value={session.startTime}>{session.startTime}</option>
                          ))}
                      </select>
                  </label>
              )}
        <input type="text" value={creditCardNumber} onChange={e => setCreditCardNumber(e.target.value)} placeholder="Credit Card Number" required />
        <input type="text" value={cvc} onChange={e => setCvc(e.target.value)} placeholder="CVC" required />
        <input type="month" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} placeholder="Expiration Date" required />
        <input type="text" value={cardholderFirstName} onChange={e => setCardholderFirstName(e.target.value)} placeholder="Cardholder First Name" required />
        <input type="text" value={cardholderLastName} onChange={e => setCardholderLastName(e.target.value)} placeholder="Cardholder Last Name" required />
        <input type="text" value={addressOne} onChange={e => setAddressOne(e.target.value)} placeholder="Address Line 1" required />
        <input type="text" value={addressTwo} onChange={e => setAddressTwo(e.target.value)} placeholder="Address Line 2" />
        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" required />
        <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="State" required />
        <input type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} placeholder="Zip Code" required />
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
}

export default Schedule;
