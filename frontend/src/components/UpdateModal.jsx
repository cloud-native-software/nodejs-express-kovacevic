import axios from 'axios';
import React from 'react'
import { useState } from 'react';

export const UpdateModal = (item) => {
  const {drvo} = item
  const [firstname, setFirstname] = useState(drvo.firstname);
  const [lastname, setLastname] = useState(drvo.lastname);
  const [location, setLocation] = useState(drvo.location);
  

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/users/${drvo.id}`, {
        firstname: firstname,
        lastname: lastname,
        location: location,
      });
      console.log('Podaci uspešno poslati na bekend.');
    } catch (error) {
      console.error('Greška pri slanju podataka na bekend:', error);
    }
  };
  return (
    <div>
      
      <label>Ime:</label>
      <input type="text" value={firstname} onChange={handleFirstnameChange} />
      <br />
      <label>Prezime:</label>
      <input type="text" value={lastname} onChange={handleLastnameChange} />
      <br />
      <label>Lokacija:</label>
      <input type="text" value={location} onChange={handleLocationChange} />
      <br />
      <button onClick={handleSubmit}>Pošalji podatke</button>
    </div>
  )
}
