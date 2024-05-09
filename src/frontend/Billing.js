import React, { useState } from 'react';
import './Billing.css'; // Make sure to create a corresponding CSS file

function Billing() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the billing info
    console.log('Processing payment...');
  };
  const countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Australia', value: 'AU' },
    { label: 'India', value: 'IN' },
    { label: 'Germany', value: 'DE' },
    // ... (add as many countries as needed)
  ];

  return (
    <div className="Billing">
      <h2>Secure Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Card number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div className="expiry-cvc">
          <input
            type="text"
            placeholder="MM / YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </div>
        <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            >
            <option value="">Country/region</option>
            {countryOptions.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select>
        <input
          type="text"
          placeholder="Street address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apt, unit, suite, etc. (optional)"
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="state-zip">
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <input
            type="text"
            placeholder="Zip code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button type="submit">Set</button>
      </form>
    </div>
  );
}

export default Billing;